<template>
	<!-- 单曲结果，我只负责单曲结果的展示 -->
	<div class="song-result">
		<div class="list">
			<div class="row" v-for="(song,idx) in result.songs" :class="{'row-even': idx % 2 == 1}">
				<div class="col-1">
					<a href="javascript:;" class="pl" @click="play(song)"></a>
				</div>
				<div class="col-2">
					<router-link :to="{name:'Song', params: { songId: song.id }}">{{song.name}}</router-link>
				</div>
				<div class="col-3">
					<a href="javascript:;" class="icon add" title="添加到列表" @click="addSong(song)"></a>
					<a href="javascript:;" class="icon scr" title="点不了的收藏"></a>
				</div>
				<div class="col-4">
					{{...song.artists.map((si) => { return si.name;})}}
				</div>
				<div class="col-5">
					《{{song.album.name}}》
				</div>
				<div class="col-6">
					{{formatSecondTime(song.duration / 1000)}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'SongResult',
		data () {
			return {
				result: {
					songCount: 0,
					songs: [
						{
							id: 0,
							name: '',
							artists: [
								{
									name: ''
								}
							],
							album: {
								name: ''
							},
							duration: 0
						}
					]
				}
			}
		},
		computed: {
			...mapGetters([
				'CurrentPage'
	        ])
		},
		methods: {
			// 获取搜索结果
			getQueryRs(){
				let keyWord = this.$route.query.keyWord
				let type = this.$route.query.type
				let offset = 30 * (this.CurrentPage - 1)
				if (type == 1 && keyWord) {
					let params = 'keywords=' + keyWord + '&type=' + type + '&limit=30&offset=' + offset
					// 内容不为空时请求
					this.$axios.get(this.MUrl + 'search?' + params).then((rsp) => {
						this.result = rsp.data.result
						this.$store.dispatch('setResultCount', this.result.songCount)
					}).catch((error) => {
						console.log('搜索', error)
					})
				}
			},
			formatSecondTime(second){
				let min = Number.parseInt(second / 60) || 0
				let sec = Number.parseInt(second) % 60 || 0
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			},
			// 播放歌曲
			play(song) {
				// 已经在播放当前歌曲
				if (this.$store.getters.Music.id == song.id) {
					this.$store.dispatch('showTip', '已开始播放')
					return;
				}

				// 获取歌曲详情
				this.$axios.get(this.MUrl + 'song/detail?ids=' + song.id).then((rsp) => {
					let s = rsp.data.songs[0]
					// 先添加到列表
					this.$store.dispatch('addSongToPlayList', {
			            "id": s.id,
			            "name": s.name,
			            "singers": s.ar.map((si) => {
			            	return si.name
			            }),
			            "album": s.al.name,
			            "img": s.al.picUrl,
			            "duration": s.dt            
		        	})
					// 再播放
					for (let i = 0; i < this.$store.getters.PlayList.length; i++) {
						if (song.id == this.$store.getters.PlayList[i].id) {
							this.$store.dispatch('setPlayIndex', i)
							this.$store.dispatch('setMusicFormPlayList', i)
							break
						}
					}
					// 显示提示
					this.$store.dispatch('showTip', '已开始播放')
				}).catch((error) => {
					console.log(error)
				})
			},
			// 添加歌曲到列表
			addSong(song) {
				// 获取歌曲详情
				this.$axios.get(this.MUrl + 'song/detail?ids=' + song.id).then((rsp) => {
					let s = rsp.data.songs[0]
					// 先添加到列表
					this.$store.dispatch('addSongToPlayList', {
			            "id": s.id,
			            "name": s.name,
			            "singers": s.ar.map((si) => {
			            	return si.name
			            }),
			            "album": s.al.name,
			            "img": s.al.picUrl,
			            "duration": s.dt            
		        	})

					// 显示提示
					this.$store.dispatch('showTip', '已添加到播放列表')
				}).catch((error) => {
					console.log(error)
				})
			}
		},
		mounted () {
			this.getQueryRs()
		},
		watch: {
			'$route': 'getQueryRs',
			// 页数变化了
			CurrentPage () {
				this.getQueryRs()
			}
		}
	}
</script>

<style scoped>
	.list {
		margin-top: 15px;
		width: 100%;
	}
	.row {
		display: flex;
		font-size: 12px;
		height: 45px;
		line-height: 45px;
	}
	.row-even {
		background-color: rgb(247,247,247);
	}
	.row:hover {
		border: 1px solid #ddd;
		background-color: #f2f2f2;
	}
	.row:hover .col-3 {
		opacity: 1;
	}
	.row a {
		text-decoration: none;
		color: #333;
	}
	.row a:hover {
		text-decoration: underline;
	}
	.row div {
		overflow: hidden;
		white-space: nowrap;
	    text-overflow: ellipsis;
		margin-left: 10px;
	}
	.col-1 {
		width: 20px;
		margin-left: 10px;
	}
	.col-2 {
		width: 370px;
	}
	.col-3 {
		opacity: 0;
		transition: opacity .3s;
		width: 96px;
	}
	.col-4 {
		width: 130px;
	}
	.col-5 {
		width: 155px;
	}
	.col-6 {
		width: 40px;
	}
	
	.pl {
		display: inline-block;
	    width: 17px;
	    height: 17px;
	    cursor: pointer;
	    vertical-align: middle;
	    background: url(http://s2.music.126.net/style/web2/img/table.png?3824f20c1fa634d58789efe3e5df2ad6) no-repeat 0 9999px;
	    margin-bottom: 2px;
	    background-position: 0 -103px;
	}
	.pl:hover {
		background-position: 0 -128px;
	}
	.icon {
		display: inline-block;
	    width: 13px;
	    height: 13px;
	    cursor: pointer;
	    vertical-align: middle;
	    background: url(http://s2.music.126.net/style/web2/img/icon.png?b6325b994a87c7256c9674b1bf48755d) no-repeat 0 9999px;
	}
	.add {
	    margin-bottom: 3px;
		background-position: 0 -700px;
	}
	.add:hover {
		background-position: -22px -700px;
	}
	.scr {
		margin-left: 5px;
	    width: 18px;
    	height: 16px;
		background: url(http://s2.music.126.net/style/web2/img/table.png?3824f20c1fa634d58789efe3e5df2ad6) no-repeat 0 9999px;
		background-position: 0 -174px;
	}
	.scr:hover {
		background-position: -20px -174px;
	}
</style>