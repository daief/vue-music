<template>
	<div class="play-list" @click.stop.prevent="" @mouseup.stop.prevent="">
		<div class="list-head">
			<div class="head-left">
				<div class="title-text">播放列表({{$store.getters.PlayList.length}})</div>
			</div>
			<div class="head-right">
				<div class="song-name">{{$store.getters.Music.name}}</div>
			</div>
		</div>
		<div class="list-body"  
			@mouseleave.stop.prevent="bodyLeave($event)"
			@mousemove.stop.prevent="bodyMove($event)"
			@mouseup.stop.prevent="bodyUp($event)">
			<div class="body-left"
				@mousewheel.stop.prevent="listWheel($event)">
				<div class="list" :style="listContentStyle">
					<div v-for="(song,index) in $store.getters.PlayList" class="list-row" ref="listRow"
						:class="{'row-playing': song.id == $store.getters.Music.id}"
						@click.stop.prevent="listRowClick(song.id)">
						<div class="row-1"
							:class="{'playing-icon': song.id == $store.getters.Music.id}"></div>
						<div class="row-2">
							{{song.name}}
						</div>
						<div class="row-3">
							
						</div>
						<div class="row-4" @click.stop.prevent="">
							<a href="javascript:;" v-for="(singer, index) in song.singers">{{singer}}<span v-if="index != song.singers.length - 1">/</span></a>
						</div>
						<div class="row-5">
							{{formatSecondTime(song.duration / 1000)}}
						</div>
					</div>
				</div>
				<div class="list-scroll">
					<div class="scroll" :style="listScrollStyle" @mousedown.stop.prevent="listScrollDown" @mousemove.stop.prevent="listScrollMove($event)" @mouseup.stop.prevent="listScrollUp"></div>
				</div>
			</div>
			<div class="body-right">
				<div class="no-lyric" v-show="!$store.getters.Music.lyric">暂时没有歌词</div>
				<div class="lyric" :style="lyricContentStyle">
					<p class="line" v-for="(line,index) in $store.getters.Music.lyric.split('\n')"
						:class="{'line-active': index == currentLyricIndex}"
						ref="line">
						{{line.replace(/\[(\d*):(\d*)\.(\d*)\]/, "") }}
						<br />
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	var listCanDrag = false
	var listDragY = 0
	export default {
		name: 'PlayList',
		data () {
			return {
				// 列表滑块移动距离
				listScrollMoveData: 0,
				// 列表内容移动的距离
				listContentMoveData: 0,
				// 歌词移动的距离
				lyricContentMoveData: 0
			}
		},
		computed: {
			listScrollStyle () {
				return {
					top: this.listScrollMoveData + 'px'
				}
			},
			listContentStyle () {
				return {
					top:(- this.listContentMoveData) + 'px'
				}
			},
			lyricContentStyle () {
				this.lyricContentMoveData = 0
				if (this.currentLyricIndex > -1 && this.$refs.line[this.currentLyricIndex]) {
					for (let i = 0; i <= this.currentLyricIndex; i++) {
						this.lyricContentMoveData += this.$refs.line[i].getBoundingClientRect().height
					}
				}
				return {
					top: 108 - this.lyricContentMoveData + 'px'
				}
			},
			// 歌词索引
			currentLyricIndex () {
				let i = 0
				for(i = 0; i < this.$store.getters.Music.lyric.split('\n').length; i++) {
					var line = this.$store.getters.Music.lyric.split('\n')[i]
					if (line) {
						if(!/\[(\d*):(\d*)\.(\d*)\]/.test(line))	continue

						let strTime = line.match(/\[(\d*):(\d*)\.(\d*)\]/)[0]
						strTime = strTime.substr(1, strTime.length - 2)
						let second = Number(strTime.split(':')[0]) * 60 + Number(strTime.split(':')[1])
						if (second >= this.$store.getters.CurrentTime + 0.5) {
							break
						}
					} else {
						break
					}
				}
				return i - 1
			},
			...mapGetters([
				'IsShowList'
	        ])
		},
		methods: {
			// 点击播放列表
			listRowClick(songId) {
				if (songId == this.$store.getters.Music.id) {
					return;
				}
				for (let i = 0; i < this.$store.getters.PlayList.length; i++) {
					if (songId == this.$store.getters.PlayList[i].id) {
						this.$store.dispatch('setPlayIndex', i)
						this.$store.dispatch('setMusicFormPlayList', i)
						break
					}
				}
			},
			bodyLeave() {
				this.listScrollUp()
			},
			bodyMove (event) {
				let e = event || window.event
				this.listScrollMove(e)
			},
			bodyUp() {
				this.listScrollUp()
			},
			listScrollDown () {
				listCanDrag = true
				listDragY = window.event.pageY
			},
			listScrollMove(event) {
				// 滑块高40px
				// 可滑动距离248 - 40 = 208
				if (listCanDrag) {
					let e = event || window.event
					let mouseY = e.pageY
					let diffY = mouseY - listDragY
					listDragY = mouseY
					this.listScrollMoveData += diffY
					this.listScrollMoveData = this.listScrollMoveData > 208? 208: this.listScrollMoveData
					this.listScrollMoveData = this.listScrollMoveData < 0? 0: this.listScrollMoveData
					// 内容移动距离 内容高度-可视区域高度 = H - 248
					let contentMaxMoveH = 28 * this.$store.getters.PlayList.length - 248
					// 内容高于可视区域才需要滚动
					if (contentMaxMoveH > 0)
						this.listContentMoveData = (this.listScrollMoveData / 208) * contentMaxMoveH
				}
			},
			listScrollUp() {
				listCanDrag = false
			},
			listWheel (event) {
				let e = event || window.event
				// true:up, false:down
				let direction = e.deltaY > 0
				// 内容移动距离 内容高度-可视区域高度 = H - 248
				let contentMaxMoveH = 28 * this.$store.getters.PlayList.length - 248
				let step = 208 / contentMaxMoveH * 28 * 2
				if (direction) {
					// up
					this.listScrollMoveData += step
				} else {
					this.listScrollMoveData -= step
				}
				this.listScrollMoveData = this.listScrollMoveData > 208? 208: this.listScrollMoveData
				this.listScrollMoveData = this.listScrollMoveData < 0? 0: this.listScrollMoveData
				
				// 内容高于可视区域才需要滚动
				if (contentMaxMoveH > 0)
					this.listContentMoveData = (this.listScrollMoveData / 208) * contentMaxMoveH
			},
			formatSecondTime(second){
				let min = Number.parseInt(second / 60) || 0
				let sec = Number.parseInt(second) % 60 || 0
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			}
		},
		watch: {
			// CurrentTime (n, o) {
			// 	console.log(n)
			// }
			// 监测是否展现歌曲列表面板，打开列表面板时自动定位到当前歌曲的位置
			IsShowList(n, o) {
				if (n) {
					// 内容最大移动距离 内容高度-可视区域高度 = H - 248
					let contentMaxMoveH = 28 * this.$store.getters.PlayList.length - 248
					this.listScrollMoveData = 208 / contentMaxMoveH * 28 * this.$store.getters.PlayIndex
					this.listScrollMoveData = this.listScrollMoveData > 208? 208: this.listScrollMoveData
					this.listScrollMoveData = this.listScrollMoveData < 0? 0: this.listScrollMoveData
					
					// 内容高于可视区域才需要滚动
					if (contentMaxMoveH > 0)
						this.listContentMoveData = (this.listScrollMoveData / 208) * contentMaxMoveH
				}
			}
		}
	}
