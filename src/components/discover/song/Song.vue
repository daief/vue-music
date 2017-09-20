<template>
	<!-- 多分些组件吧 -->
	<div class="song">
		<div class="left-warp">
			<!-- 歌曲详情 -->
			<div class="song-intro">
				<SongInfo></SongInfo>
			</div>
			<!-- 评论区域 -->
			<div class="comment">
				
			</div>
		</div>
		<div class="right-warp">
			<!-- 右侧其他信息 -->
			<div class="other-info">
				
			</div>
		</div>
	</div>
</template>

<script>
	import SongInfo from './SongInfo.vue'
	export default {
		name: 'Song',
		data () {
			return {

			}
		},
		components: {
			'SongInfo': SongInfo
		},
		computed: {

		},
		methods: {
			getSong() {

			}
		},
		mounted () {
			
			
		},
		watch: {

		}
	}
</script>

<style scoped>
	.song {
		width: 979px;
		margin: auto;
		display: flex;
		border: 1px solid rgb(211,211,211);
	}
	.left-warp {
		position: relative;
		width: 709px;
	}
	.left-warp:after {
		content: '';
		position: absolute;
		top: 0px;
		right: 0px;
		width: 1px;
		height: 100%;
		background-color: rgb(211,211,211);
	}
	.right-warp {
		width: 270px;
	}
</style>