<template>
  <div id="app">
    <header class="header">
      <Header />
    </header>
    <main class="main"></main>
    <router-view />
    <pop-prompt />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Header from "@/components/Header.vue";
@Options({
  components: {
    Header, 
  },
})
export default class App extends Vue {
  setup() {}
}
</script>
<style lang="less" scoped>

</style>
