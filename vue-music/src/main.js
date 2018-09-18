// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 引入vuex创建的store实例，路径 './stores' 为 './stores/index.js'的简写
import store from './stores'

Vue.config.productionTip = false

// 全局变量模块挂载到Vue.prototype 里
// 用this就可以引用
Vue.prototype.$axios = axios
Vue.prototype.MUrl = 'http://127.0.0.1:3000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
