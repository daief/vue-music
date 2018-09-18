// local storage的版本
const VERSION = 'v0.01'
const tip_message = '这部分还没完成，可以来试个右上的搜索。'

const app = {
	state: {
		local_data: {
			'volume': 0.75,
			'loopType': 1,
			'playIndex': 0,
			// [1,2,3]
			'playList': [],
			'version': VERSION
		},
		// 提示语
		tipMessage: tip_message
	},
	mutations: {
		setLocal_data(state, obj) {
			if (obj && obj.version == VERSION) {
				state.local_data = obj
			}
		}
	},
	actions: {
		setLocal_data({commit}, obj) {
			commit('setLocal_data', obj)
		}		
	},
	getters: {
		Local_data: state => state.local_data,
		TipMessage: state => state.tipMessage
	}
}

export default app