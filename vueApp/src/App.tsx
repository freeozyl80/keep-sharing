
import { Vue, Component } from 'vue-property-decorator';
import MyComponent from './Page/Page';

@Component({
  name: 'Home'
})
export default class App extends Vue {
  protected render() {
    console.log('japhy')
    return(
      <div id="wrapper">
        <MyComponent text="data"></MyComponent>
      </div>
    )
  }
}
