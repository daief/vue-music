<template>
	<div class="recommend">
		<div class="huge-screen" :style="hugeScreenStyle" @mouseover="wrapMouseOver" @mouseleave="wrapMouseLeave">
			<!-- 730 254 -->
			<div class="wrap">
				<!-- 上下页控制 -->
				<div class="page-ctrl pre" @click.stop.prevent="preWrapPage"></div>
				<div class="page-ctrl next" @click.stop.prevent="nextWrapPage"></div>
				<!-- 图片部分 -->
				<div class="wrap-content">
					<img :src="imgsArray[imgIndex].url">
					<!-- 底部原点 -->
					<div class="wrap-index">
						<span class="wrap-index-point" 
							:class="{'wrap-index-active': index == imgIndex}"
							v-for="(img, index) in imgsArray"
							@click.stop.prevent="clickWrapIndex(index)"></span>
					</div>
				</div>
				<!-- download部分 -->
				<div class="download"></div>
			</div>
		</div>
		<div class="content">
			<div class="content-left">
				<!-- 热门推荐 -->
				<div class="panel hot-panel">
					<div class="panel-title">
						<div class="p-t-text">热门推荐</div>
						<!-- 小字分类 -->
						<div class="p-t-small">
							<a href="#">华语</a>
							<span>|</span>
							<a href="#">摇滚</a>
						</div>
						<!-- 更多 -->
						<div class="p-t-more">
							<span>更多</span>
							<span class="icon"></span>
						</div>
					</div>
					<div class="panel-body">
						<div class="p-b-item"  v-for="(item,index) in $store.getters.HotList">
							<div  style="position:relative;">
								<img :src="item.img" alt="">
								<div class="button">
									<span class="icon-headset"></span>
									<span class="number">{{item.number}}</span>
									<a href="#" class="icon-play"></a>
								</div>
							</div>
							<a href="#" class="desc">{{item.desc}}</a>
						</div>
					</div>
				</div>
				<!-- 个性化推荐 -->
				<div class="panel">
					<div class="panel-title">
						<div class="p-t-text">个性化推荐</div>
					</div>
					<div class="panel-body">
						<div class="p-b-item">
							<div class="week">
								{{ week }}
							</div>
							<div class="day">
								{{ new Date().getDate() }}
							</div>
						</div>
						<div class="p-b-item"  v-for="(item,index) in $store.getters.PersonalList">
							<div  style="position:relative;">
								<img :src="item.img" alt="">
								<div class="button">
									<span class="icon-headset"></span>
									<span class="number">{{item.number}}</span>
									<a href="#" class="icon-play"></a>
								</div>
							</div>
							<a href="#" class="desc">{{item.desc}}</a>
						</div>
					</div>
				</div>
				<!-- 榜单 -->
				<div class="panel">
					<div class="panel-title">
						<div class="p-t-text">榜单</div>
						<!-- 更多 -->
						<div class="p-t-more">
							<span>更多</span>
							<span class="icon"></span>
						</div>
					</div>
					<div class="panel-body">
						<div class="blist">
							<div class="blist-column">
								<div class="blist-column-top even-bg">
									<img src="http://p4.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=100y100">
									<div class="blist-top-right">
										<span class="title">云音乐飙升榜</span>
										<span class="play"></span>
										<span class="collect"></span>
									</div>
								</div>
								<div class="blist-item odd-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item even-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item odd-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item even-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item odd-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item even-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item odd-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item even-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item odd-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item even-bg"><span class="s-name">Almost Home</span></div>
								<div class="blist-item blist-item-more odd-bg"><span>查看更多></span></div>
							</div>
							<div class="blist-column">
								
							</div>
							<div class="blist-column">
								
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="content-right">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Recommend',
		data () {
			return {
				// 轮播图片链接&主色调
				imgsArray: [
					{
						url: 'http://p1.music.126.net/ixddIer4fctxuZkjs0EpMA==/18607035278848184.jpg',
						mainColor: 'rgb(255, 240, 1)'
					},
					{
						url: 'http://p1.music.126.net/37iWrfqQvLBOzuMpukCnvQ==/19117208672462334.jpg',
						mainColor: '#FFF'
					},
					{
						url: 'http://p1.music.126.net/Svl_W0HP7YPsnkRRhuYfdg==/18616930883538652.jpg',
						mainColor: '#020123'
					},
					{
						url: 'http://p1.music.126.net/FAzLlV7hQAffgZRTvz6Zow==/19020451649211508.jpg',
						mainColor: 'rgb(22, 5, 15)'
					},
					{
						url: 'http://p1.music.126.net/Ju4JzOllkI-VtOQ1N6NTyA==/19196373509656967.jpg',
						mainColor: 'rgb(68, 169, 187)'
					}
				],
				imgIndex: 0,
				// 自动轮播
				autoRoll: true
			}
		},
		computed: {
			hugeScreenStyle () {
				return {
					'background-color': this.imgsArray[this.imgIndex].mainColor
				}
			},
			week() {
				let weekday=new Array(7)
				weekday[0]="星期日"
				weekday[1]="星期一"
				weekday[2]="星期二"
				weekday[3]="星期三"
				weekday[4]="星期四"
				weekday[5]="星期五"
				weekday[6]="星期六"
				return weekday[new Date().getDay()]
			}
		},
		methods: {
			clickWrapIndex (index) {
				this.imgIndex = index
			},
			wrapMouseOver () {
				this.autoRoll = false
			},
			wrapMouseLeave () {
				this.autoRoll = true
			},
			preWrapPage() {
				this.imgIndex = (this.imgIndex + this.imgsArray.length - 1) % this.imgsArray.length
			},
			nextWrapPage () {
				this.imgIndex = (this.imgIndex + 1) % this.imgsArray.length
			}
		},
		created () {
			let wrapRoll = setInterval(() => {
				if (this.autoRoll)	{
					this.nextWrapPage()
				}
			}, 2000)
		}
	}
