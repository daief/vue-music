<template>
	<div class="audio-bar">
		<audio :src="$store.getters.Music.url" 
			@progress="musicProgress"
			@loadstart="musicLoadStart"
			@durationchange="musicDurationChange"
			@canplay="musicCanplay"
			@loadedmetadata="musicMetadata" 
			@timeupdate="musicTimeUpdate" 
			@ended="musicEnded"ref="audio"
			@error="musicError"></audio>
		<div class="bar-content">
			<!-- 播放、上下首按钮 -->
			<div class="control-div">
				<div @click.stop.prevent="preMusic" class="change-ctrl pre-style"></div>
				<div @click.stop.prevent="togglePlay" class="play-ctrl" :class="playCtrlShowStyle"></div>
				<div @click.stop.prevent="nextMusic" class="change-ctrl next-style"></div>
			</div>
			<!-- 歌曲图片 -->
			<div class="music-img">
				<img :src="$store.getters.Music.img" alt="">
			</div>
			<!-- 歌名、歌手、进度条 -->
			<div class="center-div"
				 @mouseleave.stop.prevent="pointUp" 
				 @mouseup.stop.prevent="pointUp" 
				 @mousemove.stop.prevent="pointMove($event)">
				<div class="song-info">
					<a href="#">{{$store.getters.Music.name}}</a>
					<a href="#" v-for="(singer, index) in $store.getters.Music.singers">{{singer}}<span v-if="index != $store.getters.Music.singers.length - 1">/</span></a>
				</div>
				<div class="time-info">
					<div class="spiner" ref="spiner" @click.stop.prevent="pointClick($event)">
						<div class="duration" :style=""></div>
						<div class="current" :style="currenStyle"></div>
						<span class="point" :style="pointStyle" 
							@mousedown.stop.prevent="pointDown" 
							@mousemove.stop.prevent="pointMove($event)" 
							@mouseup.stop.prevent="pointUp" >
							<i class="point-loading" v-show="!$store.getters.Canplay || this.dataLoading"></i>
						</span>
					</div>
					<div class="time-text">
						<span class="song-time">{{ formatSecondTime($store.getters.CurrentTime) }}</span><span class="song-time">&nbsp;/&nbsp;</span><span class="song-time">{{ formatSecondTime($store.getters.Duration) }}</span>
					</div>
				</div>
			</div>
			<!-- 音量控制 -->
			<div class="volume-ctrl">
				<div class="volume-ctrl-btn" @click.stop.prevent="toggleIsShowVolume"></div>
				<div class="volume-spiner" v-show="$store.getters.IsShowVolume" 
				@click.stop.prevent="" 
				@mouseleave.stop.prevent="vPointUp"
				@mouseup.stop.prevent="vPointUp" 
				@mousemove.stop.prevent="vPointMove($event)">
					<div class="volume-current" :style="volumeCurrentStyle"></div>
					<span class="point" :style="volumePointStyle" @mousedown.stop.prevent="vPointDown" @mousemove.stop.prevent="vPointMove($event)" @mouseup.stop.prevent="vPointUp"></span>
				</div>
			</div>
			<!-- 播放模式 -->
			<div class="loop-ctrl">
				<div class="loop-ctrl-btn" :class="loopStyle" @click.stop.prevent="toggleLoopType"></div>
			</div>
			<!-- 列表开关 -->
			<div class="list-switch" @click.stop.prevent="toggleIsShowList">
				{{this.$store.getters.PlayList.length}}
				<!-- 提示 -->
				<div class="bar-tip" v-show="IsShowTip" @click.stop.prevent="">{{$store.getters.TipText}}</div>
			</div>
		</div>
		<PlayList class="play-list" v-show="$store.getters.IsShowList"></PlayList>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import PlayList from './PlayList.vue'
	var pointCanDrag = false
	var volumePointCanDrag = false
	var volumeDragY = 0
	export default {
		name: 'AudioBar',
		data () {
			return {
				// 0~1
				volume: (JSON.parse(localStorage.getItem('VUE_MUSIC')) && JSON.parse(localStorage.getItem('VUE_MUSIC')).volume) || 0.75,
				// 1循环 2单曲 3随机
				loopType: (JSON.parse(localStorage.getItem('VUE_MUSIC')) && JSON.parse(localStorage.getItem('VUE_MUSIC')).loopType) || 1,
				// 加载
				dataLoading: true
			}
		},
		components: {
			PlayList: PlayList
		},
		computed: {
			playCtrlShowStyle () {
				return this.$store.getters.IsPlaying ? 'pause-style' : 'play-style'
			},
			currenStyle () {
				var tmp = 100 * this.$store.getters.CurrentTime / this.$store.getters.Duration
				tmp = tmp > 100 ? 100 : tmp
				return {
					width: tmp + '%'
				}
			},
			pointStyle () {
				var tmp = 100 * this.$store.getters.CurrentTime / this.$store.getters.Duration
				tmp = tmp > 100 ? 100 : tmp
				return {
					left: tmp + '%'
				}
			},
			volumeCurrentStyle () {
				return {
					height: (92 * this.volume) + 'px'
				}
			},
			volumePointStyle () {
				// 6 ~ 98
				return {
					top: (98 - (98 -6) * this.volume ) + 'px'
				}
			},
			loopStyle () {
				switch(this.loopType) {
					case 1:
						return 'loop-circle'
					case 2:
						return 'loop-one'
					case 3:
						return 'loop-random'
				}
			},
			...mapGetters([
				'PlayIndex',
	            'IsShowTip',
	            'PlayList'
	        ])
		},
		methods: {
			preMusic(){
				let listLength = this.$store.getters.PlayList.length
				let index = this.$store.getters.PlayIndex + listLength
				this.$store.dispatch('setPlayIndex', --index % listLength)
				this.$store.dispatch('setMusic', this.$store.getters.PlayList[this.$store.getters.PlayIndex])
				this.$store.getters.Player.currentTime = 0
			},
			togglePlay() {
				if (!this.$store.getters.Canplay) {
					this.$store.getters.Player.load()
				}
				this.$store.dispatch('togglePlay')
			},
			nextMusic() {
				// 单曲的时候，邻近下一曲
				if (this.loopType == 2) {
					let listLength = this.$store.getters.PlayList.length
					let index = this.$store.getters.PlayIndex
					this.$store.dispatch('setPlayIndex', (++index) % listLength)
					this.$store.dispatch('setMusic', this.$store.getters.PlayList[this.$store.getters.PlayIndex])
					this.$store.getters.Player.currentTime = 0
				}
				else {
					this.musicEnded()
				}
			},
			musicProgress () {
				this.dataLoading = true
			},
			musicLoadStart () {
				this.$store.dispatch('setCanplay', false)
			},
			musicDurationChange () {
				this.$store.dispatch('setDuration', this.$store.getters.Player.duration)
			},
			musicCanplay () {
				this.$store.dispatch('setCanplay', true)
			},
			musicMetadata () {
				this.$store.dispatch('play')
			},
			musicTimeUpdate(){
				this.dataLoading = false
				// 虽然不是用于移动端，但这个判断用于在移动端获取duration
				if (this.$store.getters.Duration == 0)	
					this.$store.dispatch('setDuration', this.$store.getters.Player.duration)
				if (!pointCanDrag)
					this.$store.getters.Player.currentTime > this.$store.getters.Duration?
						this.$store.dispatch('setCurrentTime', this.$store.getters.Duration): 
						this.$store.dispatch('setCurrentTime', this.$store.getters.Player.currentTime)
			},
			musicEnded(){
				this.$store.dispatch('pause')
				let listLength = this.$store.getters.PlayList.length
				
				// 循环
				if (this.loopType == 1) {
					let index = this.$store.getters.PlayIndex
					this.$store.dispatch('setPlayIndex', (++index) % listLength)
				}
				// 单曲，不重新加载
				if (this.loopType == 2) {
					this.$store.dispatch('play')
					return
				}
				// 随机
				if (this.loopType == 3) {
					let random = Number.parseInt(Math.random() * listLength)
					// 随机到自己，不重新加载
					if (random == this.$store.getters.PlayIndex) {
						this.$store.dispatch('play')
					}
					this.$store.dispatch('setPlayIndex', random)
				}
				this.$store.dispatch('setMusic', this.$store.getters.PlayList[this.$store.getters.PlayIndex])
				this.$store.getters.Player.currentTime = 0
				// 更换之后不能马上play，在loadmetadata里play
				// this.$store.dispatch('play')
			},
			// audio地址出错
			musicError () {
				if (this.$store.getters.Music.id != 0) {
					// 显示提示
					this.$store.dispatch('showTip', '播放失败:' + this.$store.getters.Music.name)
					this.nextMusic()
				}
			},
			formatSecondTime(second){
				let min = Number.parseInt(second / 60) || 0
				let sec = Number.parseInt(second) % 60 || 0
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			},
			pointDown(){
				pointCanDrag = true
			},
			pointMove(event){
				if (pointCanDrag) {
					let e = event || window.event
					let mouseX = e.pageX
					let offsetLeft = this.$refs.spiner.offsetLeft
					var tmp = (mouseX - offsetLeft) / this.$refs.spiner.offsetWidth
					tmp = tmp > 1? 1: tmp
					tmp = tmp < 0? 0: tmp
					this.$store.dispatch('setCurrentTime', this.$store.getters.Duration * tmp)
				}
			},
			pointUp(){
				if(pointCanDrag)
					this.$store.getters.Player.currentTime = this.$store.getters.CurrentTime
				pointCanDrag = false
			},
			pointClick(event){
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.spiner.offsetLeft
				var tmp = (mouseX - offsetLeft) / this.$refs.spiner.offsetWidth
				tmp = tmp > 1? 1: tmp
				tmp = tmp < 0? 0: tmp
				this.$store.dispatch('setCurrentTime', this.$store.getters.Duration * tmp)
				this.$store.getters.Player.currentTime = this.$store.getters.CurrentTime
			},
			// 音量
			vPointDown(event){
				let e = event || window.event
				volumePointCanDrag = true
				volumeDragY = e.pageY
			},
			vPointMove(event){
				if (volumePointCanDrag) {
					let e = event || window.event
					let mouseY = e.pageY
					let diffY = mouseY - volumeDragY
					var tmp = diffY / 92
					tmp = this.volume - tmp
					tmp = tmp > 1? 1: tmp
					tmp = tmp < 0? 0: tmp
					this.volume = tmp
					this.$store.getters.Player.volume = this.volume
					volumeDragY = mouseY
				}
			},
			vPointUp(){
				volumePointCanDrag = false
			},
			toggleIsShowVolume () {
				this.$store.dispatch('setIsShowVolume', !this.$store.getters.IsShowVolume)
			},
			// change loop type
			toggleLoopType () {
				this.loopType = ++this.loopType % 3 + 1
			},
			// toggle list show
			toggleIsShowList() {
				this.$store.dispatch('setIsShowList', !this.$store.getters.IsShowList)
			}
		},
		beforeCreate () { 
			
		},
		mounted () {
			this.$store.dispatch('setPlayer', this.$refs.audio)
			this.$store.getters.Player.volume = this.volume
		},
		watch: {
			volume (newvalue) {
				let loaclData = JSON.parse(localStorage.getItem('VUE_MUSIC') || '{}')
				loaclData.volume = newvalue
				localStorage.setItem('VUE_MUSIC',JSON.stringify(loaclData))
			},
			loopType (newvalue) {
				let loaclData = JSON.parse(localStorage.getItem('VUE_MUSIC') || '{}')
				loaclData.loopType = newvalue
				localStorage.setItem('VUE_MUSIC',JSON.stringify(loaclData))
			},
			PlayIndex (newvalue) {
				let loaclData = JSON.parse(localStorage.getItem('VUE_MUSIC') || '{}')
				loaclData.playIndex = newvalue
				localStorage.setItem('VUE_MUSIC',JSON.stringify(loaclData))
			},
			IsShowTip (newvalue) {
				// 检测到提示信息显示，一段时间后自动隐藏
				if (newvalue) {
					setTimeout(() => {
						this.$store.dispatch('hideTip')
					}, 3000)
				}
			},
			// watch PlayList
			PlayList(newvalue) {
				let loaclData = JSON.parse(localStorage.getItem('VUE_MUSIC') || '{}')
				loaclData.playList = newvalue
				localStorage.setItem('VUE_MUSIC',JSON.stringify(loaclData))
			}
		}
	}
