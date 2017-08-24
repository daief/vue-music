const audio = {
	state: {
		// audio element
		player: null,
		// 播放状态
		isPlaying: false,
		// 当前播放时间
		currentTime: 0,
		// 总时长
		duration: 0		
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
		Duration: state => state.duration
	}
}

export default audio