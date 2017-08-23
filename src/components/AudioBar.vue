<template>
	<div @mouseleave.stop.prevent="pointUp" @mouseup.stop.prevent="pointUp" @mousemove.stop.prevent="pointMove($event)" style="background:grey;">
		<audio :src="mp3Url" @loadedmetadata="musicMetadata" @timeupdate="musicTimeUpdate" 
			@ended="musicEnded"ref="audio"></audio>
		<div @click="togglePlay">{{showText}}</div>
		<div>{{ formatSecondTime(currentTime) }}</div>
		<div>{{ formatSecondTime(duration) }}</div>
		<div class="spiner" ref="spiner">
			<div class="duration" :style=""></div>
			<div class="current" :style="currenStyle"></div>
			<span class="point" :style="pointStyle" @mousedown.stop.prevent="pointDown" @mousemove.stop.prevent="pointMove($event)" @mouseup.stop.prevent="pointUp" ></span>
		</div>
		<div style="height:100px;"></div>
	</div>
</template>

<script>
	var pointCanDrag = false
	export default {
		name: 'AudioBar',
		data () {
			return {
				player: {},
				mp3Url: "http://m10.music.126.net/20170823120139/3ede01f563ea50026c31d8c441204e33/ymusic/b29c/bfdf/9abc/dca6e502ea5f603c563dc35f474fdeae.mp3",
				isPlaying: false,
				currentTime: 0,
				duration: 0
			}
		},
		computed: {
			showText () {
				return this.isPlaying ? 'Pause' : 'Play'
			},
			currenStyle () {
				return {
					width: 100 * this.currentTime / this.duration + '%'
				}
			},
			pointStyle () {
				return {
					left: 100 * this.currentTime / this.duration + '%'
				}
			}
		},
		methods: {
			play () {
				this.isPlaying = true
				this.player.play()
			},
			pause() {
				this.isPlaying = false
				this.player.pause()
			},
			togglePlay() {
				if (this.isPlaying)
					this.pause()
				else
					this.play()
			},
			musicMetadata () {
				this.duration = this.player.duration
			},
			musicTimeUpdate(){
				if (!pointCanDrag)
					this.currentTime = this.player.currentTime
			},
			musicEnded(){
				this.isPlaying = false
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
					console.log(mouseX + ',' + offsetLeft)
					var tmp = (mouseX - offsetLeft) / this.$refs.spiner.offsetWidth
					tmp = tmp > 1? 1: tmp
					tmp = tmp < 0? 0: tmp
					this.currentTime = this.duration * tmp
				}
			},
			pointUp(){
				if(pointCanDrag)
					this.player.currentTime = this.currentTime
				pointCanDrag = false
			}
		},
		mounted () {
			// this.player = document.querySelector('audio')
			this.player = this.$refs.audio
		},
		watch: {
			currentTime (curVal,oldVal) {
// 　　　　　　　　console.log(curVal,oldVal)
　　　　　　}	
		}
	}
</script>

<style scoped>

	.spiner {
		width: 40%;
		height: 6px;
		position: relative;
		/*padding-left: 8px;
		padding-right: 8px;*/
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
</style>