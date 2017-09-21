<template>
	<div>
		<div class="list-info">
			<img class="list-pic" :src="listObj.img" alt="">
			<div class="list-content">
				<div class="head">
					<i class="icon list-i"></i>
					<span class="list-name">{{listObj.name}}</span>
				</div>
				<div class="creator">
					<img :src="listObj.creator.avatarUrl" class="avatar">
					<a href="javascript:;" class="creator-nickname">{{listObj.creator.nickname}}</a>
					<span class="create-time">{{getStrTime}}创建</span>
				</div>
				<div class="ops">
					<a href="javascript:;" class="play" title="播放" @click="">
						<em class="pl"></em>播放
					</a>
					<a href="javascript:;" class="add" title="添加到列表" @click=""></a>
				</div>
				<div class="tags">
					标签：
					<div class="tag" v-for="tag in listObj.tags">{{tag}}</div>
				</div>
				<div class="description">
					<p v-html="getDescription.substr(0, 100)" v-show="!isShowAllDesc">
					</p>
					<p v-html="getDescription" v-show="isShowAllDesc">
					</p>
					<a href="javascript:;" v-show="getDescription.length>100" class="desc-switch"
						@click="toggleShowDesc">{{isShowAllDesc?'收起':'展开'}}<i class="icon arr-down" :class="{'arr-up':isShowAllDesc}"></i></a>
				</div>
			</div>
		</div>
		<div class="list">
			<div class="list-head">
				<span class="head-text">歌曲列表</span>
				<span class="number">{{listObj.tracks.length}}首歌</span>
				<span class="play-count">播放：<span style="color:#c20c0c;">{{listObj.playCount}}</span>次</span>
			</div>
			<!-- 歌单曲目 -->
			<table class="list-table">
				<thead>
					<tr>
						<th class="col-1"></th>
						<th class="col-2">歌曲标题</th>
						<th class="col-3">时长</th>
						<th class="col-4">歌手</th>
						<th class="col-5">专辑</th>
					</tr>
				</thead>
				<tbody>
					<!-- 歌单列表 -->
					<tr v-for="(song,idx) in listObj.tracks" :class="{even: idx % 2 == 0}">
						<td class="col-1">
							<div class="col-1-div">
								<span class="li-idx">{{idx + 1}}</span>
								<span class="li-pl" @click=""></span>
							</div>
						</td>
						<td class="col-2">
							<router-link :title="song.name"
								:to="{ name: 'Song', params: { songId: song.id }}">{{song.name}}</router-link>
						</td>
						<td class="col-3">{{formatSecondTime(song.duration / 1000)}}</td>
						<td class="col-4">{{...song.singers}}</td>
						<td class="col-5">{{song.album}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ListInfo',
		// props: [''],
		data () {
			return {
				listObj: {
					id: 0,
					name: '',
					img: '',
					playCount: '',
					description: '',
					tags: [''],
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
				isShowAllDesc: false
			}
		},
		computed: {
			getStrTime() {
				let date = new Date(this.listObj.createTime)
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
			},
			getDescription() {
				if (this.listObj.description)
					return '介绍：' + this.listObj.description.replace(/\n/g, '<br />')
				else
					return ''
			}
		},
		methods: {
			setSomeDataDefault() {
				this.listObj = {id:0,name:'',img:'',playCount:'',description:'',tags:[''],creator:{nickname:'',avatarUrl:''},createTime:0,tracks:[{id:0,name:'',singers:[''],album:'',img:'',duration:0}]}
			},
			// 获取歌曲详情
			getList() {
				// 拉取歌曲信息前将data置空
				this.setSomeDataDefault()
				
				this.$axios.get(this.MUrl + 'playlist/detail?id=' + this.$route.params.listId)
				.then((rsp) => {
					let rl = rsp.data.playlist
					this.listObj = {
						id: rl.id,
						name: rl.name,
						img: rl.coverImgUrl,
						playCount: rl.playCount,
						description: rl.description,
						tags: rl.tags,
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
				}).catch((error) => {
					console.log('歌单详情', error)
				})
			},
			toggleShowDesc() {
				this.isShowAllDesc = !this.isShowAllDesc
			},
			formatSecondTime(second){
				let min = Number.parseInt(second / 60) || 0
				let sec = Number.parseInt(second) % 60 || 0
				return (min > 9? min: '0' + min) + ':' + (sec > 9? sec: '0' + sec)
			}
		},
		mounted () {
			this.getList()
		},
		watch: {
			// 当路由变化的时候会再次执行该函数
			'$route': 'getList'
		}
	}
</script>

<style scoped>
	.list-info {
		width: 640px;
		padding-top: 20px;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}
	.list-pic {
		position: relative;
		z-index: 2;
		width: 195px;
		height: 195px;
		padding: 3px;
		border: 1px solid #ccc;
		display: block;
		transition: all .3s;
	}
	.list-pic:hover {
		transform: scale(2,2) rotate(360deg);
	}
	.list-content {
		width: 415px;
		margin-left: 30px;
	}
	.head {
		min-height: 24px;
		line-height: 24px;
		height: auto;
		position: relative;
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-start;
		margin-bottom: 13px;
	}
	.icon {
		background: url(http://s2.music.126.net/style/web2/img/icon.png?cb860192cac0dbc20dba7415cf23bd58) no-repeat;
	}
	.list-i {
	    width: 54px;
	    height: 24px;
	    display: inline-block;
	    background-position: 0 -243px;
	}
	.list-name {
		font-size: 19px;
		min-height: 24px;
		display: inline-block;
		max-width: 310px;
		margin-left: 7px;
		font-weight: normal;
	}
	/*创建者*/
	.creator {
		height: 35px;
		display: flex;
		align-items: center;
		margin-bottom: 13px;
	}
	.avatar {
		width: 35px;
		height: 35px;
	}
	.creator-nickname {
		text-decoration: none;
		font-size: 12px;
		color: #0c73c2;
		margin-left: 15px;
	}
	.creator-nickname:hover {
		text-decoration: underline;
	}
	.create-time {
		margin-left: 15px;
		font-size: 12px;
		color: #808080;
	}
	/*标签*/
	.tags {
		display: flex;
		align-items: center;
		height: 22px;
		color: #666;
		font-size: 12px;
		margin-bottom: 13px;
	}
	.tag {
		font-size: 10px;
		padding: 1px 5px 1px 5px;
		border: 1px solid #666;
		border-radius: 18px;
		margin: 0 5px 0 5px;
		background: linear-gradient(top, #fff, #ccc);
	}
	/*操作栏*/
	.ops {
		height: 31px;
		margin-bottom: 13px;
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
	/*描述*/
	.description {
		position: relative;
		margin-bottom: 13px;
	}
	.description p {
		font-size: 12px;
	    color: #333;
	    line-height: 23px;
	    height: auto !important;
	    min-height: 23px;
	}
	.desc-switch {
		font-size: 12px;
	    color: #0c73c2;	
	    text-decoration: none;
	    position: relative;
	    left: 100%;
	    margin-left: -40px;
	}
	.desc-switch:hover {
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
	/*歌单曲目*/
	.list {
		width: 640px;
		margin: 0 auto;
	}
	.list-head {
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
		width: 74px;
		max-width: 74px;
	}
	.col-2 {
		width: 237px;
		max-width: 237px;
	}
	.col-3 {
		width: 111px;
		max-width: 111px;
	}
	.col-4 {
		width: 89px;
		max-width: 89px;
	}
	.col-5 {
		width: 127px;
		max-width: 127px;
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
		color: #333;
		text-decoration: none;
	}
	tbody a:hover {
		text-decoration: underline;
	}
	.col-1-div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.li-idx {
		height: 17px;
		color: #999;
	}
	.li-pl {
		height: 17px;
		width: 17px;
	    background: url(http://s2.music.126.net/style/web2/img/table.png?0cee541075da9e932dc39c8aa877c304) no-repeat 0 9999px;
        cursor: pointer;
    	background-position: 0 -103px;
	}
	.li-pl:hover {
	    background-position: 0 -128px;
	}
</style>