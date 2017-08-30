const app = {
	state: {
		// 所有歌曲信息
		allSongs: [
			{
	            "id": 0,
	            "url": "",
	            "name": "",
	            "singers": [],
	            "img": "",
	            "lyric": ""
	        }
		],
		// 根据id搜索的结果
		songById: {
			"id": 0,
            "url": "",
            "name": "",
            "singers": [],
            "img": "",
            "lyric": ""
		}
	},
	mutations: {
		setAllSongs(state, obj) {
			state.allSongs = obj
		},
		gainSongById(state, id) {
			for(let i = 0; i < state.allSongs.length; i++) {
				if (id == state.allSongs[i].id) {
					state.songById = state.allSongs[i]
					break
				}
			}
		}
	},
	actions: {
		setAllSongs({commit}, obj) {
			commit('setAllSongs', obj)
		},
		// 根据id搜索
		gainSongById({commit}, id) {
			commit('gainSongById', id)
		}
	},
	getters: {
		AllSongs: state => state.allSongs,
		// 获得结果
		SongById: state => state.songById
	}
}

export default app