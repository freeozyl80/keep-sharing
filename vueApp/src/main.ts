import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue';
// import IocPlugin from './plugin/index.ts'
// import { Container  } from "./loc/container.ts"

// Vue.use(IocPlugin, new Container())

import 'reflect-metadata';


@Reflect.metadata('role', 'admin1')
class Post {
    @Reflect.metadata('role', 'admin2')
    name = ''
}

const metadataClass = Reflect.getMetadata('role', Post);
const metadataObj = Reflect.getMetadata('role', new Post(), 'name');
console.log(Reflect.getMetadata('design:type', new Post(), 'name'))
console.log(Reflect.getMetadata("design:paramtypes", new Post(), 'name'))
console.log(metadataClass);// admin
console.log(metadataObj); // admin


Vue.use(VueCompositionAPI)

new Vue({
  render: (h) => h(App)
}).$mount('#app');

