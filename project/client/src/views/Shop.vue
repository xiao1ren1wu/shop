<template>
  <div id="shop">
    <p class="top">
      <router-link to="/">首页</router-link>
      <span>></span>
      <span> {{ list.name }}</span>
    </p>
    <section class="title">
      <section class="name">
        <img :src="list.logo" alt="" />
        <p>{{ list.name }}</p>
      </section>
      <section class="glade">
        <p>
          <span class="top">商品质量：</span>
          <span class="bottom">5.0分</span>
        </p>
        <p>
          <span class="top">服务态度：</span>
          <span class="bottom">5.0分</span>
        </p>
      </section>
    </section>
    <section class="context">
      <router-link
        :to="{ path: '/details', query: { id: item.Id } }"
        v-for="item in list.sameList"
        :key="item.Id"
      >
        <Goods :item="item" :hover="false" />
      </router-link>
    </section>
    <target-cover :isShow="coverIsShow" />
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { getShopMsg, getDetail } from "@/tools/api";
import Goods from "@/components/GoodList.vue";
export default {
  components: {
    Goods,
  },
  setup() {
    let route = useRoute();
    const list = reactive({
      sameList: <any>[],
      supplier: <any>[], //supplier
      logo: <any>"", //addressLogo
      name: <any>"", //addressName
    });
    let coverIsShow = ref<boolean>(true);
    getDetail(route.query.id).then((result: any) => {
      list.supplier = result[0].supplier;
      list.logo = result[0].addressLogo;
      list.name = result[0].addressName;
      getShopMsg({ page: 1, supplier: list.supplier }).then((res: any) => {
        list.sameList = res;
        coverIsShow.value = false;
      });
    });
    return {
      list,
      coverIsShow,
    };
  },
};
</script>

<style lang="less" scoped>
#shop {
  width: 80%;
  margin: 3rem auto;
  .top {
    box-sizing: border-box;
    padding: 0 2rem;
    margin: 1rem 0;
    a {
      font-size: 0.8rem;
      color: #000;
      margin-right: 0.5rem;
    }
    span {
      font-size: 0.8rem;
      color: #000;
      margin-right: 0.5rem;
    }
  }
  .title {
    background-color: #fff;
    height: 7rem;
    width: 94.5%;
    margin: auto;
    display: flex;
    box-sizing: border-box;
    padding: 0 2rem;
    align-items: center;
    justify-content: space-between;
    .name {
      display: flex;
      align-items: center;
      height: 100%;
      img {
        height: 100%;
      }
      p {
        margin: 0 2rem;
        font-size: 1.5rem;
      }
    }
    .glade {
      display: flex;
      flex-direction: column;
      margin-right: 3rem;
      p {
        font-size: 0.8rem;
        margin: 0.5rem 0;
        .top {
          color: #666;
          margin-right: 1rem;
        }
        .bottom {
          color: #f49f26;
        }
      }
    }
  }
  .context {
    display: flex;
    flex-wrap: wrap;
    a {
      margin: 1.5rem 1.95rem;
      display: inline-block;
      width: 15rem;
      height: 20rem;
    }
  }
}
</style>