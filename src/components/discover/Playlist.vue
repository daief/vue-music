<template>
	<!-- 这个歌单是歌单页面，子目录下的是歌单详情页面 -->
	<div class="pl-li">
		<Loading v-show="isLoading"></Loading>
		<div class="panel" v-show="!isLoading">
			<div class="panel-title">
				<div class="p-t-text">网友精选碟</div>
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
				</div>
			</div>
		</div>

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
				]
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
				let order = 'hot'
				let cat = '全部'
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
			}
		},
		created(){
			this.getPlayLists()
		},
		watch: {
			// 页数变化了
			CurrentPage () {
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
		background: url(http://s2.music.126.net/style/web2/img/index/index.png?4708415b697a3fdf22bda20b0ce78d2f) no-repeat 0 9999px;
		background-position: -225px -153px;
	}
	.p-t-text {
		margin-left: 35px;
		font-size: 20px;
	}
	.p-t-small {
		font-size: 12px;
		line-height: 14px;
		height: 14px;
		margin-left: 2.5em;
		color: #666;
	}
	.p-t-small a {
		text-decoration: none;
		color: #666;
	}
	.p-t-small a:hover {
		text-decoration: underline;
	}
	.p-t-more {
		position: absolute;
		right: 0px;
		height: 20px;
		font-size: 12px;
		line-height: 20px;
		color: #666;
		cursor: pointer;
	}
	.p-t-more span {
		line-height: 20px;
		display: inline-block;
	}
	.p-t-more .icon {
		width: 12px;
		height: 11px;
		background: url(http://s2.music.126.net/style/web2/img/index/index.png?4708415b697a3fdf22bda20b0ce78d2f) no-repeat 0 9999px;
		background-position: 0 -240px;
	}

	.panel-body {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.p-b-item {
		width: 140px;
		height: 200px;
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