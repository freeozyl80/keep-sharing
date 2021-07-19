import { Component } from 'vue-property-decorator'
import { preRenderEvent } from '@vuecore/libs/utils'
import { VueComponent }  from '_app/types/vue-ts-component'
import { DemoComponent } from '_app/components/DemoComponent/DemoComponent'

interface MyComponentProps {
  param?: string
}


@Component({
  components: {
    DemoComponent
  }
})
export default class Demo5 extends VueComponent<MyComponentProps> {
  created() {
    console.log(this.$route)
  }

  mounted() {
    preRenderEvent()
  }

  render() {
    return (
      <demo-component demoName='demo5'></demo-component>
    )
  }
}
