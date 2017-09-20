import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'

import Hello from '@/components/Hello'
import SecondMenu from '@/components/SecondMenu'
import Recommend from '@/components/discover/Recommend'
import Toplist from '@/components/discover/Toplist'
import Playlist from '@/components/discover/Playlist'
import My from '@/components/my/My'
import Friend from '@/components/friend/Friend'
import Download from '@/components/download/Download'
import Song from '@/components/discover/song/Song'
import PlayListDetail from '@/components/discover/playlist/PlayListDetail'

Vue.use(Router)

const router = new Router({
  base: '/vue-music/',
  routes: [
  	// 发现/默认推荐
    {
      path: '/discover',
      name: 'Discover',
      components: {
      	app: Recommend,
      	secondMenu: SecondMenu
      }
    },
    // 发现/推荐
    {
	  path: '/discover/recommend',
	  name: 'Recommend',
	  components: {
	    app: Recommend,
	    secondMenu: SecondMenu
	  }
    },
    // 发现/排行榜
    {
	  path: '/discover/toplist',
	  name: 'Toplist',
	  components: {
	    app: Toplist,
	    secondMenu: SecondMenu
	  }
    },
    // 发现/歌单
    {
	  path: '/discover/playlist',
	  name: 'Playlist',
	  components: {
	    app: Playlist,
	    secondMenu: SecondMenu
	  }
    },
    // 我的
    {
	  path: '/my',
	  name: 'My',
	  components: {
	    app: My
	  }
    },
    // 朋友
    {
	  path: '/friend',
	  name: 'Friend',
	  components: {
	    app: Friend
	  }
    },
    // 下载
    {
	  path: '/download',
	  name: 'Download',
	  components: {
	    app: Download
	  }
    },
    // 歌曲详情
    {
	  path: '/song/:songId',
	  name: 'Song',
	  components: {
	    app: Song,
	    secondMenu: SecondMenu
	  }
    },
    // 歌单详情
    {
	  path: '/discover/playlist/:listId',
	  name: 'PlayListDetail',
	  components: {
	    app: PlayListDetail,
	    secondMenu: SecondMenu
	  }
    },
    // 歌单详情别名
    { 
      path: '/playlist/:listId', 
      components: {
	    app: PlayListDetail,
	    secondMenu: SecondMenu
	  },
      alias: '/discover/playlist/:listId' 
  	},
    // 首页/默认发现/推荐
    {
	  path: '/',
	  name: 'Home',
	  components: {
	    app: Recommend,
	    secondMenu: SecondMenu
	  }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  // console.log(to.path.substr(1, to.path.length - 1))
  // console.log(store.getters.TabList)
  store.dispatch('setTabList', to.path.substr(1, to.path.length - 1))
  next()
})
export default router