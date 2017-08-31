<template>
	<div class="header-bar">
		<div class="first-menu">
			<router-link to="/" class="logo">
				<img src="../assets/logo.png" alt="">
            </router-link>
            <!-- 各项菜单 -->
			<div class="item-tab" :class="{'item-active': tab.isActive}" 
				v-for="(tab, key) in $store.getters.TabList">
				<router-link :to="{path: '/' + key}">
					{{tab.text}}
	            </router-link>
				<label class="cor" v-show="tab.isActive"></label>
			</div>
			<!-- 用户 -->
			<div class="user"
				@mouseover="showUserMenu"
				@mouseleave="hideUserMenu">
				<img :src="$store.getters.User.avatar" class="avatar" alt="头像">
				<div class="user-menu" v-show="userMenuShow">
					<i class="arr"></i>
					<div class="item item-line">
						<i class="icon home"></i><span class="item-text">我的主页</span>
					</div>
					<div class="item">
						<i class="icon lg-out"></i><span class="item-text">退出</span>
					</div>
				</div>
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
				userMenuShow: false
			}
		},
		computed: {

		},
		methods: {
			showUserMenu () {
				this.userMenuShow = true
			},
			hideUserMenu () {
				this.userMenuShow = false
			}
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
		position: relative;
		display: flex;
		height: 70px;
		color: #ccc;
		background: #242424;
		align-items: center;
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
	/*用户*/
	.user {
		position: absolute;
		right: 150px;
		width: 57px;
		height: 70px;
		background: url(http://s2.music.126.net/style/web2/img/frame/topbar.png?e38f078d06cf79fe084ea68017bad6a7) no-repeat 0 9999px;
		background-position: right -27px;
	}
	.user .avatar  {
		margin-top: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.user-menu {
		position: absolute;
	    top: 61px;
	    left: -59px;
	    right: -43px;
	    width: 158px;
	    background: #2b2b2b;
	    border: 1px solid #202020;
	    box-shadow: 0 8px 24px 0 rgba(0,0,0,0.50);
	    border-radius: 4px;
	    z-index: 5;
	}
	.user-menu .arr {
	    position: absolute;
	    top: -8px;
	    left: 50%;
	    width: 14px;
	    height: 8px;
	    margin-left: -7px;
		background: url(http://s2.music.126.net/style/web2/img/frame/toplist.png?46cc21ace3cfbb7dc43d6819338b4803) no-repeat 0 9999px;
		background-position: -20px 0;
	}
	.user-menu .item {
		position: relative;
		height: 34px;
		width: 100%;
		line-height: 34px;
    	font-size: 12px;
    	color: #ccc;
    	cursor: pointer;
	}
	.item-line:after {
		content: '';
		position: absolute;
		bottom: 0px;
		left: 0px;
		height: 1px;
		width: 100%;
		background-color: #000;
	}
	.user-menu .item:hover {
		color: #fafafa;
		background-color: rgb(35,35,35);
	}
	.user-menu .item-text {
		display: inline-block;
		height: 34px;
		font-size: 12px;
		line-height: 34px;
	}
	.user-menu .icon {
		display: inline-block;
		float: left;
		width: 18px;
    	height: 18px;
    	margin-top: 8px;
    	margin-left: 25px;
    	margin-right: 10px;
    	background: url(http://s2.music.126.net/style/web2/img/frame/toplist.png?46cc21ace3cfbb7dc43d6819338b4803) no-repeat;
	}
	.home {
		background-position: 0 -80px !important;
	}
	.lg-out {
		background-position: 0 -200px !important;
	}
</style>