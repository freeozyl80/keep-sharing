import { Vue, Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'


interface MyComponentProps {
  param?: string
}


@Component
export default class Demo5 extends tsx.Component<MyComponentProps> {
  created() {
  }

  mounted() {
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
      </div>
    )
  }
}
