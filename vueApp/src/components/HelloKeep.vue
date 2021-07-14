<template>
  <div>Hi: {{msg}}</div>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Log } from '../lib/decorator.ts'
import KeepService from '../service/index.ts'

@Component({
  viewInject: {
    keepService: KeepService
  },
  name: 'HelloKeep'
})
export default class HelloKeep extends Vue {
  @Prop(String) readonly msg: string
  @Log
  hello(value) {
    console.log('Hello: ' + value)
  }
  mounted() {
    this.hello("mounted!")
    console.log(this.keepService.getInfo())
  }
}
</script>