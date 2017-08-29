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
					<transition name="fade">
						<img :src="imgsArray[imgIndex].url">
					</transition>
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
		margin-bottom: 50px;
	}
	.huge-screen {
		width: 100%;
		height: 336px;
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
</style>