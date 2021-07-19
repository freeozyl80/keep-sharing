import Vue from 'vue'
declare module 'vue/types/vue' {
  interface Vue {
    $router: any,
    $route: any,
    show: any
  }
}