</script>

<style scoped>
	.recommend {
		position: relative;
	}
	.huge-screen {
		width: 100%;
		height: 336px;
		transition: all 0.4s;
	}
	.wrap {
		width: 984px;
		height: 336px;
		margin: auto;
		display: flex;
		position: relative;
	}
	.page-ctrl {
		position: absolute;
		z-index: 2;
		width: 37px;
		height: 64px;
		top: 50%;
		margin-top: -32px;
		cursor: pointer;
		background-image: url(../../assets/images/banner.png);
	}
	.page-ctrl.pre {
		left: -68px;
	    background-position: 0 -360px;
	}
	.page-ctrl.pre:hover,
	.page-ctrl.next:hover {
		background-color: rgba(25, 25, 25, 0.2);
	}
	.page-ctrl.next {
		right: -68px;
		background-position: 0 -508px;
	}
	.wrap-content {
		position: relative;
		width: 730px;
		height: 336px;
	}
	.wrap-content img {
		transition: opacity 0.3s;
	}
	.wrap-index {
		position: relative;
		top: -35px;
		width: 730px;
		height: 10px;
		text-align: center;
	}
	.wrap-index-point {
		position: relative;
		line-height: 8px;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-left: 10px;
		margin-right: 10px;
		background-color: #ccc;
		cursor: pointer;
	}
	.wrap-index-point:hover {
		background-color: rgb(194,12,12);
	}
	.wrap-index-active {
		background-color: rgb(194,12,12);
	}
	.download {
		width: 254px;
		height: 336px;
	    background: url(../../assets/images/download.png) no-repeat 0 0;
	}
	/*歌单等内容*/
	.content {
		width: 984px;
		margin: auto;
		border: 1px solid #d3d3d3;
	}
	.content-left {
		float: left;
		width: 730px;
		position: relative;
		text-align: center;
		padding-bottom: 20px;
	}
	.content-left:after {
		content: '';
		width: 1px;
		height: 100%;
		position: absolute;
		background-color: #d3d3d3;
		top: 0px;
		right: -1px;
		z-index: 5;
	}
	.content-right {
		float: right;
		width: 254px;
	}
	.content:after {
		content: '';
		clear: both;
		display: block; 
	}
	/*一个版面*/
	.panel {
		position: relative;
		width: 95%;
		margin: auto;
		display: inline-block;
		margin-top: 10px;
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
		justify-content: space-between;
	}
	.p-b-item {
		width: 140px;
		height: 200px;
		text-align: left;
		margin-top: 15px;
		margin-bottom: 15px;
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
	.week {
		height: 33px;
		text-align: center;
		line-height: 33px;
	    color: #fed9d9;
	    font-size: 14px;
	    text-shadow: 0 -1px #962626;
	    background: url(http://s2.music.126.net/style/web2/img/date.png?cc834598921e07bf034d0aa9d10c8b4a) no-repeat 0 9999px;
	    background-position: 0 0;
	}
	.day {
		height: 107px;
		text-align: center;
		background: url(http://s2.music.126.net/style/web2/img/date.png?cc834598921e07bf034d0aa9d10c8b4a) no-repeat 0 9999px;
		background-position: 0 -150px;
		line-height: 102px;
	    font-size: 94px;
	    font-family: Arial, Helvetica, sans-serif;
	    font-weight: bold;
	    color: #202020;
	}
	/*榜单*/
	.blist {
		/*height: 200px;*/
		margin-top: 20px;
		position: relative;
		width: 100%;
		display: flex;
		border: 1px #ccc solid;
	}
	.blist-column {
		/*flex: 0 0 33.3333333%;*/
		width: 33.33333333%
	}
	.blist-column:nth-child(2) {
		border-left: 1px #ccc solid;
		border-right: 1px #ccc solid;
	}
	.blist-column-top {
		height: 120px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.blist-column-top img {
		margin-left: 20px;
		width: 80px;
		height: 80px;
	}
	.blist-top-right {
		margin-left: 20px;
		height: 80px;
		text-align: left;
	}
	.blist-top-right .title {
		font-size: 14px;
		font-weight: bold;
		color: #333;
    	font-family: Arial, Helvetica, sans-serif;
		display: block;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	}
	.blist-top-right .play,
	.blist-top-right .collect {
		width: 22px;
		height: 22px;
		display: inline-block;
		cursor: pointer;
		margin-top: 10px;
		margin-right: 10px;
		background: url(http://s2.music.126.net/style/web2/img/index/index.png?4708415b697a3fdf22bda20b0ce78d2f) no-repeat 0 9999px;
	}
	.blist-top-right .play {
		background-position: -267px -205px;
	}
	.blist-top-right .play:hover {
		background-position: -267px -235px;
	}
	.blist-top-right .collect {
		background-position: -300px -205px;
	}
	.blist-top-right .collect:hover {
		background-position: -300px -235px;
	}
	.odd-bg {
		background-color: rgb(232,232,232);
	}
	.even-bg {
		background-color: rgb(244,244,244);
	}
	.blist-item {
		height: 32px;
		font-size: 12px;
		line-height: 32px;
	    text-align: left;
	    padding-left: 20px;
	}
	.blist-item-more {
		padding-right: 20px;
		text-align: right;
	}
	.blist-item .s-name {
		display: inline-block;
		height: 32px;
		max-width: 100%;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
		font-size: 12px;
		line-height: 32px;
		cursor: pointer;
	}
	.s-name:hover {
		text-decoration: underline;
	}
</style>