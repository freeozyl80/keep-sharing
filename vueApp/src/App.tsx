
import { Vue, Component } from 'vue-property-decorator';
import MyComponent from './Page/Page';

@Component({
  name: 'Home'
})
export default class App extends Vue {
  render() {
    console.log('japhy')
    return(
      <div id="wrapper">
        <MyComponent text={"data"} important={ false }></MyComponent>
      </div>
    )
  }
}
