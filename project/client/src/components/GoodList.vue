<template>
  <div :class="['goods-box', { hover: isHover }]">
    <section class="img-box" ref="imgBox">
      <img v-lazy="item.imageUrl" />
    </section>
    <p class="title">{{ item.title }}</p>
    <p class="price">
      <span class="price-str">￥{{ item.priceStr }}</span>
      <span class="mack" v-html="item.mack"></span>
    </p>
    <p class="nice">{{ item.evaluate }}条好评</p>
  </div>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { onBeforeUnmount, onMounted } from "@vue/runtime-core";
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
    hover: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: any) {
    const imgBox = ref<any>();
    onMounted(() => {
      imgBox.value.children[0].onload = function () {
        let imgHeight = imgBox.value.children[0].getBoundingClientRect().height;
        let imgWidth = imgBox.value.children[0].getBoundingClientRect().width;
        console.log(imgHeight, imgWidth);
        if (imgHeight < imgWidth - 10 || imgHeight > imgWidth + 10) {
          imgBox.value.children[0].style.marginTop = "25%";
        }
      };
    });
    let isHover = ref<boolean>(true);
    if (!props.hover) {
      isHover.value = false;
    }
    onBeforeUnmount(() => {
      imgBox.value.children[0].onload = function () {};
    });
    return {
      imgBox,
      isHover,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: inline-flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column;
  color: #000;
  .img-box {
    width: 100%;
    height: 75%;
    overflow: hidden;
  }
  img {
    width: 100%;
    transition: all 0.5s;
  }
  .title {
    margin-left: 1rem;
    width: 90%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .price {
    margin-left: 1rem;
    .price-str {
      color: #f7a701;
      margin-right: 0.5rem;
    }
    .mack {
      margin: 0 0.5rem;
      :deep(span) {
        padding: 0.1rem 0.2rem;
        font-size: 0.7rem;
        border: 1px solid;
        border-radius: 4px;
      }
    }
  }
  .nice {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #bbb;
  }
}
.hover:hover {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.hover:hover img {
  transform: scale(1.05);
}
</style>