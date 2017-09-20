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
					<span v-for="(ar,i) in songObj.singers"><a href="javascript:void(0)">{{ar}}</a>&nbsp;<span v-if="i != songObj.singers.length - 1">/</span>&nbsp;</span>
				</p>
				<p>所属专辑：
					<a href="javascript:void(0)">{{songObj.album}}</a>
				</p>
			</div>
			<div class="ops">
				
			</div>
			<div class="lyric">
				
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
		            // 0代表没有mv
		            "mv": 0
				}
			}
		},
		computed: {

		},
		methods: {
			getSong() {
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
					this.songObj.lyric = ""
					this.songObj.mv = rspSong.mv
				}).catch((error) => {
					console.log(error)
				})
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
</style>