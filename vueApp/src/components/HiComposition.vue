<template>
  <div class="about">
    <h1>info</h1>
    <Tool :number=number v-if="number < 4"></Tool>
    <button @click="addCount" type="primary">add</button>
    <p>{{fullInfo}}</p>
  </div>
</template>
<script lang="ts">

import Tool from "./Tool.vue"
import { ref, reactive, defineComponent, computed, provide } from "@vue/composition-api";

const asyncData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('japhy')
    }, 1000) 
  })
}
interface CompostionInfo {
  version: number;
  name: string;
}
export default defineComponent({
  props: {
    msg: String
  },
  components: {
    Tool
  },
  setup(props) {
    const number = ref(0);
    const obj: CompostionInfo = reactive({
      version: 2,
      name: 'vue'
    });
    const addCount = () => number.value++;
    const fullInfo = computed(() => props.msg + ":" + obj.name + "@" + obj.version);

    let author = ref("unknnown")
    asyncData().then((res) => {
      author.value = res
    })
    provide('author', {author})


    return {
      number,
      obj,
      addCount,
      fullInfo
    };
  }
});
</script>