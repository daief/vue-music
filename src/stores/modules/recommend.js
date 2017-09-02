const recommend = {
	state: {
		// 热门推荐
		hotList: [],
		// 个性推荐
		personalList: [],
		// 榜单，到时候得添加三个元素，构造结构
		bList: [
			{
				"id": 0,
				"img": "",
				"name": "",
				"songs": []
			},
			{
				"id": 0,
				"img": "",
				"name": "",
				"songs": []
			},
			{
				"id": 0,
				"img": "",
				"name": "",
				"songs": []
			}
		]
	},
	mutations: {
		setHotList(state, obj) {
			state.hotList = obj
		},
		setPersonalList(state, obj) {
			state.personalList = obj
		},
		setBList(state, obj) {
			state.bList = obj
		}
	},
	actions: {
		setHotList({commit}, obj) {
			commit('setHotList', obj)
		},
		setPersonalList({commit}, obj) {
			commit('setPersonalList', obj)
		},
		setBList({commit}, obj) {
			commit('setBList', obj)
		}		
	},
	getters: {
		HotList: state => state.hotList,
		PersonalList: state => state.personalList,
		BList: state => state.bList
	}
}

export default recommend