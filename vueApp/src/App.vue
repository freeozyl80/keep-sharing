<template>
  <div>
    <div>{{prefix}} Keep</div>
    <HelloKeep :msg="'keep'"></HelloKeep>
    <HiComposition :msg="'compositon'"></HiComposition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HelloKeep from './components/HelloKeep.vue';
import HiComposition from './components/HiComposition.vue';

@Component({
  name: 'Home',
  components: {
    HelloKeep,
    HiComposition
  }
})
export default class App extends Vue {
  prefix: string = 'Hello'
}

</script>