const audio = {
	state: {
		// audio element
		player: null,
		// 播放状态
		isPlaying: false,
		// 当前播放时间
		currentTime: 0,
		// 总时长
		duration: 0,
		// 当前播放的music
		music: {
			id: 0,
			url: 'http://m10.music.126.net/20170823120139/3ede01f563ea50026c31d8c441204e33/ymusic/b29c/bfdf/9abc/dca6e502ea5f603c563dc35f474fdeae.mp3',
			name: '僕らの手には何もないけど、',
			singer: 'RAM WIRE',
			img: 'http://p1.music.126.net/62e9h4tIcDEPzWyE7Z0w3w==/7818627186002039.jpg?param=130y130'
		}
	},
	// 改变状态
	mutations: {
		// 获取音乐元素 Dom
		setPlayer (state, ele) {
			state.player = ele
		},
		// 设置播放状态
		setIsPlaying (state, obj) {
			state.isPlaying = obj
		},
		// 设置currenttime
		setCurrentTime(state, obj) {
			state.currentTime = obj
		},
		// 设置duration
		setDuration(state, obj) {
			state.duration = obj
		},
		// 播放
		play (state) {
			state.isPlaying = true
			state.player.play()	
		},
		// 暂停
		pause(state) {
			state.isPlaying = false
			state.player.pause()
		},
		// 转换播放状态
		togglePlay(state) {
			if (state.isPlaying) {
				state.isPlaying = false
				state.player.pause()
			} else {
				state.isPlaying = true
				state.player.play()	
			}
		},
		// 设置music
		setMusic(state, obj) {
			state.music = obj
		}
	},
	// 提交mutations
	actions: {
		// 获取音乐元素 Dom
		setPlayer ({commit}, ele) {
			commit('setPlayer', ele)
		},
		// 设置播放状态
		setIsPlaying ({commit}, obj) {
			commit('setIsPlaying', obj)
		},
		// 设置currenttime
		setCurrentTime({commit}, obj) {
			commit('setCurrentTime', obj)
		},
		// 设置duration
		setDuration({commit}, obj) {
			commit('setDuration', obj)
		},
		// 播放
		play ({commit}) {
			commit('play')
		},
		// 暂停
		pause({commit}) {
			commit('pause')
		},
		// 转换播放状态
		togglePlay({commit}) {
			commit('togglePlay')
		},
		// 设置music
		setMusic({commit}, obj) {
			commit('setMusic')
		}
	},
	getters: {
		// 获取audio元素
		Player: state => state.player,
		// 获取播放状态
		IsPlaying: state => state.isPlaying,
		// 获取currentTime
		CurrentTime: state => state.currentTime,
		// 获取duration
		Duration: state => state.duration,
		// 获取music
		Music: state => state.music
	}
}

export default audio