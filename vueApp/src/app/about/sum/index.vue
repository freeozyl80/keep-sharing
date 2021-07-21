<template>
  <div>
    <div>-----</div>
    <p>{{JSON.stringify(data)}}</p>
    <p>{{JSON.stringify(test)}}</p>
    <p>{{JSON.stringify(msg)}}</p>
    <button @click="action">chang desc</button>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed, provide, inject } from "@vue/composition-api";
import { Vue, Component } from 'vue-property-decorator';


export default defineComponent({
  name: 'Sum',
  props: {
    data: String,
    test: String
  },
  setup(props) {
    const someservice = inject('someservice')
    const action = () => {
      someservice.changeDesc('!')
    }
    return {
      msg: someservice.data,
      action: action
    }
  }
});
</script>