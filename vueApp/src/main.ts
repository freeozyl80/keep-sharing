import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue';
import IocPlugin from './plugin/index'
import { Container  } from "./loc/container"

Vue.use(IocPlugin, new Container())

Vue.use(VueCompositionAPI)

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('./page/home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./app/about/index.vue')
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})


new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');

