<template>
  <div>
    <h1>This is About Page</h1>
    <p>{{JSON.stringify(data)}}</p>
    <p>{{test.msg}}</p>
    <button @click="changeAuthor">change Author</button>
    <button @click="testF">test</button>
    <Sum :data="sumInfo" :test="xxx.msg"></Sum>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, computed, provide, toRef } from "@vue/composition-api";
import { Vue, Component } from 'vue-property-decorator';
import Sum from './sum/index.vue'
import SomeService from './index.service.ts'

export default defineComponent({
  data() {
    return {
      xxx: {
        msg: null
      },
      test: {
        msg: '123'
      }
    }
  },
  components: {
    Sum
  },
  provide: {
    someservice: SomeService()
  },
  setup() {
    const data = reactive({
      aboutInfo: {
        user: {
          author: 'japhy'
        },
        lang: {
          langInfo: 'vue'
        },
        desc: {
          msg: "This is example acticle"
        }
      }
    })
    // 值是深拷贝，对象是浅拷贝的原因
    const sumInfo = data.aboutInfo.user.author
    //const sumInfo = toRef(data.aboutInfo.user, 'author')
    const changeAuthor = () => {
      data.aboutInfo.user.author = 'Keep';
    }
    return {
      data,
      sumInfo,
      changeAuthor
    }
  },
  mounted() {
    this.xxx.msg = this.test.msg
  },
  methods: {
    testF() {
      this.test.msg = '1234'
    }
  }
})

</script>