</script>

<style scoped>
	.audio-bar {
		position: fixed;
		bottom: 0;
		height: 53px;
		width: 100%;
		padding-top: 10px;
		zoom: 1;
		z-index: 1000;
		/*border: solid 1px black;*/
		/*background-color: rgba(0,0,0,0.5);*/
		/*background-attachment: fixed;*/
		background-position: 0 5px;
		background: url(../assets/images/playbar.png) repeat-x;
	}
	.bar-content {
		display: flex;
		justify-content: center;
		align-items: center;
		/*padding-top: 7px;
		padding-bottom: 7px;*/
	}
	.control-div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 136px;
	}
	.change-ctrl {
		height: 28px;
		width: 28px;
		cursor: pointer;
		background: url(../assets/images/playbar.png) no-repeat;
		margin-left: 8px;
		margin-right: 8px;
	}
	.pre-style {
	    background-position: 0 -130px;
	}
	.pre-style:hover {
		background-position: -30px -130px;
	}
	.next-style {
	    background-position: -80px -130px;
	}
	.next-style:hover {
		background-position: -110px -130px;
	}
	.play-ctrl {
		height: 36px;
		width: 36px;
		cursor: pointer;
		background: url(../assets/images/playbar.png) no-repeat;
	}
	.play-style {
		background-position: 0px -204px;
	}
	.play-style:hover {
		background-position: -40px -204px;
	}
	.pause-style {
		background-position: 0 -165px;
	}
	.pause-style:hover {
		background-position: -40px -165px;
	}
	.music-img {
		height: 36px;
		width: 36px;
	}
	.music-img img {
		height: 36px;
		width: 36px;
		border-radius: 5px;
		border: solid 1px; 
	}
	.center-div {
		width: 40%;
		margin-left: 20px;
		margin-right: 10px;
	}
	.song-info {
		height: 20px;
		font-size: 12px;
	}
	.song-info a {
		text-decoration: none;
		color: rgb(120,120,120);
	}
	.song-info a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.song-info a:first-child {
		color: rgb(211,211,211);
		margin-right: 15px;
	}
	.time-info {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 20px;
	}
	.spiner {
		/*width: 100%;*/
		flex-grow: 1;
		height: 6px;
		position: relative;
		margin: 0 auto 0 auto;
	}
	.duration, 
	.current{
		width: 100%;
		height: 6px;
		border-radius: 3px;
		position: absolute;
		background-color: rgb(83,83,83);
	}
	.current { 
		width: 100%;
		background-color: rgb(199,12,12); 
	}
	/*进度滑块*/
	.point {
		position: absolute;
		left: 100%;
		top: -5px;
		cursor: pointer;
	}
	.point-loading {
		position: absolute;
		left: -6px;
		top: 2px;
		width: 12px;
		height: 12px;
		background-image: url(http://s2.music.126.net/style/web2/img/outchain/loading.gif?2b3b83a7b944db50b714347179cfc826);
	}
	.point:hover:before {
		background-color: rgb(255,255,255);
		box-shadow:  0px 0px 3px 3px rgba(255,255,255,0.7);
	}
	.point:before {
		content: "";
		display: block;
        position: absolute;  /*日常绝对定位*/
        left:-8px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color:rgb(242,242,242);
	}
	.point:after {
		content: "";
		display: block;
        position: absolute;  /*日常绝对定位*/
        top: 5px;
        left: -3px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: rgb(199,12,12);
	}
	/* 垂直居中要在span外层div设置font-size */
	/*进度时间*/
	.time-text {
		margin-left: 10px;
	    font-size: 12px;
		height: 20px;
	}
	.song-time {
		display:inline-block;
		vertical-align: middle;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		color: rgb(100,100,100); 
	}
	.song-time:first-child{ color: rgb(141,141,141); }
	/*音量*/
	.volume-ctrl {
		height: 25px;
		width: 25px;
		position: relative;
	}
	.volume-ctrl-btn {
		width: 25px;
		height: 25px;
		cursor: pointer;
		background: url(../assets/images/playbar.png) no-repeat;
		background-position: -2px -248px;
	}
	.volume-ctrl-btn:hover {
	    background-position: -31px -248px;
	}
	.volume-spiner {
		position: relative;
		z-index: 10;
		width: 32px;
		height: 113px;
		top: -150px;
		left: -3.5px;
		background: url(../assets/images/playbar.png) no-repeat;
		background-position: 0 -503px;
	}
	/*音量div长度92*/
	.volume-current {
		position: absolute;
		left: 14px;
		width: 4px;
		bottom: 11px;
		height: 92px;
		border-radius: 2px;
		background-color: rgb(199,12,12);
	}
	/*top: (98)px~(6)*/
	.volume-spiner .point {
		position: absolute;
		left: 50%;
		top: 6px;
		cursor: pointer;
	}
	.volume-spiner .point:before {
		width: 12px;
		height: 12px;
		left:-6px;
	}
	.volume-spiner .point:after {
		width: 4px;
		height: 4px;
		top: 4px;
        left: -2px;
	}
	/*播放模式*/
	.loop-ctrl {
		height: 25px;
		width: 25px;
		position: relative;
	}
	.loop-ctrl-btn {
		width: 25px;
		height: 25px;
		cursor: pointer;
		background: url(../assets/images/playbar.png) no-repeat;
		background-position: -3px -344px;
	}
	/*循环模式*/
	.loop-circle {
		background-position: -3px -344px;
	}
	.loop-circle:hover {
	    background-position: -33px -344px;
	}
	/*单曲模式*/
	.loop-one {
		background-position: -66px -344px;
	}
	.loop-one:hover {
	    background-position: -93px -344px;
	}
	/*随机模式*/
	.loop-random {
		background-position: -66px -248px;
	}
	.loop-random:hover {
	    background-position: -93px -248px;
	}
	/*列表开关*/
	.list-switch {
		position: relative;
		width: 59px;
		height: 25px;
		background: url(../assets/images/playbar.png) no-repeat;
		background-position: -42px -69px;
		font-size: 12px;
		line-height: 25px;
		color: #666;
		padding-left: 20px;
		text-align: center;
		cursor: pointer;
	}
	.list-switch:hover {
		background-position: -42px -99px;
	}
	/*列表面板*/
	.play-list {
		position: absolute;
		bottom: 47px;
		left: 50%;
		margin-left: -30em;

		transition: all 0.3s;
	}
	/*提示*/
	.bar-tip {
		position: absolute;
		z-index: 3;
	    top: -62px;
	    right: -6px;
	    width: 152px;
	    height: 49px;
	    padding-left: 3px;
	    padding-right: 3px;
	    text-align: center;
	    color: #fff;
	    line-height: 37px;
	    background: url(../assets/images/playbar.png) no-repeat 0 9999px;
	    background-position: 0 -287px;
	    overflow: hidden;
	    text-overflow: ellipsis;
		white-space: nowrap;
		word-wrap: normal;
	}
</style>