// local storage的版本
const VERSION = 'v0.01'

const app = {
	state: {
		local_data: {
			'volume': 0.75,
			'loopType': 1,
			'playIndex': 0,
			// [1,2,3]
			'playList': [],
			'version': VERSION
		}
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
		Local_data: state => state.local_data
	}
}

export default app