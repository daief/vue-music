import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Discover from './views/Discover/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/discover',
      name: 'discover',
      component: Discover,
      children: [
        {
          path: '/discover',
          name: 'discover/home',
          component: Home,
        },
        {
          path: '/discover/toplist',
          name: 'discover/toplist',
          component: Home,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
