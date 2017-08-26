<template>
	<div class="play-list" @click.stop.prevent="">
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
				@mousewheel="listWheel($event)">
				<div class="list" :style="listContentStyle">
					<div v-for="(song,index) in $store.getters.PlayList" class="list-row" ref="listRow"
						:class="{'row-playing': song.id == $store.getters.Music.id}"
						@click.stop.prevent="listRowClick(song.id)">
						<div class="row-1"
							:class="{'playing-icon': song.id == $store.getters.Music.id}"></div>
						<div class="row-2">
							{{song.name}}
						</div>
						<div class="row-3"></div>
					</div>
				</div>
				<div class="list-scroll">
					<div class="scroll" :style="listScrollStyle" @mousedown.stop.prevent="listScrollDown" @mousemove.stop.prevent="listScrollMove($event)" @mouseup.stop.prevent="listScrollUp"></div>
				</div>
			</div>
			<div class="body-right">
				
			</div>
		</div>
	</div>
</template>

<script>
	var listCanDrag = false
	var listDragY = 0
	export default {
		name: 'PlayList',
		data () {
			return {
				// 列表滑块移动距离
				listScrollMoveData: 0,
				// 列表内容移动的距离
				listContentMoveData: 0
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
			}
		},
		methods: {
			// 点击播放列表
			listRowClick(songId) {
				for (let i = 0; i < this.$store.getters.PlayList.length; i++) {
					if (songId == this.$store.getters.PlayList[i].id) {
						this.$store.dispatch('setMusic', this.$store.getters.PlayList[i])
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
				if (direction) {
					// up
					this.listScrollMoveData += 10
				} else {
					this.listScrollMoveData -= 10
				}
				this.listScrollMoveData = this.listScrollMoveData > 208? 208: this.listScrollMoveData
				this.listScrollMoveData = this.listScrollMoveData < 0? 0: this.listScrollMoveData
				// 内容移动距离 内容高度-可视区域高度 = H - 248
				let contentMaxMoveH = 28 * this.$store.getters.PlayList.length - 248
				// 内容高于可视区域才需要滚动
				if (contentMaxMoveH > 0)
					this.listContentMoveData = (this.listScrollMoveData / 208) * contentMaxMoveH
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
	.head-left {
		flex: 1;
	}
	.head-right {
		flex: 1;
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
		flex: 1;
		top: -216px;
	}
	.list-row {
		height: 28px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.list-row:hover {
		background-color: rgb(21,21,21);
	}
	.row-playing {
		background-color: rgb(26,26,26);
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
	.row-3 {
	}
	.body-right {
		height: 248px;
		width: 480px;
	}
</style>