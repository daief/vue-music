const head = {
	state: {
		// 一级菜单项
		tabList: {
			'discover': {
				text: '发现音乐',
				isActive: true
			},
			'my': {
				text: '我的音乐',
				isActive: false
			},
			'friend': {
				text: '朋友',
				isActive: false
			},
			'download': {
				text: '下载客户端',
				isActive: false
			}
		}
	},
	mutations: {
		// 将key对应的设为true
		setTabList(state, key) {
			let hasTrue = false
			for (let k in state.tabList) {
				if (k == key) {
					hasTrue = true
					state.tabList[k].isActive = true
				} else {
					state.tabList[k].isActive = false
				}
			}
			if (!hasTrue)	state.tabList.discover.isActive = true
		}
	},
	actions: {
		setTabList({commit}, key) {
			commit('setTabList', key)
		}
	},
	getters: {
		TabList: state => state.tabList
	}
}

export default head 