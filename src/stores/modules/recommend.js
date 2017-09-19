const recommend = {
	state: {
		IDX: {
			"0": "云音乐新歌榜",   
			"1": "云音乐热歌榜",  
			"2": "网易原创歌曲榜",  
			"3": "云音乐飙升榜",  
			"4": "云音乐电音榜",  
			"5": "UK排行榜周榜",  
			"6": "美国Billboard周榜",
			"7": "KTV嗨榜",  
			"8": "iTunes榜",  
			"9": "Hit FM Top榜",  
			"10": "日本Oricon周榜",
			"11": "韩国Melon排行榜周榜",  
			"12": "韩国Mnet排行榜周榜",  
			"13": "韩国Melon原声周榜",  
			"14": "中国TOP排行榜(港台榜)",  
			"15": "中国TOP排行榜(内地榜)",  
			"16": "香港电台中文歌曲龙虎榜",  
			"17": "华语金曲榜",  
			"18": "中国嘻哈榜",  
			"19": "法国 NRJ EuroHot 30周榜",  
			"20": "台湾Hito排行榜",  
			"21": "Beatport全球电子舞曲榜"
		},
		// 热门推荐
		hotList: [],
		// 个性推荐
		personalList: [],
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
		],
		// 云音乐新歌榜
		topListIdx0: {
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
		// 云音乐飙升榜
		topListIdx3: {
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
		}
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
		},
		setTopListIdx0(state, obj){
			state.topListIdx0 = obj
		},
		setTopListIdx3(state, obj){
			state.topListIdx3 = obj
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
		},
		setTopListIdx0({commit}, obj){
			commit('setTopListIdx0', obj)
		},
		setTopListIdx3({commit}, obj){
			commit('setTopListIdx3', obj)
		}		
	},
	getters: {
		HotList: state => state.hotList,
		PersonalList: state => state.personalList,
		BList: state => state.bList,
		TopListInx3: state => state.topListIdx3,
		TopListInx0: state => state.topListIdx0
	}
}

export default recommend