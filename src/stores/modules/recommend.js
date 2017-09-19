const recommend = {
	state: {
		IDX: {
			'0': ['云音乐新歌榜', '/api/playlist/detail?id=3779629'],
			'1': ['云音乐热歌榜', '/api/playlist/detail?id=3778678'],
			'2': ['网易原创歌曲榜', '/api/playlist/detail?id=2884035'],
			'3': ['云音乐飙升榜', '/api/playlist/detail?id=19723756'],
			'4': ['云音乐电音榜', '/api/playlist/detail?id=10520166'],
			'5': ['UK排行榜周榜', '/api/playlist/detail?id=180106'],
			'6': ['美国Billboard周榜', '/api/playlist/detail?id=60198'],
			'7': ['KTV嗨榜', '/api/playlist/detail?id=21845217'],
			'8': ['iTunes榜', '/api/playlist/detail?id=11641012'],
			'9': ['Hit FM Top榜', '/api/playlist/detail?id=120001'],
			'10': ['日本Oricon周榜', '/api/playlist/detail?id=60131'],
			'11': ['韩国Melon排行榜周榜', '/api/playlist/detail?id=3733003'],
			'12': ['韩国Mnet排行榜周榜', '/api/playlist/detail?id=60255'],
			'13': ['韩国Melon原声周榜', '/api/playlist/detail?id=46772709'],
			'14': ['中国TOP排行榜(港台榜)', '/api/playlist/detail?id=112504'],
			'15': ['中国TOP排行榜(内地榜)', '/api/playlist/detail?id=64016'],
			'16': ['香港电台中文歌曲龙虎榜', '/api/playlist/detail?id=10169002'],
			'17': ['华语金曲榜', '/api/playlist/detail?id=4395559'],
			'18': ['中国嘻哈榜', '/api/playlist/detail?id=1899724'],
			'19': ['法国 NRJ EuroHot 30周榜', '/api/playlist/detail?id=27135204'],
			'20': ['台湾Hito排行榜', '/api/playlist/detail?id=112463'],
			'21': ['Beatport全球电子舞曲榜', '/api/playlist/detail?id=3812895']
		},
		// 热门推荐，结构
		hotList: [
			{
	            "id": 0,
	            "type": 0,
	            "name": "",
	            "copywriter": "",
	            "picUrl": "",
	            "canDislike": false,
	            "playCount": 0,
	            "trackCount": 0,
	            "highQuality": false,
	            "alg": ""
	        }
		],
		// 个性推荐(网友精选碟)
		personalList: [
			{
	            "name": "",
	            "id": 0,
	            "coverImgUrl": "",
	            "description": "",
	            "playCount": 0
	        }
		],
		// 榜单，到时候得添加三个元素，构造结构
		bList: [
			{
				"id": 0,
				"name": "",
				"img": "",
				"playCount": 0,
				"description": "",
				"tracks": [
					{
			            "id": 0,
			            "name": "",
			            "singers": [],
			            "album": "",
			            "img": "",
			            "duration": 0	            
		        	}
				]
			},
			{"id":0,"name":"","img":"","playCount":0,"description":"","tracks":[{"id":0,"name":"","singers":[],"album":"","img":"","duration":0}]},
			{"id":0,"name":"","img":"","playCount":0,"description":"","tracks":[{"id":0,"name":"","singers":[],"album":"","img":"","duration":0}]}
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