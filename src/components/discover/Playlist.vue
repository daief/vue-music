<template>
	<!-- 这个歌单是歌单页面，子目录下的是歌单详情页面 -->
	<div class="pl-li">
		<Loading v-show="isLoading"></Loading>
		<div class="panel" v-show="!isLoading">
			<div class="panel-title">
				<div class="p-t-text">{{cat}}</div>
				<div class="cat">
					<a href="javascript:;">选择分类<em></em></a>
					<div class="cat-panel">
						
					</div>
				</div>
				<div class="hot-new">
					<a @click="toggleOrder('hot')" href="javascript:;" class="left" :class="{active: order == 'hot'}">热门</a><a @click="toggleOrder('new')" href="javascript:;" class="right" :class="{active: order == 'new'}">最新</a>
				</div>
			</div>
			<div class="panel-body">
				<div class="p-b-item"  v-for="(item,index) in playList">
					<div  style="position:relative;">
						<router-link :to="{ name: 'PlayListDetail', params: { listId: item.id }}">
							<img :src="item.coverImgUrl" alt="">
						</router-link>
						<div class="button">
							<span class="icon-headset"></span>
							<span class="number">{{item.playCount}}</span>
							<a href="javascript:;" class="icon-play"
								@click.stop.prevent="playAllList(item.id)"></a>
						</div>
					</div>
					<a href="javascript:;" class="desc">{{item.name}}</a>
					<div><span style="font-size:12px;color:#aaa;">by&nbsp;</span><a href="javascript:;" class="creator">{{item.creator.nickname}}</a></div>
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<Page></Page>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	import Page from '../common/Page'
	import Loading from '../common/Loading'

	export default {
		name: 'Playlist',
		components: {
			'Page': Page,
			'Loading': Loading
		},
		data () {
			return {
				isLoading: true,
				playList: [
					{
						id: 0,
						name: '',
						coverImgUrl: '',
						playCount: '',
						creator: {
							nickname: ''
						}
					}
				],
				order: 'hot',
				cat: '全部',
				allCat: {
					// 语种
					lan: ["华语", "欧美", "日语","韩语","粤语","小语种"],
					// 风格
					style: ['流行','摇滚','民谣','电子','舞曲','说唱','轻音乐','爵士','乡村','R&B/Soul','古典','民族','英伦','金属','朋克','蓝调','雷鬼','世界音乐','拉丁','另类/独立','New Age','古风','后摇','Bossa Nova'],
					// 场景
					occasion: ['清晨','夜晚','学习','工作','午休','下午茶','地铁','驾车','运动','旅行','散步','酒吧'],
					// 情感
					emotion: ['怀旧','清新','浪漫','性感','伤感','治愈','放松','孤独','感动','兴奋','快乐','安静','思念'],
					// 主题
					theme: ['影视原声','ACG','校园','游戏','70后','80后','90后','网络歌曲','KTV','经典','翻唱','吉他','钢琴','器乐','儿童','榜单','00后']
				}
			}
		},
		computed: {
			...mapGetters([
				'CurrentPage'
	        ])
		},
		methods: {
			getPlayLists(){
				this.isLoading = true
				let order = this.order
				let cat = this.cat
				let offset = 30 * (this.CurrentPage - 1)
				let params = 'order=' + order + '&cat=' + cat + '&limit=30&offset=' + offset
				this.$axios.get(this.MUrl + 'top/playlist?' + params).then((rsp) => {
					this.playList = rsp.data.playlists
					this.$store.dispatch('setResultCount', rsp.data.total)
					this.isLoading = false
				}).catch((error) => {
					console.log('歌单获取', error)
				})
			},
			// 根据list的id播放列表
			playAllList(listId){
				this.$axios.get(this.MUrl + 'playlist/detail?id=' + listId)
				.then((rsp) => {
					let list = rsp.data.playlist.tracks.map((v,i) => {
						return {
							"id": v.id,
				            "name": v.name,
				            "singers": v.ar.map((v2) => {
				            	return v2.name
				            }),
				            "album": v.al.name,
				            "img": v.al.picUrl,
				            "duration": v.dt
						}
					})
					this.$store.dispatch('setPlayList', list)
					this.$store.dispatch('setPlayIndex', 0)
					this.$store.dispatch('setMusicFormPlayList', this.$store.getters.PlayIndex)
					// 显示提示
					this.$store.dispatch('showTip', '已开始播放')
				}).catch((error) => {
					console.log(error)
					// 显示提示
					this.$store.dispatch('showTip', '请更换村通网')
				})
			},
			// 热门、最新切换
			toggleOrder(o) {
				this.order = o
			}
		},
		created(){
			this.getPlayLists()
		},
		watch: {
			// 页数变化了
			CurrentPage () {
				this.getPlayLists()
			},
			// 切换了热门、最新
			order(n, o) {
				this.getPlayLists()
			}
		}
	}
