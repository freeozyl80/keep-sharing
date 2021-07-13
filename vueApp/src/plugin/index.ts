// plugin.ts
import { VueConstructor } from "vue";
import { Container } from "../loc/container.ts";
import { Type } from "../loc/interface.ts";

export default {
  install(Vue: VueConstructor, rootContainer: Container) {
    Vue.mixin({
      beforeCreate() {
        const { viewInject } = this.$options;
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