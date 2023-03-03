<template>
  <div id="goTop" @click="goTop" v-show="isShow">
    <i class="iconfont icon-icon"></i>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { onBeforeUnmount } from "@vue/runtime-core";
export default {
  name: "GoTop",
  setup() {
    const store = useStore();
    let timer = <any>null;
    let isShow = ref<any>(false);
    function goTop() {
      if (store.state.lock) return;
      store.commit("setLockBulid", true);
      timer = setInterval(() => {
        document.documentElement.scrollTop -= 300;
      }, 16);
    }
    function scroll() {
      if (document.documentElement.scrollTop == 0) {
        clearInterval(timer);
        store.commit("setLockBulid", false);
      }
      if (document.documentElement.scrollTop >= 200) {
        isShow.value = true;
      } else {
        isShow.value = false;
      }
    }
    window.addEventListener("scroll", scroll);
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", scroll);
    });
    return {
      goTop,
      isShow,
    };
  },
};
</script>

<style lang="less" scoped>
#goTop {
  position: fixed;
  width: 4.5rem;
  height: 4.5rem;
  left: 92%;
  bottom: 10%;
  background-color: #784cfa;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  i {
    font-size: 1.8rem;
    color: #fff;
  }
}
</style>