<template>
	<!-- 排行榜 -->	
	<div class="top-list">
		<div class="left-wrap">
			<h2 class="lists-title">云音乐特色榜</h2>
			<ul class="lists">
				<router-link v-for="(l, idx) in yunMusicList" :key="l.id" :to="{path: $route.path + '?id=' + l.id}" >
					<li :class="{active: l.id == pageId}">
						<img :src="l.imgUrl" :alt="l.name">
						<span class="li-ti">{{ l.name }}</span>
						<br />
						<span class="li-st">{{ l.status }}</span>
					</li>
				</router-link>
			</ul>
			<img src="../../assets/images/1.gif" alt="老司机" class="old-driver">
		</div>
		<div class="right-wrap">
			<div class="r-w-head">
				<div class="cover-pic">
					<img :src="pageList.img" alt="">
				</div>
				<div class="intr-info">
					<h4 class="list-name">{{ pageList.name }}</h4>
					<!-- 更新信息 -->
					<div class="update-info">
						<i class="icon-clock"></i> 最近更新：{{new Date(pageList.updateTime).getMonth() + 1}}月{{new Date(pageList.updateTime).getDate()}}日 <font color="#999">（{{getYunMusicInfoById(pageId).status}}）</font>
					</div>
					<!-- 操作 -->
					<div class="ops">
						<a href="javascript:;" class="play" title="播放" @click="playPageList()">
							<em class="pl"></em>播放
						</a>
						<a href="javascript:;" class="add" title="添加到列表" @click="addPageList()"></a>
					</div>
				</div>
			</div>
			<div class="list-head">
				<span class="head-text">歌曲列表</span>
				<span class="number">{{pageList.tracks.length}}首歌</span>
				<span class="play-count">播放：<span style="color:#c20c0c;">{{pageList.playCount}}</span>次</span>
			</div>
			<!-- 曲目 -->
			<table class="list-table">
				<thead>
					<tr>
						<th class="col-1"></th>
						<th class="col-2">标题</th>
						<th class="col-3">时长</th>
						<th class="col-4">歌手</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(song,idx) in pageList.tracks" :class="{even: idx % 2 == 0}">
						<td class="col-1">
							<div class="col-1-div">
								<span class="li-idx">{{idx + 1}}</span>
							</div>
						</td>
						<td class="col-2">
							<router-link :title="song.name"  v-if="idx < 3" style="margin: 10px 5px;" :to="{ name: 'Song', params: { songId: song.id }}"><img :src="song.img" style="width:50px;"></router-link>
							<span class="li-pl" @click="playSong(song)" title="music~go"></span>
							<router-link :title="song.name"
								:to="{ name: 'Song', params: { songId: song.id }}">{{song.name}}</router-link>
						</td>
						<td class="col-3">
							<div class="song-duration">
								{{formatSecondTime(song.duration / 1000)}}
							</div>
							<div class="opt">
								<a href="javascript:;" class="ic-add" title="添加歌曲到播放列表" @click="addSongToPlayList(song)"></a>
							</div>
						</td>
						<td class="col-4"><a href="javascript:;"  :title="song.singers">{{...song.singers}}</a></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Toplist',
		data () {
			return {
				// 参数id
				pageId: 0,
				// 当前list
				pageList: {
					id: 0,
					name: '',
					img: '',
					playCount: '',
					description: '',
					tags: [''],
					updateTime: 0,
					creator: {
						nickname: '',
						avatarUrl: ''
					},
					createTime: 0,
					tracks: [
						{
							id: 0,
                            name: '',
                            singers: [''],
                            album: '',
                            img: '',
                            duration: 0
						}
					]
				},
				// 云音乐特色榜
				yunMusicList: [
					{
						id: 19723756,
						name: '云音乐飙升榜',
						imgUrl: 'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=40y40',
						status: '每天更新'
					},
					{
						id: 3779629,
						name: '云音乐新歌榜',
						imgUrl: 'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40',
						status: '每天更新'
					},
					{
						id: 2884035,
						name: '网易原创歌曲榜',
						imgUrl: 'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=40y40',
						status: '每周四更新'
					},
					{
						id: 3778678,
						name: '云音乐热歌榜',
						imgUrl: 'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=40y40',
						status: '每周四更新'
					}
				]
			}
		},
		methods: {
			getYunMusicInfoById(id) {
				for (let i = 0; i < this.yunMusicList.length; i++) {
					if (this.yunMusicList[i].id == id) {
						return this.yunMusicList[i]
					}
				}
			},
			setSomeDataDefault(){
				this.pageList = {"id":0,"name":"","img":"","playCount":"","description":"","tags":[""],"updateTime":0,"creator":{"nickname":"","avatarUrl":""},"createTime":0,"tracks":[{"id":0,"name":"","singers":[""],"album":"","img":"","duration":0}]}
			},
			// 拉取榜单详情
			getTopList(){
				for (let i = 0; i < this.yunMusicList.length; i++) {
					if (this.yunMusicList[i].id == this.$route.query.id) {
						this.pageId = this.yunMusicList[i].id
						break
					} else {
						this.pageId = 0
					}
				}
				this.pageId = this.pageId || 19723756
				// 拉取歌曲信息前将data重置
				this.setSomeDataDefault()
				this.$axios.get(this.MUrl + 'playlist/detail?id=' + this.pageId)
				.then((rsp) => {
					let rl = rsp.data.playlist
					this.pageList = {
						id: rl.id,
						name: rl.name,
						img: rl.coverImgUrl,
						playCount: rl.playCount,
						description: rl.description,
						tags: rl.tags,
						updateTime: rl.updateTime,
						creator: {
							nickname: rl.creator.nickname,
							avatarUrl: rl.creator.avatarUrl
						},
						createTime: rl.createTime,
						tracks: rl.tracks.map((song) => {
							return {
								id: song.id,
	                            name: song.name,
	                            singers: song.ar.map((ar) => {
	                            	return ar.name
	                            }),
	                            album: song.al.name,
	                            img: song.al.picUrl,
	                            duration: song.dt
							}
						})
					}
				}, (err) => {
					console.log('排行榜', err)
				})
			},
			// 播放列表
			playPageList(){
				this.$store.dispatch('setPlayList', this.pageList.tracks)
				this.$store.dispatch('setPlayIndex', 0)
				this.$store.dispatch('setMusicFormPlayList', this.$store.getters.PlayIndex)
				this.$store.dispatch('showTip', '已开始播放')
			},
			// 添加歌单到播放列表
			addPageList(){
				for(let i = 0; i < this.pageList.tracks.length; i++) {
					this.$store.dispatch('addSongToPlayList', this.pageList.tracks[i])
				}
				this.$store.dispatch('showTip', '已添加到列表')
			},
			// 添加歌曲到播放列表
			addSongToPlayList(song) {
				// 已经在播放当前歌曲
				if (this.$store.getters.Music.id == song.id) {
					this.$store.dispatch('showTip', '已正在播放')
					return;
				}
				// 先添加到列表
				this.$store.dispatch('addSongToPlayList', song)
				this.$store.dispatch('showTip', '已添加到列表')
			},
			// 播放列表中的单曲
			playSong(song) {
				// 已经在播放当前歌曲
				if (this.$store.getters.Music.id == song.id) {
					this.$store.dispatch('showTip', '已开始播放')
					return;
				}
				// 先添加到列表
				this.$store.dispatch('addSongToPlayList', song)
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
			},
			// 将秒数格式化成时:分
			formatSecondTime(second){
				let min = Number.parseInt(second / 60) || 0
				let sec = Number.parseInt(second) % 60 || 0
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			}
		},
		created () {
			this.getTopList()
		},
		watch: {
	    	'$route' (to, from) {
	      		this.getTopList()
	    	}
	  	}
	}
