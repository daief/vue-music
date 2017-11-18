<template>
	<!-- 搜索结果分页组件 -->
	<div class="page" v-show="TotalPage > 1">
		<a href="javascript:;" class="turn pre" :class="{'pre-disabled': CurrentPage == 1}"
			@click="prePage()">上一页</a>
		<a href="javascript:;" class="num" :class="{'num-active': 1 == CurrentPage}" @click="changePage(1)">1</a>
		<em class="zdot" v-show="showPages[0] == 0">...</em>
		<a href="javascript:;" class="num" :class="{'num-active': p == CurrentPage}"
			v-for="(p,i) in showPages" v-if="p != 0" @click="changePage(p)">
			{{p}}</a>
		<em class="zdot" v-show="showPages[showPages.length - 1] == 0">...</em>
		<a href="javascript:;" class="num" @click="changePage(TotalPage)"
			:class="{'num-active': TotalPage == CurrentPage}">{{TotalPage}}</a>
		<a href="javascript:;" class="turn next" :class="{'next-disabled': CurrentPage == TotalPage}" 
			@click="nextPage()">下一页</a>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name: 'Page',
		data() {
			return {

			}
		},
		computed: {
			// 显示的页数(不包括首页和尾页)，只存储中间页数，返回数组0代表省略号，其他代表页码
			showPages() {
				let rs = []
				if (this.TotalPage <= 9) {
					for (let i = 1; i < this.TotalPage; i++) {
						rs.push(i)
					}
				} else {
					// 大于9页，形如 ... 5 6 7 8(当前页) 9 10 11 ... 
					if (this.CurrentPage <= 5) {
						// 一个右省略号
						for (let i = 2; i <= 8; i++) {
							rs.push(i)
						}
						rs.push(0)
					} else if(this.CurrentPage >= this.TotalPage - 4) {
						// 一个左省略号
						rs.push(0)
						for (let i = this.TotalPage - 7; i < this.TotalPage; i++) {
							rs.push(i)
						}
					} else {
						// 两个省略号
						rs.push(0)
						for (let i = this.CurrentPage - 3; i <= this.CurrentPage + 3; i++) {
							rs.push(i)
						}
						rs.push(0)
					}
				}
				return rs
			},
			...mapGetters([
				'ResultCount',
				'CurrentPage',
				'TotalPage'
	        ])
		},
		methods: {
			// 跳页
			changePage(p) {
				if (p != this.CurrentPage) {
					this.$store.dispatch('setCurrentPage', p)
				}
			},
			prePage(){
				if (this.CurrentPage > 1) {
					this.$store.dispatch('setCurrentPage', this.CurrentPage - 1)
				}
			},
			nextPage(){
				if (this.CurrentPage < this.TotalPage) {
					this.$store.dispatch('setCurrentPage', this.CurrentPage + 1)
				}
			}
		},
		watch: {
			// 搜索总数变了，总页数变化
			ResultCount (n) {
				this.$store.dispatch('setTotalPage', Math.ceil(n / 30))
				this.$store.dispatch('setCurrentPage', 1)
			},
			// 页数变化了
			CurrentPage () {
				window.scrollTo(0, 0)
			}
		}
	}
</script>

<style scoped>
	.page {
		width: 100%;
		text-align: center;
		margin: 20px auto;
	}
	.page a {
		display: inline-block;
		font-size: 12px;
		text-decoration: none;
		color: #333;
		border-radius: 2px;
		margin-left: 1px;
		margin-right: 1px;
	}
	.turn {
	    border: 1px solid #ccc;
		height: 26px;
		width: 71px;
    	line-height: 24px;
    	vertical-align: middle;
    	background: url(http://s2.music.126.net/style/web2/img/button.png?cbd98e827e462621c3442738ee558223) no-repeat 0 9999px;
	}
	.pre {
		padding-left: 22px;
		background-position: 0 -560px;
	}
	.pre:hover {
	    background-position: 0 -590px;
	}
	.pre-disabled {
	    background-position: 0 -620px;
	    color: #cacaca !important;
	    cursor: default;
	}
	.pre-disabled:hover {
		background-position: 0 -620px;
	}
	.next {
		padding-right: 22px;
		background-position: -75px -560px;
	}
	.next:hover {
	    background-position: -75px -590px;
	}
	.next-disabled {
        background-position: -75px -620px;
	    color: #cacaca !important;
	    cursor: default;
	}
	.next-disabled:hover {
		background-position: -75px -620px;
	}
	.num {
	    height: 24px;
	    padding: 0 8px;
	    background-color: #fff;
	    line-height: 22px;
	    border: 1px solid #ccc;
	    transition: all .3s;
	}
	.num:hover:not(.num-active) {
		border-color: #333;
	}
	.num-active {
	    background: url(http://s2.music.126.net/style/web2/img/button.png?cbd98e827e462621c3442738ee558223) no-repeat 0 9999px;
		background-position: 0 -650px;
	    border-color: #A2161B;
	    color: #fff !important;
	    cursor: default;
	}
	.zdot {
		font-size: 12px;
		font-style: normal;
	}
</style>