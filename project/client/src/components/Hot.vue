<template>
  <div class="hot">
    <img v-lazy="data.item.imageUrl" />
    <section>
      <p>￥{{ data.item.priceStr }}</p>
      <p class="mack">
        <span
          v-for="(con, index) in data.arr"
          :key="index"
          :style="{
            color: con.textColor,
            'background-color': con.color,
            border: '1px solid ' + con.roundColor,
          }"
        >
          {{ con.content }}
        </span>
      </p>
    </section>
    <p class="sale">{{ data.item.salePoint }}</p>
    <p class="price">{{ data.item.title }}</p>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  props: ["item"],
  setup(props: any) {
    const data = reactive({
      item: computed(() => props.item),
      arr: JSON.parse(props.item.labels),
    });
    return {
      data,
    };
  },
};
</script>

<style lang="less" scoped>
.hot {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
  background-color: #fff;
  margin: 1rem 0;
  padding-bottom: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  img {
    width: 100%;
    height: 100%;
  }
  section {
    margin: 0.2rem 1rem;
    display: flex;
    p {
      margin: 0 0.5rem;
      color: #f7a701;
      span {
        margin: 0 0.5rem;
      }
    }
    .mack {
      :deep(span) {
        padding: 0.1rem 0.2rem;
        font-size: 0.7rem;
        border: 1px solid;
        border-radius: 4px;
      }
    }
  }
  .price {
    color: #000;
    margin: 0.2rem 1rem;
  }
  .sale {
    color: #bf9e6b;
    font-size: 0.8rem;
    margin: 0.2rem 1rem;
  }
}
</style>