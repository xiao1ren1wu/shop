<template>
  <div id="search">
    <header>
      <p class="top">
        <router-link to="/">首页</router-link>
        <span>></span>
        <span> {{ title }}</span>
      </p>
      <p class="bottom bottom-year" v-show="data.list.length">
        根据您搜索的“{{ title }}”，为您匹配到以下商品：
      </p>
      <section class="bottom bottom-no" v-show="!data.list.length">
        <span></span>
        <section>
          <p class="title">您寻找的“{{ title }}”还未上架</p>
          <p>我们已经记录下您的搜索请求</p>
          <p>必要会优先寻找合适的该商品制造商</p>
        </section>
      </section>
    </header>
    <main v-show="data.list.length">
     
      <router-link
        :to="{ path: '/details', query: { id: item.Id } }"
        v-for="item in data.sliceList"
        :key="item.Id"
      >
        <Goods :item="item" />
      </router-link>
      <go-top />
    </main>
    <main v-show="!data.list.length">
       <section class="no-title">
        <h3>推荐新品</h3>
      </section>
      <router-link
        :to="{ path: '/details', query: { id: item.Id } }"
        v-for="item in data.newList"
        :key="item.Id"
      >
        <Goods :item="item" />
      </router-link>
    </main>
    <target-cover :isShow="coverIsShow" />
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import Goods from "@/components/GoodList.vue";
import { getSearch, getNewList } from "@/tools/api";
import { computed, onMounted, watch } from "@vue/runtime-core";
import goBottom from "@/components/goBottom/index";
export default {
  components: {
    Goods,
  },
  setup() {
    const route = useRoute();
    let title = computed(() => route.query.word);
    let coverIsShow = ref<boolean>(true);
    const data = reactive({
      list: <any>[],
      sliceList: <any>[],
      page: <any>20,
      newPage: <any>1,
      newList: <any>[],
      newSliceList: <any>[],
    });
    async function getList() {
      getSearch(route.query.word).then((result: any) => {
        data.list = result;
        data.sliceList = data.list.slice(0, data.page);
        if (!data.list.length) getNewListReq();
      });
    }
    goBottom.onScorll(function () {
      if (data.list.length)
        data.sliceList = data.list.slice(0, (data.page += 20));
    });

    function getNewListReq() {
      getNewList(data.newPage).then((result: any) => {
        data.newList = result;
      });
    }
    onMounted(async () => {
      await getList();
      coverIsShow.value = false;
    });
    watch(
      () => route.query.word,
      async () => {
        await getList();
      }
    );
    return {
      data,
      title,
      coverIsShow,
    };
  },
};
</script>


<style lang="less" scoped>
#search {
  width: 80%;
  margin: 2rem auto 0;
  header {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    padding: 0 2rem;
    .top {
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
    .bottom {
      margin-top: 0.7rem;
      background-color: #fff;
      box-sizing: border-box;

      font-size: 0.7rem;
    }
    .bottom-year {
      height: 3rem;
      line-height: 3rem;
      padding-left: 1.8rem;
    }
    .bottom-no {
      display: flex;
      span {
        display: inline-block;
        background-image: url("../assets/images/search-noResult.png");
        background-size: 100% 100%;
        height: 7rem;
        width: 7rem;
        margin: 20px 40px 0 20px;
      }
      p {
        color: #808080;
      }
      .title {
        color: #523669;
        font-size: 1.1rem;
        margin: 2rem 0 1rem;
      }
    }
  }
  main {
    a {
      display: inline-block;
      position: relative;
      width: 15rem;
      height: 20rem;
      margin: 1rem 1.95rem;
      color: #000;
      vertical-align: top;
    }
  }
  .no-title {
    height: 3rem;
    background-color: #fff;
    width: 94.6%;
    margin: 1rem auto 0;
    // margin: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      border-bottom: 1px solid red;
    }
  }
}
</style>