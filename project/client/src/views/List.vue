<template>
  <div id="list">
    <header>
      <p class="left">
        <router-link to="/">首页</router-link>
        <span>></span>
        <span> {{ title }}</span>
      </p>
      <p class="right">
        <span class="now-type">
          <span>当前分类:</span>
          <span>
            {{ title }}
          </span>
          <i></i>
        </span>
        <span class="all-type" @click.stop="popShow = !popShow">
          <span>全部分类</span>
          <i class="iconfont icon-xiangxia2"></i>
        </span>
        <section class="type-list" v-show="popShow">
          <router-link 
          :to="{ path:'/list',query:{title:item} }"
          v-for="item in data.list" 
          :key="item"
          >
          <span @click="popShow=false">{{item}}</span>
          </router-link>
        </section>
      </p>
    </header>
    <main>
      <section class="context">
        <aside>
          <span 
          v-for="(item,index) in data.typeTwoList" 
          :key="item" 
          @click="goToTarget(index)"
          :class="{side:index == activeIndex}">
          {{item}}
          </span>
        </aside>
        <section class="list"> 
          <section v-for="title in data.typeTwoList" :key="title">
              <h2 ref="titleScroll">{{title}}</h2>
              <router-link :to="{path:'/details',query:{id:item.Id} }" v-for="item in getNowType(title)" :key="item.Id">
                <Goods  :item="item" />
              </router-link>
          </section>
        </section>
      </section>
    </main>
    <go-top @click="activeIndex=0" />
    <target-cover :isShow="coverIsShow" />
  </div>
</template>

<script lang="ts">
import { getTypeOne, getTypeTwo, getGoodList } from "../tools/api";
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
  onBeforeUnmount,
} from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Goods from "@/components/GoodList.vue";
import goTargrt from "@/components/toTarget/index";
export default {
  components: {
    Goods,
  },
  setup() {
    let activeIndex = ref<any>(0);
    let titleScroll = ref<any>();
    let popShow = ref<boolean>(false);
    const route = useRoute();
    const store = useStore();
    const title = computed(() => route.query.title);
    const data = reactive({
      list: <any>[],
      typeTwoList: <any>[],
      goodsList: <any>[],
    });
    store.commit("setLockBulid", false);
    let coverIsShow = ref<boolean>(true);
    onMounted(async () => {
      let typeOneList = await getTypeOne();
      data.list = typeOneList;
      let typeTwo: any = await getTypeTwo(title.value);
      data.typeTwoList = typeTwo;
      let goodList: any = await getGoodList(title.value);
      data.goodsList = goodList;
      coverIsShow.value = false;
    });
    window.addEventListener("scroll", function () {
      if (store.state.lock) {
        return;
      }
      if (titleScroll.value) {
        Array.from(titleScroll.value).forEach((item: any, index: any) => {
          if (
            item.offsetTop >= document.documentElement.scrollTop - 100 &&
            item.offsetTop <= document.documentElement.scrollTop + 100
          ) {
            activeIndex.value = index;
          }
        });
      }
    });

    function getNowType(title: any) {
      return data.goodsList.filter((item: any) => item.type_two == title);
    }
    function goToTarget(index: number) {
      if (store.state.lock) {
        return;
      }
      activeIndex.value = index;
      let st = document.documentElement.scrollTop;
      goTargrt.toTargrt(titleScroll.value[index].offsetTop, st);
    }
    watch(
      () => route.query.title,
      async (title) => {
        coverIsShow.value = true;
        let typeTwo: any = await getTypeTwo(title);
        data.typeTwoList = typeTwo;
        let goodList: any = await getGoodList(title);
        data.goodsList = goodList;
        coverIsShow.value = false;
      }
    );
    window.onclick = function () {
      popShow.value = false;
    };
    onBeforeUnmount(() => {
      window.onclick = function () {};
    });
    return {
      activeIndex,
      data,
      title,
      popShow,
      titleScroll,
      getNowType,
      goToTarget,
      coverIsShow,
    };
  },
};
</script>

<style lang="less" scoped>
#list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem 2rem;
}
header {
  display: flex;
  justify-content: space-between;
  width: 80%;
  height: 3rem;
  line-height: 3rem;
  box-sizing: border-box;
  padding: 0 1rem;
  .left {
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
  .right {
    position: relative;
    span {
      font-size: 0.8rem;
      color: #000;
    }
    .now-type {
      padding: 0.5rem;
      background-color: #fff;
      margin-right: 2rem;
      width: 8rem;
      height: 1.25rem;
      display: inline-flex;
      position: relative;
      align-items: center;
      i {
        position: absolute;
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: greenyellow;
        right: 1rem;
      }
    }
    .all-type {
      cursor: pointer;
    }
    .type-list {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      position: absolute;
      z-index: 5;
      width: 100%;
      height: 20rem;
      background-color: #fff;
      border-radius: 5%;
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding: 0.5rem;

      a {
        color: #000;
        margin: 0 0.6rem;
        font-size: 0.8rem;
        cursor: pointer;
      }
      a:hover {
        color: #784cfa;
      }
    }
  }
}
main {
  display: flex;
  flex-direction: column;
  width: 80%;
  .context {
    position: relative;
    width: 100%;
    aside {
      position: fixed;
      top: 13rem;
      width: 7rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      span {
        margin: 0.3rem 0;
      }
      .side {
        color: purple;
        font-weight: bolder;
        filter: drop-shadow(0 0 10px purple);
      }
      span:hover {
        color: purple;
        font-weight: bolder;
        filter: drop-shadow(0 0 10px purple);
      }
    }
    h2 {
      font-weight: 400;
      text-align: center;
    }
    .list {
      a {
        display: inline-block;
        position: relative;
        width: 15rem;
        height: 20rem;
        margin: 1rem 1.59rem;
        color: #000;
      }
    }
  }
}
</style>