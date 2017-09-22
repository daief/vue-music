const search = {
	state: {
		resultCount: 0,
		result: {
			// 单曲
			1: {
				songCount: 0,
				songs: [
					{
						id: 0,
						name: '',
						ar: [
							{
								name: ''
							}
						],
						al: {
							name: '',
							picUrl: ''
						},
						dt: 0
					}
				]
			},
			// 歌单
			1000: {

			}
		}
	},
	mutations: {
		setResultCount(state, n) {
			state.resultCount = n
		}
	},
	actions: {
		setResultCount({commit}, n) {
			commit('setResultCount', n)
		}
	},
	getters: {
		ResultCount: state => state.resultCount
	}
}

export default search