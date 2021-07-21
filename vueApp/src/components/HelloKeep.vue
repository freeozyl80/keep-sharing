<template>
  <div>Hi: {{msg}}</div>
</template>
<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Log } from '../lib/decorator.ts'
import KeepService from '../service/index.ts'

@Component({
  viewInject: {
    keepService: KeepService
  },
  name: 'HelloKeep'
})
export default class HelloKeep extends Vue {
  @Prop(String) author: string
  @Prop(String) readonly msg: string
  @Log
  hello(value) {
    console.log('Hello: ' + value)
  }
  @Watch('author')
  onAuthorChanged(val: string, oldVal: string) {
    console.log('@watch', val, oldVal)
  }

  mounted() {
    this.hello("mounted!")
    console.log(this.keepService.getInfo())
  }
}
</script>