</script>

<style scoped>
	.play-list {
		width: 60em;
		height: 288px;
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
		background: url(../assets/images/playlist_bg.png) no-repeat;
		background-repeat: repeat-y;
	    background-position: -1014px 0;
	}
	/*头部*/
	.list-head {
		height: 40px;
		display: flex;
	}
	.list-head:after {
		content: '';
		position: absolute;
		width: 960px;
		height: 2px;
		top: 38px;
		z-index: 2;
		background-color: #000;
	}
	.head-left {
		flex: 0 0 50%;
	}
	.head-right {
		flex: 0 0 50%;
	}
	.head-right:before {
		content: '';
		position: absolute;
		height: 40px;
		width: 1px;
		box-shadow: 0 0 1px #fff inset;
		background: #000;
		opacity: .5;
	}
	.title-text {
		display: inline-block;
		position: relative;
		left: 25px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
    	color: #e2e2e2;
	}
	.song-name {
		height: 40px;
		line-height: 40px;
		font-size: 14px;
    	color: #fff;
    	text-align: center;
	}
	/*主体*/
	.list-body {
		display: flex;
		height: 248px;
	}
	.body-left {
		height: 248px;
		width: 480px;
		overflow: hidden;
		background: rgb(35,35,35);
		display: flex;
    	/*opacity: .5;*/
	}
	/*滚动条*/
	.list-scroll {
		position: absolute;
		height: 248px;
		width: 6px;
		border-radius: 2px;
		left: 50%;
		margin-left: -3px;
		background-color: #000;
		z-index: 5;
	}
	.list-scroll .scroll {
		position: relative;
		/*top: 208px;*/
		height: 40px;
		width: 6px;
		border-radius: 3px;
		background: #868686;
	    border: 1px solid #a6a6a6;
	    opacity: .5;
		cursor: pointer;
	}
	/*列表*/
	.list {
		position: relative;
		width: 100%;
		top: -216px;
	}
	.list-row {
		height: 28px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.list-row:hover {
		background-color: rgb(26,26,26);
	}
	.row-playing {
		background-color: rgb(18,18,18);
	}
	.row-playing div, 
	.row-playing a {
		color: white !important; 
	}
	.row-1 {
		margin-left: 10px;
		width: 10px;
		height: 13px;
	}
	.playing-icon {
		background: url(../assets/images/playlisticons.png) no-repeat 0 9999px;
		background-position: -182px 0;
	}
	/*歌曲名*/
	.row-2 {
		width: 200px;
		margin-left: 10px;
		color: #ccc;
		font-size: 12px;
		line-height: 28px;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	/*操作*/
	.row-3 {
		height: 28px;
		width: 88px;
	}
	/*歌手*/
	.row-4 {
		width: 70px;
		color: #9b9b9b;
		font-size: 12px;
		line-height: 28px;
		overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    cursor: pointer;
	}
	.row-4:hover {
		text-decoration: underline;
	}
	.row-4 a {
		color: #9b9b9b;
		text-decoration: none;
	}
	/*duration*/
	.row-5 {
		margin-left: 7px;
		height: 28px;
		width: 45px;
		color: #666;
		font-size: 12px;
		line-height: 28px;
	}
	.body-right {
		height: 248px;
		width: 480px;
		position: relative;
		overflow: hidden;
		background: radial-gradient(rgb(25,25,25) 5%, rgb(30,30,30) 40%, rgb(45,45,45) 80%);
	}
	/*歌词*/
	.lyric {
		width: 480px;
		position: relative;
		top: 108px;
		transition-property: top;
		transition-duration: .5s;
		transition-timing-function: linear;
	}
	.no-lyric {
		position: relative;
		text-align: center;
		color: #999;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		top: 114px;
	}
	.line {
		font-size: 12px;
		padding-left: 5px;
		padding-right: 5px;
	    color: #989898;
	    word-wrap: break-word;
	    text-align: center;
	    line-height: 32px;
	    height: auto !important;
	    min-height: 32px;
	    transition-property: color;
		transition-duration: .7s;
		transition-timing-function: linear;
	}
	.line-active {
		color: #fff;
    	font-size: 14px;
	}
</style>
