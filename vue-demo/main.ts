import Vue from 'vue';
import 'vue-tsx-support'
import VueCompositionAPI from '@vue/composition-api'
import App from './Page/Page.tsx';

Vue.use(VueCompositionAPI)

new Vue({
  render: (h) => h(App),
}).$mount('#app');
