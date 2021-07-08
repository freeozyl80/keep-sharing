import Vue from 'vue';
// import VueCompositionAPI from '@vue/composition-api'
import App from './App.tsx';

// Vue.use(VueCompositionAPI)
console.log('Japhy')

new Vue({
  render: (h) => h(App)
}).$mount('#app');

