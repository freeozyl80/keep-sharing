import { Vue, Component } from 'vue-property-decorator'
import { preRenderEvent } from '@vuecore/libs/utils'
import { DemoComponent } from '_app/components/DemoComponent/DemoComponent'

@Component({
  components: {
    DemoComponent
  }
})
export default class Demo extends Vue {
  created() {
    console.log(this.$route)
  }

  mounted() {
    preRenderEvent()
  }

  render() {
    return (
      <demo-component demoName='demo'></demo-component>
    )
  }
}
