// 引入依赖
import Vue from 'vue'
import Vuex from 'vuex'

import Audio from './modules/audio'
import Head from './modules/head'
import Recommend from './modules/recommend'

// 使用vuex
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
  	audio: Audio,
    head: Head,
    reaommend: Recommend
  }
})

export default store