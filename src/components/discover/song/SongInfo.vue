<template>
	<div class="song-info">
		<div class="album-pic">
			<img :src="songObj.img" alt="">
		</div>
		<div class="song-content">
			<div class="head">
				<i class="icon song-i"></i>
				<span class="song-name">{{songObj.name}}</span>
				<i class="icon mv-i" v-show="songObj.mv != 0"></i>
			</div>
			<div class="artists">
				<p>歌手：
					<span v-for="(ar,i) in songObj.singers"><a href="javascript:;">{{ar}}</a>&nbsp;<span v-if="i != songObj.singers.length - 1">/</span>&nbsp;</span>
				</p>
				<p>所属专辑：
					<a href="javascript:;">{{songObj.album}}</a>
				</p>
			</div>
			<div class="ops">
				<a href="javascript:;" class="play" title="播放" @click="playSong">
					<em class="pl"></em>播放
				</a>
				<a href="javascript:;" class="add" title="添加到列表" @click="addSong"></a>
			</div>
			<div class="lyric">
				<p v-show="!songObj.lyric">暂时没有歌词</p>
				<!-- 默认显示的前一部分的歌词 -->
				<p v-html="firstHalfLyric"></p>
				<!-- 默认隐藏的剩余部分的歌词 -->
				<p v-html="lastHalfLyric" v-show="isShowAllLyric"></p>
				<a href="javscript:void(0)" v-show="songObj.lyric"
					class="lryic-switch" @click.stop.prevent="toggleLyric">
					{{isShowAllLyric?'收起':'展开'}}<i class="icon arr-down" :class="{'arr-up':isShowAllLyric}"></i></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SongInfo',
		// props: [''],
		data () {
			return {
				songObj: {
					"id": 0,
		            "url": "",
		            "name": "",
		            "singers": [],
		            "album": "",
		            "img": "",
		            "lyric": "",
		            "duration": 0,
		            // 0代表没有mv
		            "mv": 0
				},
				// 歌词作者
				lyricUser: "",
				// 是否显示所有歌词
				isShowAllLyric: false
			}
		},
		computed: {
			// 解析的歌词
			lyricAnalyze() {
				let rs = this.songObj.lyric.replace(/\[(\d*):(\d*)\.(\d*)\]/g, '')
				return rs.replace(/\n/g, '<br />')
			},
			// 预先展示的部分歌词
			firstHalfLyric() {
				if (this.lyricAnalyze) {
					let reg = new RegExp('\n', 'g')
					let lines = this.songObj.lyric.match(reg).length
					let fromindex = Number.parseInt(this.lyricAnalyze.length * 1 / 4)
					return this.lyricAnalyze.substr(0, this.lyricAnalyze.indexOf('<br />', fromindex))
				} else {
					return ''
				}
			},
			// 后半部分歌词
			lastHalfLyric() {
				if (this.firstHalfLyric) {
					return this.lyricAnalyze.substr(this.firstHalfLyric.length, this.lyricAnalyze.length - this.firstHalfLyric.length)
				} else {
					return ''
				}
			}
		},
		methods: {
			setSomeDataDefault() {
				this.songObj = {
					"id": 0,
		            "url": "",
		            "name": "",
		            "singers": [],
		            "album": "",
		            "img": "",
		            "lyric": "",
		            "duration": 0,
		            "mv": 0
				}
				this.lyricUser = ''
				this.isShowAllLyric = false
			},
			// 获取歌曲详情
			getSong() {
				// 拉取歌曲信息前将data置空
				this.setSomeDataDefault()
				// 歌曲信息
				this.$axios.get(this.MUrl + 'song/detail?ids=' + this.$route.params.songId)
				.then((rsp) => {
					let rspSong = rsp.data.songs[0]
					this.songObj.id = rspSong.id
					this.songObj.name = rspSong.name
					this.songObj.singers = rspSong.ar.map((si) => {
						return si.name
					})
					this.songObj.album = rspSong.al.name
					this.songObj.img = rspSong.al.picUrl
					this.songObj.duration = rsp.dt
					this.songObj.mv = rspSong.mv
				}).catch((error) => {
					console.log(error)
				})
				// 歌词，如果是当前播放的歌曲，直接拿，否则请求
				if (this.$route.params.songId == this.$store.getters.Music.id) {
					this.songObj.lyric = this.$store.getters.Music.lyric
				} else {
					this.$axios.get(this.MUrl + 'lyric?id=' + this.$route.params.songId).then((rsp) => {
						this.songObj.lyric = rsp.data.lrc.lyric || ''
						this.lyricUser = rsp.data.lyricUser.nickname || ''
					}).catch((error) => {

					})
				}
			},
			// 展示、收起歌词
			toggleLyric () {
				this.isShowAllLyric = !this.isShowAllLyric
			},
			// 播放歌曲
			playSong () {
				// 已经在播放当前歌曲
				if (this.$store.getters.Music.id == this.songObj.id) {
					this.$store.dispatch('showTip', '已开始播放')
					return;
				}
				// 先添加到列表
				this.addSong()
				// 再播放
				for (let i = 0; i < this.$store.getters.PlayList.length; i++) {
					if (this.songObj.id == this.$store.getters.PlayList[i].id) {
						this.$store.dispatch('setPlayIndex', i)
						this.$store.dispatch('setMusicFormPlayList', i)
						break
					}
				}
				// 显示提示
				this.$store.dispatch('showTip', '已开始播放')
			},
			// 添加到列表
			addSong () {
				let song = {
		            "id": this.songObj.id,
		            "name": this.songObj.name,
		            "singers": this.songObj.singers,
		            "album": this.songObj.album,
		            "img": this.songObj.img,
		            "duration": this.songObj.duration	            
	        	}
				this.$store.dispatch('addSongToPlayList', song)
				// 显示提示
				this.$store.dispatch('showTip', '已添加到播放列表')
			}
		},
		mounted () {
			this.getSong()
		},
		watch: {
			// 当路由变化的时候会再次执行该函数
			'$route': 'getSong'
		}
	}