</script>

<style scoped>
	.pl-li {
		width: 980px;
		margin: 0 auto;
		padding-top: 25px;
		text-align: center;
		border: 1px solid rgb(211,211,211);
	}
	/*一个版面*/
	.panel {
		position: relative;
		width: 900px;
		margin: 0 auto;
		display: inline-block;
		margin-bottom: 10px;
	}
	/*版面标题*/
	.panel-title {
		width: 100%;
		height: 35px;
		border-bottom: 2px solid rgb(193,13,12);
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.p-t-text {
		font-size: 20px;
	}
	/*分类*/
	.cat {
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0 8px;
		margin-left: 13px;
		background-color: #fff;
	}
	.cat:active {
		background-color: rgb(246,246,246);
	}
	.cat a{
	    display: inline-block;
    	height: 23px;
    	line-height: 23px;
		text-decoration: none;
		font-style: normal;
		font-size: 12px;
		color: #0c73c2;
	}
	.cat em {
		background: url(http://s2.music.126.net/style/web2/img/icon.png?fa4c5ba8e293165d41c5262eca5bcce0) no-repeat 0 9999px;
		display: inline-block;
		overflow: hidden;
		vertical-align: middle;
		width: 8px;
		height: 5px;
		background-position: -70px -543px;
	}
	/*热门、最新切换*/
	.hot-new {
		position: absolute;
		right: 0;
	}
	.hot-new a {
		display: inline-block;
	    width: 46px;
	    height: 25px;
	    line-height: 25px;
	    text-align: center;
        font-size: 12px;
       	color: #000;
	    text-decoration: none;
	}
	.hot-new a:hover {
		text-decoration: underline;
	}
	.hot-new a.left {
		border: 1px solid #cdcdcd;
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}
	.hot-new a.right {
		border-right: 1px solid #cdcdcd;
		border-top: 1px solid #cdcdcd;
		border-bottom: 1px solid #cdcdcd;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
	.hot-new a.active {
		background-color: rgb(210,12,13);
		color: #fff;
	}


	.panel-body {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.p-b-item {
		width: 140px;
		/*height: 200px;*/
		text-align: left;
		margin: 15px 20px;
	}
	.p-b-item a {
		text-decoration: none;
		word-wrap: break-word;
    	word-break: break-word;
	}
	.p-b-item a:hover {
		cursor: pointer;
		text-decoration: underline;
	}
	.p-b-item .desc {
		font-size: 14px;
		line-height: 1.4;
		color: #000;
	}
	.p-b-item .creator {
		font-size: 12px;
		line-height: 1.5;
		color: #666;
	}
	.p-b-item img {
		width: 140px;
		height: 140px;
		border: 1px solid #cdcdcd;
		cursor: pointer;
	}
	.p-b-item .button {
		width: 140px;
		height: 27px;
		bottom: 5px;
	    background: url(http://s2.music.126.net/style/web2/img/coverall.png?1e98b3d12b62277e7793e9fbf4e52428) no-repeat;
	    background-position: 0 -537px;
		position: absolute;
	}
	.button .icon-play {
		position: absolute;
		top: 5px;
		right: 15px;
		display: inline-block;
	    width: 16px;
    	height: 17px;
		background: url(http://s2.music.126.net/style/web2/img/iconall.png?1f53de8c739a79763d9c1cb3053493f0) no-repeat;
		background-position: 0 0;
	}
	.button .icon-play:hover {
		background-position: 0 -60px;
	}
	.button .icon-headset{
		position: absolute;
		width: 14px;
		height: 11px;
		display: inline-block;
		background: url(http://s2.music.126.net/style/web2/img/iconall.png?1f53de8c739a79763d9c1cb3053493f0) no-repeat;
		background-position: 0 -24px;
		margin-top: 8px;
		margin-left: 5px;
	}
	.button .number{
		position: absolute;
		display: inline-block;
		color: #ccc;
		font-size: 12px;
		line-height: 16px;
		height: 16px;
		margin-top: 5px;
		margin-left: 22px;
	}
</style>