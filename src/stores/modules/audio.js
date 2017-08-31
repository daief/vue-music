const audio = {
	state: {
		// audio element
		player: null,
		// 播放状态
		isPlaying: false,
		// canplay
		canplay: false,
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
            "album": "",
            "img": "",
            "lyric": ""
        },
        // playList
        playList: [],
		// 音量是否show
		isShowVolume: false,
		// 列表是否show
		isShowList: false,
		// 提示是否展示
		isShowTip: false,
		// 提示文字
		tipText: '',
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
		// 设置canplay
		setCanplay(state, obj) {
			state.canplay = obj
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
				// 可以播放才能播放
				if (state.canplay) {
					state.isPlaying = true
					state.player.play()
				}
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
		},
		// 设置isShowList
		setIsShowList(state, obj) {
			state.isShowList = obj
		},
		// 显示提示
		showTip(state, obj) {
			state.isShowTip = true
			state.tipText = obj
		},
		// 隐藏提示
		hideTip(state) {
			state.isShowTip = false
			state.tipText = ''
		},
		// playList中添加歌曲
		addSongToPlayList(state, obj) {
			let isExist = false
			for (let i = 0; i < state.playList.length; i++) {
				if (obj.id == state.playList[i].id) {
					isExist = true
					break
				}
			}
			if (!isExist)	state.playList.push(obj)
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
		// 设置canplay
		setCanplay({commit}, obj) {
			commit('setCanplay', obj)
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
		},
		// 设置isShowList
		setIsShowList({commit}, obj) {
			commit('setIsShowList', obj)
		},
		// 显示tip
		showTip({commit}, obj) {
			commit('showTip', obj)
		},
		// 隐藏提示
		hideTip({commit}) {
			commit('hideTip')
		},
		// playList中添加歌曲
		addSongToPlayList({commit}, obj) {
			commit('addSongToPlayList', obj)
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
		PlayIndex: state => state.playIndex,
		// 获取isShowList
		IsShowList: state => state.isShowList,
		// 获取canplay
		Canplay: state => state.canplay,
		// 获取isShowTip
		IsShowTip: state => state.isShowTip,
		// 获取tipText
		TipText: state => state.tipText
	}
}

export default audio