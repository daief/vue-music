import Vue from 'vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './styles/global.less';
import * as $u from './utils';

Vue.component('RecycleScroller', RecycleScroller);

Vue.config.productionTip = false;
Vue.prototype.$u = $u;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
