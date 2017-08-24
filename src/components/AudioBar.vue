<template>
	<div @mouseleave.stop.prevent="pointUp" @mouseup.stop.prevent="pointUp" @mousemove.stop.prevent="pointMove($event)" class="audio-bar">
		<audio :src="mp3Url" @loadedmetadata="musicMetadata" @timeupdate="musicTimeUpdate" 
			@ended="musicEnded"ref="audio"></audio>
		<div class="bar-content">
			<div class="control-div">
				<div @click="" class="change-ctrl pre-style"></div>
				<div @click="togglePlay" class="play-ctrl" :class="playCtrlShowStyle"></div>
				<div @click="" class="change-ctrl next-style"></div>
			</div>
			<div class="music-img">
				
			</div>
			<div class="center-div">
				<div class="song-info">
					<a href="">歌曲名</a>
					<a href="">歌手名</a>
				</div>
				<div class="time-info">
					<div class="spiner" ref="spiner" @click="pointClick($event)">
						<div class="duration" :style=""></div>
						<div class="current" :style="currenStyle"></div>
						<span class="point" :style="pointStyle" @mousedown.stop.prevent="pointDown" @mousemove.stop.prevent="pointMove($event)" @mouseup.stop.prevent="pointUp" ></span>
					</div>
					<div class="time-text">
						<span class="song-time">{{ formatSecondTime($store.getters.CurrentTime) }}</span><span class="song-time">&nbsp;/&nbsp;</span><span class="song-time">{{ formatSecondTime($store.getters.Duration) }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var pointCanDrag = false
	export default {
		name: 'AudioBar',
		data () {
			return {
				mp3Url: "http://m10.music.126.net/20170823120139/3ede01f563ea50026c31d8c441204e33/ymusic/b29c/bfdf/9abc/dca6e502ea5f603c563dc35f474fdeae.mp3"
			}
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
			}
		},
		methods: {
			togglePlay() {
				this.$store.dispatch('togglePlay')
			},
			musicMetadata () {
				this.$store.dispatch('setDuration', this.$store.getters.Player.duration)
			},
			musicTimeUpdate(){
				if (!pointCanDrag)
					this.$store.getters.CurrentTime > this.$store.getters.Duration?
						this.$store.dispatch('setCurrentTime', this.$store.getters.Duration): 
						this.$store.dispatch('setCurrentTime', this.$store.getters.Player.currentTime)
			},
			musicEnded(){
				this.$store.dispatch('setIsPlaying', false)
			},
			formatSecondTime(second){
				let min = Number.parseInt(second / 60)
				let sec = Number.parseInt(second) % 60
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			},
			pointDown(){
				pointCanDrag = true
			},
			pointMove(){
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
			}
		},
		mounted () {
			this.$store.dispatch('setPlayer', this.$refs.audio)
		},
		watch: {

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
		/*border: solid 1px black;*/
		/*background-color: rgba(0,0,0,0.5);*/
		/*background-attachment: fixed;*/
		background-position: 0 5px;
		background: url(../assets/playbar.png) repeat-x;
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
		background: url(../assets/playbar.png) no-repeat;
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
		background: url(../assets/playbar.png) no-repeat;
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
	}
	.song-info a:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.song-info a:first-child {
		color: rgb(211,211,211);
		margin-right: 15px;
	}
	.song-info a:last-child {
		color: rgb(120,120,120);
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
		width: 50%;
		background-color: rgb(199,12,12); 
	}
	.point {
		position: absolute;
		left: 100%;
		top: -5px;
		cursor: pointer;
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
</style>