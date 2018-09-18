<template>
	<div>
		<div class="panel">
			<div class="panel-body">
				<img class="one-img" src="../../../assets/images/0.gif" alt="">
			</div>
		</div>

		<div class="panel">
			<div class="panel-title">
				相似歌曲
			</div>
			<div class="panel-body">
				<div class="simi-songs" v-for="song in simiSongs">
					<div class="s-s-left">
						<a href="javascript:;" class="s-s-name" :title="song.name">{{song.name}}</a>
						<div>
							<a href="javascript:;" v-for="(ar,i) in song.singers" class="s-s-ar">
								{{ar}}
								<span v-if="i != song.singers.length - 1">/</span>
							</a>
						</div>
					</div>
					<a href="javascript:;" class="s-s-pl" @click="playSong(song)"></a>
					<a href="javascript:;" class="s-s-add" @click="addSong(song)"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SongOtherInfo',
		data () {
			return {
				simiSongs: [
					{
						id: 0,
						name: '',
						singers: [''],
						album: '',
			            img: '',
			            duration: 0
					}
				]
			}
		},
		methods: {
			getInfo(){
				// 获取最近5个听了这首歌的用户——需要登录
				// 获取相似歌曲
				this.$axios.get(this.MUrl + 'simi/song?id=' + this.$route.params.songId)
				.then((rsp) => {
					let songs = rsp.data.songs
					this.simiSongs = songs.map((s) => {
						return {
							id: s.id,
							name: s.name,
							singers: s.artists.map((ar) => {
								return ar.name
							}),
							album: s.album.name,
				            img: s.album.picUrl,
				            duration: s.duration
						}
					})
				}).catch((error) => {
					console.log(error)
				})
			},
			// 播放歌曲
			playSong (songObj) {
				// 已经在播放当前歌曲
				if (this.$store.getters.Music.id == songObj.id) {
					this.$store.dispatch('showTip', '已开始播放')
					return;
				}
				// 先添加到列表
				this.addSong(songObj)
				// 再播放
				for (let i = 0; i < this.$store.getters.PlayList.length; i++) {
					if (songObj.id == this.$store.getters.PlayList[i].id) {
						this.$store.dispatch('setPlayIndex', i)
						this.$store.dispatch('setMusicFormPlayList', i)
						break
					}
				}
				// 显示提示
				this.$store.dispatch('showTip', '已开始播放')
			},
			// 添加到列表
			addSong (songObj) {
				let song = {
		            "id": songObj.id,
		            "name": songObj.name,
		            "singers": songObj.singers,
		            "album": songObj.album,
		            "img": songObj.img,
		            "duration": songObj.duration	            
	        	}
				this.$store.dispatch('addSongToPlayList', song)
				// 显示提示
				this.$store.dispatch('showTip', '已添加到播放列表')
			}
		},
		mounted () {
			this.getInfo()
		},
		watch: {
			// 当路由变化的时候会再次执行该函数
			'$route': 'getInfo'
		}
	}
</script>

<style scoped>
	.panel-title {
		position: relative;
		font-size: 14px;
		color: #333;
		font-weight: bold;
		padding: 7px 0;
	}
	.panel-title:after {
		content: "";
		position: absolute;
		width: 100%;
		height: 1px;
		background-color: #cdcdcd;
		bottom: 0px;
		left: 0px;
	}
	.panel-body {
		position: relative;
	}
	.simi-songs {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 10px 0;
	}
	.s-s-left {
		width: 170px;
		overflow: hidden;
    	text-overflow: ellipsis;
	    white-space: nowrap;
	 	word-wrap: normal;
	}
	.s-s-name,
	.s-s-ar {
		display: inline-block;
		font-size: 12px;
		color: #333;
		text-decoration: none;
		cursor: pointer;
	}
	.s-s-name:hover {
		color: #000;
		text-decoration: underline;
	}
	.s-s-ar {
		color: #999;
	}
	.s-s-ar:hover {
		text-decoration: underline;
	}
	.s-s-pl,
	.s-s-add {
		width: 10px;
	    height: 11px;
	    background: url(http://s2.music.126.net/style/web2/img/icon2.png?f12802f6138b0c461e879ac657489a7c) no-repeat -9999px -9999px;
	    opacity: 0.9;
	}
	.s-s-pl {
		background-position: -69px -455px;
	}
	.s-s-add {
		background-position: -87px -454px;
	}
	.one-img {
		width: 100%;
	}
</style>