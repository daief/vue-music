import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './styles/global.less';
import * as $u from './utils';

Vue.config.productionTip = false;
Vue.prototype.$u = $u;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
