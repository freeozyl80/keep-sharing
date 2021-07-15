<template>
  <div>
    <div>{{prefix}} Keep</div>
    <HelloKeep :msg="'keep'" :author="author"></HelloKeep>
    <HiComposition :msg="'compositon'"></HiComposition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloKeep from '../components/HelloKeep.vue';
import HiComposition from '../components/HiComposition.vue';

const asyncAuthor = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('japhy')
    }, 100)
  })
}

@Component({
  name: 'Home',
  components: {
    HelloKeep,
    HiComposition
  }
})
export default class Home extends Vue {
  prefix: string = 'Hello'
  author: string = 'unknown'
  async mounted() {
    let res = await asyncAuthor()
    this.author = res
    console.log(this.author)
  }
}

</script>