<template>
	<!-- 这个歌单是歌单页面，子目录下的是歌单详情页面 -->
	<div>
		歌单
		<br />
		{{this.$store.getters.TipMessage}}
	</div>
</template>

<script>
	export default {
		name: 'Playlist'
	}
</script>

<style scoped>
		
</style>