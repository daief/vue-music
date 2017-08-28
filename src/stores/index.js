// 引入依赖
import Vue from 'vue'
import Vuex from 'vuex'

import Audio from './modules/audio'
import Head from './modules/head'

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
    head: Head
  }
})

export default store