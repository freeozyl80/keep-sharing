// plugin.ts
import { VueConstructor } from "vue";
import { Container } from "../loc/container";
import { Type } from "../loc/interface";

export default {
  install(Vue: VueConstructor, rootContainer: Container) {
    Vue.mixin({
      beforeCreate() {
        const { viewInject } = this.$options as any;
        if (viewInject) {
          const injects = viewInject;
          for (const name in injects) {
            this[name] = rootContainer.getProvider(injects[name] as Type<any>);
          }
        }
      }
    });
  }
};