</script>

<style scoped>
	.top-list {
		width: 980px;
		margin: 0 auto;
		display: flex;
		align-items: stretch;
		outline: #d3d3d3 solid 1px;
	}
	.old-driver {
		margin: 15px 0;
		width: 100%;
	}
	.left-wrap {
		background-color: rgb(249,249,249);
		width: 240px;
		position: relative;
		padding: 30px 0;
	}
	.left-wrap:after {
		content: "";
		position: absolute;
		top: 0;
		right: 0;
		width: 1px;
		height: 100%;
		background-color: #d3d3d3;

	}
	.right-wrap {
		width: 740px;
		padding: 45px;
	}
	.lists-title {
		font-family: simsun;
	    font-size: 15px;
	    color: #000;
	    padding: 10px;
	}
	.lists {
		list-style-type: none;
	}
	.lists li {
		height: 60px;
		padding: 10px;
		cursor: pointer;
		padding-left: 25px;
	}
	.lists li:hover {
		background-color: #f4f2f2;
	}
	.lists li.active {
		background-color: rgb(230,230,230);
	}
	.lists a {
		text-decoration: none;
	}
	.lists li img {
		width: 40px;
		height: 40px;
		float: left;
	}
	.li-ti, .li-st {
		float: left;
		margin-left: 10px;
		display: inline-block;
		height: 20px;
		line-height: 20px;
		font-size: 12px;
		color: #999;
	}
	.li-ti {
		color: #000;
	}
	/*right*/
	.r-w-head {
		display: flex;
	}
	.cover-pic {
		width: 150px;
		height: 150px;
		text-align: center;
		background: url(http://s2.music.126.net/style/web2/img/coverall.png?29f6499537b63f2a616b4fd16bff035d) no-repeat;
		background-position: -230px -380px;
	}
	.cover-pic img {
		position: relative;
		z-index: -1;
		width: 150px;
		height: 150px;
		border: solid #cdcdcd 1px;
		padding: 2px;
		vertical-align: middle;
	}
	/*其他信息*/
	.intr-info {
		margin-left: 45px;
	}
	.list-name {
		padding: 10px 0;
	    font-size: 20px;
	    font-weight: normal;
	    font-family: "Microsoft Yahei", Arial, Helvetica, sans-serif;
	    color: #333;
	}
	.update-info {
		font-size: 12px;
		height: 35px;
		line-height: 35px;
		vertical-align: middle;
		color: #666;
	}
	.icon-clock {
		display: inline-block;
		width: 13px;
	    height: 13px;
	    background: url(http://s2.music.126.net/style/web2/img/icon.png?a65799eaaf5f24cfb399cc7acc347ab9) no-repeat 0 9999px;
	    background-position: -18px -682px;
	    vertical-align: middle;
	    margin-right: 5px;
	}
	/*操作栏*/
	.ops {
		margin: 10px 0;
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
	/*曲目*/
	.list-head {
		margin-top: 45px;
		height: 35px;
		position: relative;
	}
	.list-head:after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 2px;
		background-color: #c20c0c;
		clear: both;
	}
	.list-head span {
		display: inline-block;
		height: 35px;
		line-height: 35px;
		vertical-align: middle;
	}
	.head-text {
		font-size: 20px;
	}
	.number {
		margin-left: 7px;
		font-size: 12px;
		color: #333;
	}
	.play-count {
		font-size: 12px;
		color: #333;
		float: right;
	}
	.list-table {
		width: 100%;
		margin-bottom: 13px;
		border-collapse:collapse;
		border-bottom: 1px solid #d9d9d9;
		border-right: 1px solid #d9d9d9;
		border-left: 1px solid #d9d9d9;
		font-size: 12px;
	}
	.list-table thead th {
		height: 34px;
		text-align: left;
	    font-weight: normal;
	    color: #666;
	    background: url(http://s2.music.126.net/style/web2/img/table.png?0cee541075da9e932dc39c8aa877c304) no-repeat 0 9999px;
	    background-color: #f7f7f7;
	    background-position: 0 0;
		background-repeat: repeat-x;
		border-right: 1px solid rgba(199,199,199,0.4);
		padding-left: 10px;
	}
	.col-1 {
		width: 80px;
		max-width: 80px;
	}
	.col-2 {
		width: 385px;
		max-width: 385px;
	}
	.col-3 {
		cursor: pointer;
		width: 90px;
		max-width: 90px;
	}
	.col-4 {
		width: 95px;
		max-width: 95px;
	}
	tbody tr {
		height: 30px;
	}
	.even {
		background-color: rgb(247,247,247);
	}
	tbody td {
		padding-left: 10px;
		padding-right: 10px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    color: #333;
	}
	tbody a {
		display: inline-block;
		color: #333;
		text-decoration: none;
		vertical-align: middle;
	}
	tbody a:hover {
		text-decoration: underline;
	}
	.col-1-div {
		text-align: center;
	}
	.li-idx {
		font-size: 13px;
		height: 17px;
		color: #999;
	}
	.li-pl {
		vertical-align: middle;
		display: inline-block;
		margin: 0 5px;
		height: 17px;
		width: 17px;
	    background: url(http://s2.music.126.net/style/web2/img/table.png?0cee541075da9e932dc39c8aa877c304) no-repeat 0 9999px;
        cursor: pointer;
    	background-position: 0 -103px;
	}
	.li-pl:hover {
	    background-position: 0 -128px;
	}
	.opt {
		display: none;
	}
	.col-3:hover .song-duration {
		display: none;
	}
	.col-3:hover .opt {
		display: block;
	}
	.ic-add {
		display: inline-block;
		width: 13px;
	    height: 13px;
	    background: url(http://s2.music.126.net/style/web2/img/icon.png?a65799eaaf5f24cfb399cc7acc347ab9) no-repeat 0 9999px;
	    background-position: 0 -700px;
	}
	.ic-add:hover {
    	background-position: -22px -700px;
	}
</style>