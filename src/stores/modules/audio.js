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
            "id": 0,
            "url": "",
            "name": "",
            "singers": [],
            "img": ""
        },
        // playList
        playList: [],
		// 音量是否show
		isShowVolume: false,
		// 列表索引
		playIndex: 0
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
		},
		// 设置音量是否show
		setIsShowVolume(state, obj) {
			state.isShowVolume = obj
		},
		// 设置playList
		setPlayList(state, obj) {
			state.playList = obj
		},
		// 设置索引
		setPlayIndex(state, obj) {
			state.playIndex = obj
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
			commit('setMusic', obj)
		},
		// 设置音量是否show
		setIsShowVolume({commit}, obj) {
			commit('setIsShowVolume', obj)
		},
		// 设置playList
		setPlayList({commit}, obj) {
			commit('setPlayList', obj)
		},
		// 设置索引
		setPlayIndex({commit}, obj) {
			commit('setPlayIndex', obj)
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
		Music: state => state.music,
		// 获取isShowVolume
		IsShowVolume: state => state.isShowVolume,
		// 获取playList
		PlayList: state => state.playList,
		// 获取索引
		PlayIndex: state => state.playIndex
	}
}

export default audio