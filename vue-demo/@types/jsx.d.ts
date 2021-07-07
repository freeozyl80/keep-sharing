// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Element extends VNode {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface ElementAttributesProperty {
      $props: any
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any;
    ref?: string;
    $router: any;
    $route: any;
    show: any;
  }
}