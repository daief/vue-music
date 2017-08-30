const recommend = {
	state: {
		hotList: [],
		personalList: []
	},
	mutations: {
		setHotList(state, obj) {
			state.hotList = obj
		},
		setPersonalList(state, obj) {
			state.personalList = obj
		}
	},
	actions: {
		setHotList({commit}, obj) {
			commit('setHotList', obj)
		},
		setPersonalList({commit}, obj) {
			commit('setPersonalList', obj)
		}		
	},
	getters: {
		HotList: state => state.hotList,
		PersonalList: state => state.personalList
	}
}

export default recommend