import Vue from 'vue'
export class VueComponent<P = Record<string, unknown>> extends Vue {
  readonly $props!: P
}
