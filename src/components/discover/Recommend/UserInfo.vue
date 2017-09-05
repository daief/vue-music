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
			<img class="logo" src="../../../assets/logo.png" alt="">
			<div class="animation" @click.stop.prevent="startClock">
				<div id="clock">
			        <div id="hour" ref="hour" style="">
			        	<img src="../../../assets/images/hourHand.png" data-type="hour"></div>
			        <div id="minute" ref="minute" style="">
			        	<img src="../../../assets/images/minuteHand.png" data-type="minute"></div>
			        <div id="second" ref="second" style="">
			        	<img src="../../../assets/images/secondHand.png" data-type="second" :style="secondStyle"></div>
			    </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UserInfo',
		data: function () {
			return {
				time: new Date()
			}
		},
		computed: {
			secondStyle () {
				return {
					'transform': 'rotate(' + this.time.getSeconds() * 6 + ' deg)'
				}
			}
		},
		methods: {
			startClock () {
				console.log('startClock')
				var angle = 360/60;
				var date = new Date()
				var hour = date.getHours();
				if(hour > 12) {
					hour = hour - 12;
				}
				var minute = date.getMinutes();
				var second = date.getSeconds();
				var hourAngle = (360/12)*hour + (360/(12*60))*minute + 270;

				document.querySelector('#second img').style['transform'] = 'rotate('+angle*second+'deg)'
				document.querySelector('#minute img').style['transform'] = 'rotate('+angle*minute+'deg)'
				document.querySelector('#hour img').style['transform'] = 'rotate('+hourAngle+'deg)'
			}
		},
		created () {
			// this.startClock()
		},
		mounted () {
			// setTimeout(this.startClock(), 2000)
			// this.startClock()
			document.querySelector('#second img').style['transform'] = 'rotate(-3600000deg)'
			document.querySelector('#minute img').style['transform'] = 'rotate(-36000deg)'
			document.querySelector('#hour img').style['transform'] = 'rotate(-360deg)'
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
	#clock {
		position: relative;
		width: 378px;
		height: 378px;
		background-image: url('../../../assets/images/clockFace.png');
		left: 50%;
		margin: 5em 0 0 -189px;
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