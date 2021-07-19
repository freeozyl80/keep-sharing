import { Prop, Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import './DemoComponent.less'

interface KeepFormProps {
  demoName?: string
}

@Component
export class DemoComponent extends tsx.Component<KeepFormProps> {
  @Prop(String) readonly demoName: KeepFormProps['demoName']

  get demo() {
    return 'democomputed'
  }

  initWxjssdk() {
    console.log('init initWxjssdk')
  }

  render() {
    return (
      <div class='demo-component-wrapper'>
        <ul>
          <li>
            <h1 class='title'>
              初始化微信jssdk并设置分享，当前页 {this.demoName}，
              <a href='https://phab.gotokeep.com/w/tech/fe/common/web/keepwechatjssdk/'>文档</a>
            </h1>
            <div class='content'>
              <button onClick={this.initWxjssdk}>
                初始化微信jssdk
              </button>
              <router-link to={{ name: 'home'}}>go home</router-link>
            </div>
          </li>
          <li>
            <h1 class='title'>{this.demo}</h1>
          </li>
        </ul>
      </div>
    )
  }
}
