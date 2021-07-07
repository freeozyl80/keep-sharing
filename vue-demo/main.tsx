import Vue from 'vue';
// import VueCompositionAPI from '@vue/composition-api'
import MyComponent from './Page/Page.tsx';

// Vue.use(VueCompositionAPI)
console.log('Japhy')
new Vue({
  render: (h) => h(MyComponent),
}).$mount('#app');
