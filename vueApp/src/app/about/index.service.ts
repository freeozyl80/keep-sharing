import { ref, reactive, defineComponent, computed, provide } from "@vue/composition-api";


type SomeData =  {
  desc: string
} 

function SomeService(){
  const data: SomeData = reactive({
    desc: 'xxxxx'
  })
  const changeDesc = (append: string): void => {
    data.desc = data.desc + append
  }
  return {data, changeDesc}
}

export default SomeService