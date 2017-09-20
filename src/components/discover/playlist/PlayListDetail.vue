<template>
	<!-- 这个是歌单详情页面 -->
	<div class="list-detail">
		<div class="left-warp">
			<!-- 歌单详情 -->
			<div class="list-intro">
				<ListDetail></ListDetail>
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
	import ListDetail from './ListInfo'
	export default {
		name: 'PlayListDetail',
		components: {
			'ListDetail': ListDetail
		}
	}
</script>

<style scoped>
	.list-detail {
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