</script>

<style scoped>
	.song-info {
		width: 100%;
		padding-top: 20px;
		display: flex;
		justify-content: center;
	}
	.album-pic {
		width: 205px;
		height: 205px;
		text-align: center;
		background: url(http://s2.music.126.net/style/web2/img/coverall.png?26006c91b6174bc68deb20da0625b501) no-repeat;
		background-position: -140px -580px;
		line-height: 200px;
	}
	.album-pic img {
		position: relative;
		z-index: -1;
		width: 132px;
		height: 132px;
		vertical-align: middle;
	}
	.song-content {
		width: 415px;
		margin-left: 20px;
	}
	.head {
		height: 31px;
		line-height: 31px;
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.icon {
		background: url(http://s2.music.126.net/style/web2/img/icon.png?cb860192cac0dbc20dba7415cf23bd58) no-repeat;
	}
	.song-i {
	    width: 54px;
	    height: 24px;
	    display: inline-block;
	    background-position: 0 -463px;
	}
	.song-name {
		font-size: 24px;
		height: 31px;
		display: inline-block;
		max-width: 310px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	    margin-left: 7px;
	}
	.mv-i {
		width: 21px;
	    height: 18px;
	    display: inline-block;
	    background-position: 0 -18px;
	    position: absolute;
	    right: 5px;
	}
	.artists {
		
	}
	.artists p {
		color: #999;
		font-size: 12px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.artists a,
	.artists a:active {
		color: #0c73c2;
		text-decoration: none;
	}
	.artists a:hover {
		text-decoration: underline;
	}
	/*操作栏*/
	.ops {
		height: 31px;
	}
	.ops a {
		display: inline-block;
	    height: 31px;
	    line-height: 31px;
	    overflow: hidden;
	    vertical-align: top;
	    text-align: center;
	    cursor: pointer;
	    color: white;
	    text-decoration: none;
	    font-size: 12px;
	    background: url(http://s2.music.126.net/style/web2/img/button2.png?438fe318a807ebd7bd9c4b39993f580b) no-repeat 0 9999px;
	}
	.play {
		width: 66px;
		background-position: 0px -387px !important;
	}
	.play:hover {
	    background-position: 0 -469px !important;
	}
	.play:hover .pl {
		background-position: -28px -1622px !important;
	}
	.pl {
		background: url(http://s2.music.126.net/style/web2/img/button2.png?438fe318a807ebd7bd9c4b39993f580b) no-repeat 0 9999px;
		float: left;
	    width: 20px;
	    height: 18px;
	    margin: 7px 0px 2px 5px;
	    background-position: 0 -1622px;
	    overflow: hidden;
	}
	.add {
	    width: 31px;
	    margin-left: -5px;
	    padding-right: 0;
	    background-position: 0 -1588px !important;
	}
	.add:hover {
	    background-position: -40px -1588px !important;
	}
	/*歌词部分*/
	.lyric {
		margin-top: 16px;
		margin-bottom: 13px;
	}
	.lyric p{
		font-size: 12px;
	    color: #333;
	    line-height: 23px;
	    height: auto !important;
	    min-height: 23px;
	}
	.lryic-switch {
		font-size: 12px;
	    color: #0c73c2;	
	    text-decoration: none;
	}
	.lryic-switch:hover {
		text-decoration: underline;
	}
	.arr-down {
		width: 11px;
	    height: 8px;
	    display: inline-block;
	    background-position: -65px -520px;
	}
	.arr-up {
		width: 11px;
	    height: 8px;
	    display: inline-block;
	    background-position: -45px -520px;
	}
</style>