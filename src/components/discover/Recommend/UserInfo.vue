<template>
	<div id="user-info">
		<div class="user">
			<div class="head">
				<img :src="$store.getters.User.avatar" class="avatar">
				<div style="margin-left: 17px;">
					<span class="nickname">{{$store.getters.User.nickname}}</span>
					<a :href="$store.getters.User.github"  target="_Blank">
						<span class="nickname" style="font-size:12px;margin-top:5px;">github>></span>
					</a>
				</div>
			</div>
		</div>
		<div class="other">
			<div class="clock">
				<a href="https://paulrhayes.com/an-analogue-clock-using-only-css/" target="_Blank" title="By Paul Hayes">
					<div id="clock">
				        <div id="hour" style="">
				        	<img src="../../../assets/images/hourHand.png" data-type="hour" :style="hourStyle"></div>
				        <div id="minute" style="">
				        	<img src="../../../assets/images/minuteHand.png" data-type="minute" :style="minuteStyle"></div>
				        <div id="second" >
				        	<img src="../../../assets/images/secondHand.png" data-type="second" :style="secondStyle"></div>
				    </div>
				</a>
			</div>
			<img class="logo" src="../../../assets/logo.png" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		data: function () {
			let date = new Date()
			return {
				second: date.getSeconds(),
				minute: date.getMinutes(),
				hour: date.getHours() % 12
			}
		},
		computed: {
			secondStyle () {
				let angle = this.second * 6 % 360
				return {
					transform: 'rotate(' + angle + 'deg)'
				}
			},
			minuteStyle () {
				let angle = this.minute * 6 % 360
				return {
					transform: 'rotate(' + angle + 'deg)'
				}
			},
			hourStyle () {
				let angle = (360/12) * this.hour + (360/(12*60)) * this.minute
				return {
					transform: 'rotate(' + angle + 'deg)'
				}
			}
		},
		methods: {

		},
		created () {
			
		},
		mounted () {
			setTimeout(() => {
				document.querySelector('#second img').style['transform'] = 'rotate(3600000deg)'
				document.querySelector('#minute img').style['transform'] = 'rotate(36000deg)'
				document.querySelector('#hour img').style['transform'] = 'rotate(360deg)'
			}, 100)
		}
	}
</script>

<style scoped>
	#user-info {
		position: relative;
		width: 100%;
	}
	a {
		text-decoration: none;
		color: #333;
	}
	a:hover {
		text-decoration: underline;
	}
	.user {
		border-bottom: 1px solid #aaa;
	}
	.head {
		position: relative;
		padding: 20px 20px 20px 25px;
		display: flex;
		background: linear-gradient(to right top, rgb(230,230,230) 10%, rgb(255,255,255) 75%);
	}
	.avatar {
		display: block;
		height: 80px;
		width: 80px;
		border: 1px #ddd solid;
		padding: 2px;
		cursor: pointer;
		transition: all .5s;
	}
	.avatar:hover {
		transform: scale(1.7, 1.7);
	}
	.nickname {
		display: block;
		font-size: 15px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    word-wrap: normal;
	}
	.other {
		margin-top: 30px;
		width: 100%;
		text-align: center;
	}
	.logo {
		width: 150px;
		height: 150px;
		transition: all 1s;
	}
	.logo:hover {
		transform: rotateY(720deg);
	}
	/*css时钟*/
	.clock {
		text-align: center;
	}
	#clock {
		position: relative;
		width: 200px;
		height: 200px;
		background-image: url('../../../assets/images/clockFace200x200.png');
		background-size: 100% 100%;
		/*left: 50%;*/
		margin: 1em auto;
	}
	#clock img {
		width: 200px;
		height: 200px; 
	}
	#clock div {
	    position: absolute;
	}

	#clock img[data-type='second'] {
		/*transform: rotate(3600000deg);*/
	    transition: transform 600000s linear;
	}

	#clock img[data-type='minute'] {
		/*transform: rotate(36000deg);*/
	    transition: transform 360000s linear;
	}

	#clock img[data-type='hour'] {
		/*transform: rotate(360deg);*/
	    transition: transform 216000s linear;
	}
</style>