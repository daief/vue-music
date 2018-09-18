<template>
	<div class="second">
		<ul>
			<li v-for="(tab,key) in secondTabList">
				<router-link :to="{ path: '/discover/' + key}" 
					:class="{'router-link-active':extraActiveStyle && key == 'recommend'}">
					{{tab}}
	            </router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'SecondMenu',
		data () {
			return {
				secondTabList: {
					'recommend': '推荐',
					'toplist': '排行榜',
					'playlist': '歌单'
					// ,
					// 'djradio': '主播电台',
					// 'artist': '歌手',
					// 'album': '新碟上架'
				}
			}
		},
		computed: {
			extraActiveStyle() {
				return this.$route.path == '/' || this.$route.path == '/discover'
			}
		}
	}
</script>

<style scoped>
	.second {
		height: 25px;
		width: 100%;
		font-size: 12px;
		line-height: 25px;
	}
	ul {
		height: 25px;
		margin-left: 16%;
		position: relative;
	}
	ul:after {
		content: '';
		clear: both;
		position: absolute;
	}
	ul li {
		list-style: none;
		text-decoration: none;
		float: left;
		margin-right: 3em;
		line-height: 25px;
		display: inline-block;
	}
	ul li a:active,
	ul li a {
		text-decoration: none;
		color: #fff;
		font-size: 12px;
		/*display: inline-block;*/
		padding: 3px 15px 3px 15px;
	}
	ul li a:hover {
		border-radius: 11px;
		background-color: rgb(155,9,9);
	}
	.router-link-active {
		border-radius: 11px;
		background-color: rgb(155,9,9);
	}
</style>