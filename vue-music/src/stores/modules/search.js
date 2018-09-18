const search = {
	state: {
		resultCount: 0,
		currentPage: 1,
		totalPage: 1
	},
	mutations: {
		setResultCount(state, n) {
			state.resultCount = n
		},
		setCurrentPage(state, n) {
			state.currentPage = n
		},
		setTotalPage(state, n) {
			state.totalPage = n
		}
	},
	actions: {
		setResultCount({commit}, n) {
			commit('setResultCount', n)
		},
		setCurrentPage({commit}, n) {
			commit('setCurrentPage', n)
		},
		setTotalPage({commit}, n) {
			commit('setTotalPage', n)
		}
	},
	getters: {
		ResultCount: state => state.resultCount,
		CurrentPage: state => state.currentPage,
		TotalPage: state => state.totalPage
	}
}

export default search