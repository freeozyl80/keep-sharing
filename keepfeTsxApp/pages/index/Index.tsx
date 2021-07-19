import { VNode } from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as tsx from "vue-tsx-support";
import IndexComponent from "_app/components/compositionComponent/index"

type MyComponentProps = {
}

@Component
export default class MyComponent extends tsx.Component<MyComponentProps> {
  render(): VNode {
    return (
      <div>
        <span>Hello</span>
        <IndexComponent msg="world"></IndexComponent>
      </div>
    );
  }
}