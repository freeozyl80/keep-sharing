import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue';
import IocPlugin from './plugin/index'
import { Container  } from "./loc/container"

Vue.use(IocPlugin, new Container())

Vue.use(VueCompositionAPI)

new Vue({
  render: (h) => h(App)
}).$mount('#app');

