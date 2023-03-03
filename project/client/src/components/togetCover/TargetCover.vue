<template>
  <div id="cover" v-show="isShow">
    <img src="@/assets/images/loading.jpg" alt="" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  name: "TargetCover",
};
</script>

<style lang="less" scoped>
#cover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(238, 238, 238, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
</style>