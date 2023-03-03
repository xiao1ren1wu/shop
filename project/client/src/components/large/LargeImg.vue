<template>
  <div class="goods-box">
    <section class="goods-show">
      <section
        v-show="isShow"
        class="large"
        :style="[{ backgroundImage: `url(${imgs[imageIndex]})` }, bgPosition]"
      ></section>
      <section class="target" ref="target">
        <img :src="imgs[imageIndex]" />
        <section class="cover" v-show="isShow" :style="[position]"></section>
      </section>
    </section>
    <section class="img-list">
      <img
        v-for="(item, index) in imgs"
        :src="item"
        :key="item"
        @click="imageIndex = index"
        :class="{ active: imageIndex == index }"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { ref, watch, reactive, onMounted, computed } from "vue";
export default {
  name: "EnlargeImages",
  props: ["images"],
  setup(props: any, context: any) {
    const imgs = computed(() => {
      return props.images;
    });
    let imageIndex = ref<number>(0);
    const target = ref<any>(null);
    let isShow = ref<any>(false);

    const position = reactive({
      left: <any>0,
      top: <any>0,
    });
    const bgPosition = reactive({
      backgroundPositionX: <any>0,
      backgroundPositionY: <any>0,
    });
    let clientStatus = reactive({
      elementX: 0,
      elementY: 0,
      isOutside: false,
    });

    onMounted(() => {
      target.value.onmouseenter = function () {
        clientStatus.isOutside = true;
      };
      target.value.onmouseleave = function () {
        clientStatus.isOutside = false;
      };
      target.value.onmousemove = function (e: any) {
        // 鼠标在盒子内X
        clientStatus.elementX =
          e.clientX - target.value.getBoundingClientRect().left;
        // 鼠标在盒子内Y
        clientStatus.elementY =
          e.clientY - target.value.getBoundingClientRect().top;
      };
    });
    watch(clientStatus, (newValue) => {
      isShow.value = newValue.isOutside;
      if (clientStatus.elementX < 100) {
        // 左边界
        position.left = 0;
      } else if (clientStatus.elementX > 300) {
        // 右边界
        position.left = 200;
      } else {
        // 中间的状态
        position.left = clientStatus.elementX - 100;
      }
      // 垂直方向
      if (clientStatus.elementY < 100) {
        // 上边界
        position.top = 0;
      } else if (clientStatus.elementY > 300) {
        // 下边界
        position.top = 200;
      } else {
        // 中间的状态
        position.top = clientStatus.elementY - 100;
      }
      bgPosition.backgroundPositionX = -position.left * 2 + "px";
      bgPosition.backgroundPositionY = -position.top * 2 + "px";
      position.left += "px";
      position.top += "px";
    });

    return {
      imgs,
      imageIndex,
      target,
      isShow,
      position,
      bgPosition,
    };
  },
};
</script>
<style lang="less" scoped>
.goods-box {
  position: relative;
  width: 25rem;
  height: 30rem;
  z-index: 4;
  .goods-show {
    width: 25rem;
    height: 25rem;
    position: relative;
    display: flex;
    flex-direction: column;
    .large {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 120%;
      background-size: 200% 200%;
    }
    .target {
      width: 100%;
      height: 100%;
      position: relative;
      cursor: move;
      .cover {
        position: absolute;
        width: 12.5rem;
        height: 12.5rem;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        top: 0;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .img-list {
    width: 25rem;
    height: 5rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 0.2rem;
      box-sizing: border-box;
      border: 1px solid transparent;
    }
    .active {
      border: 1px solid #000;
    }
  }
}
</style>