<template>
	<div class="header-bar">
		<div class="first-menu">
			<router-link to="/" class="logo">
				<img src="../assets/logo.png" alt="">
            </router-link>
			<div class="item-tab" :class="{'item-active': tab.isActive}" 
				v-for="(tab, key) in $store.getters.TabList">
				<router-link :to="{path: '/' + key}">
					{{tab.text}}
	            </router-link>
				<label class="cor" v-show="tab.isActive"></label>
			</div>
		</div>
		<div class="second-menu">
			<router-view name="secondMenu"></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HeaderBar',
		data () {
			return {

			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	.header-bar {
		position: relative;
		top: 0px;
		width: 100%;
	}
	.first-menu {
		display: flex;
		height: 70px;
		color: #ccc;
		background: #242424;
	}
	
	.logo {
		display: block;
		margin-left: 8%;
		margin-right: 20px;
		height: 70px;
		/*width: 180px;*/
	}
	.logo img {
		height: 70px;
	}
	.item-active {
		background: #000;
	}
	.item-tab:hover {
		background-color: #000;
	}
	.item-tab {
		height: 70px;
		font-size: 14px;
		line-height: 70px;
		padding-left: 20px;
		padding-right: 20px;
		position: relative;
		cursor: pointer;
	}
	.item-tab a {
		display: block;
		text-decoration: none;
		color: #ccc;
	}
	.item-tab a:active {
		color: #ccc;
	}
	.cor {
		width: 0;
	    height: 0;
	    border-left: 5px solid transparent;
	    border-right: 5px solid transparent;
	    border-bottom: 8px solid #C20C0C;
	    position: absolute;
	    left: 50%;
	    margin-left: -5px;
	    bottom: -1px;
	}
	.second-menu {
		display: flex;
		padding-top: 2px;
		padding-bottom: 2px;
		background-color: #C20C0C;
	}
</style>