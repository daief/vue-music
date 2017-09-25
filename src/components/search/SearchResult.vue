<template>
	<div class="search-result">
		<div class="search-input">
			<input ref="search" type="text" @keyup.enter="search()" placeholder="di di di ~">
			<a href="javascript:;" @click="search()" title="搜索"></a>
		</div>
		<div class="sh-rs">
			<div class="brief">
				搜索“{{$route.query.keyWord}}”，找到
				<em style="color:#c20c0c;font-style:normal;">{{$store.getters.ResultCount}}</em>
				{{typeUnit[type] + typeTab[type]}}
			</div>
			<div class="sh-tit">
				<div v-for="(tab,t) in typeTab" class="tab" :class="{'tab-active': t == type}"
					@click="changeTab(t)">
					{{tab}}
				</div>
			</div>
			<!-- 搜索结果 -->
			<div class="sh-cnt">
				<SongResult v-show="type == 1"></SongResult>
			</div>
			<!-- 分页 -->
			<div class="sh-pages">
				<Page></Page>
			</div>
		</div>
	</div>
</template>

<script>
	import SongResult from './result/SongResult'

	import Page from '../common/Page'

	export default {
		name: 'SearchResult',
		components: {
			'SongResult': SongResult,
			'Page': Page
		},
		data () {
			return {
				typeTab: {
					1: '单曲',
					// 10: '专辑',
					// 100: '歌手',
					1000: '歌单',
					1002: '用户',
					// 1004: 'MV',
					1006: '歌词'
					// 1009: '电台'
				},
				typeUnit: {
					1: '首',
					// 10: '张',
					// 100: '个',
					1000: '个',
					1002: '个',
					// 1004: '首',
					1006: '个'
					// 1009: '电台'
				},
				type: this.$route.query.type
			}
		},
		computed: {

		},
		methods: {
			// 提交搜索实际上只是改变路由
			search() {
				let keyWord = this.$refs.search.value
				if (keyWord.trim()) {
					this.$router.push({ name: 'SearchResult', query: { keyWord: keyWord, type: this.type }})
				}
			},
			// 路由改变do some thing
			routeChange() {
				this.$refs.search.value = this.$route.query.keyWord
			},
			// 改变页卡
			changeTab(t) {
				this.$refs.search.value = this.$route.query.keyWord
				if (this.type != t && this.$route.query.keyWord) {
					// 不同时切换且改变路由
					this.type = t
					this.search()
				}
			}
		},
		mounted(){
			this.routeChange()
		},
		watch: {
			'$route': 'routeChange'
		}
	}
</script>

<style scoped>
	.search-result {
		width: 980px;
		margin: 0 auto;
		padding-top: 40px;
		border: 1px solid rgb(211,211,211);
	}
	.search-input {
		width: 420px;
		height: 40px;
		margin: 0 auto;
		background: url(http://s2.music.126.net/style/web2/img/sprite.png?cf1eca6b022fa691cd80b2a63a797ea5) no-repeat 0 9999px;
		background-position: 0 0;
		position: relative;
	}
	.search-input input {
		font-size: 12px;
		border: none;
		outline: none;
		width: 320px;
		height: 17px;
		position: absolute;
		left: 25px;
		top: 50%;
		margin-top: -8px;
	}
	.search-input a {
		width: 50px;
		height: 40px;
		cursor: pointer;
		position: absolute;
		right: 0;
		background: url(http://s2.music.126.net/style/web2/img/sprite.png?cf1eca6b022fa691cd80b2a63a797ea5) no-repeat 0 9999px;
	}
	.search-input:hover a:hover {
		background-position: -430px 0;
	}
	.sh-rs {
		width: 900px;
		margin: 15px auto;
	}
	/*搜索结果的页卡*/
	.brief {
		color: #999;
		font-size: 12px;
		margin-bottom: 15px;
		font-style: normal;
	}
	.sh-tit {
		display: flex;
		height: 40px;
		border-left: 1px solid rgb(204,204,204);
		border-right: 1px solid rgb(204,204,204);
	}
	.tab {
		/*width: 110px;*/
		flex: 1;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-top: 2px solid rgb(204,204,204);
		border-bottom: 1px solid rgb(204,204,204);
		background-color: rgb(248,248,248);
		cursor: pointer;
		transition: all .6s;
	}
	.tab:hover {
		border-top: 2px solid rgb(209,48,48);
	}
	.tab-active {
		border-top: 2px solid rgb(209,48,48);
		border-left: 1px solid rgb(204,204,204);
		border-right: 1px solid rgb(204,204,204);
		border-bottom: none;
		background-color: rgb(253,253,253);
	}
</style>