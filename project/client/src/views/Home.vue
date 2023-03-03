<template>
  <div id="home">
    <nav>
      <section class="left">
        <h4>
          <i class="iconfont icon-2"></i>
          <span>分类</span>
        </h4>
        <section class="type">
          <router-link :to="{
            path: '/list',
            query: {
              title: item,
            },
          }" v-for="item in data.list" :key="item">
            {{ item }}
          </router-link>
        </section>
      </section>
      <section class="right">
        <Swpiper />
      </section>
    </nav>
    <main>
      <section class="title">
        <h3>热销排行</h3>
      </section>
      <section class="host-list">
        <router-link :to="{ path: '/details', query: { id: item.Id } }" v-for="item in data.hotSliceList" :key="item.Id">
          <Hot :item="item" />
        </router-link>
      </section>
    </main>
    <go-top />
    <target-cover :isShow="coverIsShow" />
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { getTypeOne, getHottList } from "@/tools/api";
import Swpiper from "@/components/Swpiper.vue";
import Hot from "@/components/Hot.vue";
import goBottom from "@/components/goBottom/index";
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  beforeRouteEnter: (to: any, from: any, next: any) => {
    next((vm: any) => {
      if (window.localStorage.getItem("token")) {
        vm.store.commit("setNavStatues", false);
      } else {
        vm.store.commit("setNavStatues", true);
      }
    });
  },
  components: {
    Swpiper,
    Hot,
  },
  setup() {
    const store = useStore();
    let data = reactive({
      list: <any>[],
      hostList: <any>[],
      hotSliceList: <any>[],
      page: 0,
    });
    let coverIsShow = ref<boolean>(true);
    onMounted(async () => {
      let typeOneList = await getTypeOne();
      data.list = typeOneList;
      let typeHotList: any = await getHottList();
      data.hostList = typeHotList;
      getSlice();
      coverIsShow.value = false;
    });
    goBottom.onScorll(function () {
      getSlice();
    });
    function getSlice() {
      data.hotSliceList = data.hostList.slice(0, (data.page += 12));
    }
    return {
      data,
      coverIsShow,
      store,
    };
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 80%;
  margin: 3rem auto 0;
}

nav {
  display: flex;
  justify-content: space-between;

  .left {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    h4 {
      margin-bottom: 0.5rem;

      i {
        margin: 0 0.5rem;
      }
    }

    .type {
      display: flex;
      flex-wrap: wrap;

      a {
        text-decoration: none;
        color: #999999;
        font-size: 0.95rem;
        width: 4.5rem;
        position: relative;
        margin: 0.5rem 0.6rem 0.5rem 0;
      }

      a:hover {
        color: #784cfa;
      }

      a:hover a::after {
        color: #999999;
      }

      a:nth-child(3n) {
        margin-left: 1rem;
      }

      a::after {
        content: "/";
        position: absolute;
        right: 0rem;
        margin-right: 0.8rem;
        color: #999999;
      }

      a:nth-child(3n)::after {
        content: "";
      }

      a:nth-child(3n-1)::after {
        content: "/";
        position: absolute;
        right: -1rem;
        margin-right: 0.8rem;
      }

      a:last-child::after {
        content: "";
      }
    }
  }

  .right {
    width: 72%;
  }
}

main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 3rem;

  .title {
    height: 3rem;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
      border-bottom: 1px solid red;
    }
  }

  .host-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    a {
      width: 48%;
      height: 26rem;
      margin: 0.5rem 0;
    }
  }
}
</style>