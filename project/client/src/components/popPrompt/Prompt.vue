<template>
  <div id="prompt" :class="[prompt.type, { fade: isPop }]">
    <i :class="['iconfont', typeToName]"></i>
    <span>{{ prompt.message }}</span>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "PopPrompt",
  setup() {
    const store = useStore();
    const prompt = computed(() => store.state.prompt);
    const typeToName = computed(() => {
      switch (prompt.value.type) {
        case "success":
          return "icon-chenggong";
        case "warning":
          return "icon-warning";
        case "error":
          return "icon-cuowu";
      }
    });
    let isPop = ref<any>(false);
    function startChange() {
      if (prompt.value.start) {
        setTimeout(() => {
          isPop.value = true;
        }, 500);
        setTimeout(() => {
          isPop.value = false;
          store.commit("setPrompt", {
            type: prompt.value.type,
            message: prompt.value.message,
            start: false,
          });
        }, 2500);
      }
    }
    startChange();
    watch(
      () => prompt.value.start,
      () => {
        startChange();
      }
    );

    return {
      typeToName,
      isPop,
      prompt: prompt,
    };
  },
};
</script>

<style lang="less" scoped>
#prompt {
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  display: flex;
  z-index: 10;
  width: 22rem;
  height: 3rem;
  border-radius: 10px;
  align-items: center;
  box-sizing: border-box;
  padding: 0.5rem 2rem;
  transition: all 0.5s;
}
i{
  margin-right: 0.5rem;
}
.success {
  background-color: #f0f9eb;
  color: #67c23a;
}
.warning {
  background-color: #fdf6ec;
  color: #e6a23c;
}
.error {
  background-color: #fef0f0;
  color: #f56c6c;
}
.fade {
  top: 80px !important;
}
</style>