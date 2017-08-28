import Vue from 'vue'
import Router from 'vue-router'
import store from '../stores'
import Hello from '@/components/Hello'
import SecondMenu from '@/components/SecondMenu'

Vue.use(Router)

const router = new Router({
  routes: [
  	// 发现/默认推荐
    {
      path: '/discover',
      name: 'Discover',
      components: {
      	app: Hello,
      	secondMenu: SecondMenu
      }
    },
    // 发现/推荐
    {
	  path: '/discover/recommend',
	  name: 'Recommend',
	  components: {
	    app: Hello,
	    secondMenu: SecondMenu
	  }
    },
    // 发现/排行榜
    {
	  path: '/discover/toplist',
	  name: 'Toplist',
	  components: {
	    app: Hello,
	    secondMenu: SecondMenu
	  }
    },
    // 发现/歌单
    {
	  path: '/discover/playlist',
	  name: 'Playlist',
	  components: {
	    app: Hello,
	    secondMenu: SecondMenu
	  }
    },
    // 我的
    {
	  path: '/my',
	  name: 'My',
	  components: {
	    app: Hello
	  }
    },
    // 朋友
    {
	  path: '/friend',
	  name: 'Friend',
	  components: {
	    app: Hello
	  }
    },
    // 下载
    {
	  path: '/download',
	  name: 'Download',
	  components: {
	    app: Hello
	  }
    },
    // 首页/默认发现/推荐
    {
	  path: '/',
	  name: 'Home',
	  components: {
	    app: Hello,
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