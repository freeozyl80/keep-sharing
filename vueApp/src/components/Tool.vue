<template>
  <div class="tool">
    {{ number }}
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineComponent, computed, watch, watchEffect, onBeforeUnmount, inject, onMounted } from "@vue/composition-api";

let pendingRequest = function (number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok" + number)
    }, 3000)
  })
}

let faild = false

export default defineComponent({
  props: {
    number: Number
  },
  setup(props) {
    let end = false
    const {author} = inject('author')

    onMounted(()=>{
      console.log('@author', author.value)
    })

    watch(
      () => props.number,
      (number, oldnumber) => {
        setTimeout(() => {
          if (!end)
          console.log("[Apiwatch]",number, oldnumber)
        }, 1000)
      }
    )
    watchEffect(async (onInvalidate) => {
      let valid = false

      onInvalidate(() => {
        valid = true
        console.log('上面的结果无效了，因为发起了新的请求 或者组件被销毁')
      })

      let res = await pendingRequest(props.number)

      if (!valid) {
        console.log(res) 
      }
    })

    onBeforeUnmount(() => {
      console.log('组件被销毁')
      end = true
    })
  },
  watch: {
    number(val) {
      setTimeout(() => {
        if (!faild)
        console.log("[传统watch]number has changed:", val)
      }, 1000)
    }
  },
  beforeDestroy() {
    console.log('组件没了')
    faild = true
  }
});
</script>