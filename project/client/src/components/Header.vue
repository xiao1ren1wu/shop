<template>
  <div id="header">
    <div class="no">
      <section>
        <router-link to="/" class="logo">
          <img src="@/assets/images/logo.png" />
        </router-link>
      </section>
      <section class="search" style="flex-direction: column">
        <section>
          <input
            type="text"
            v-model.trim="keyWord"
            placeholder="输入你想要的商品"
          />
          <button @click="search(keyWord)" @keydown.enter="search(keyWord)">
            <i class="iconfont icon-sousuo"></i>
            <span>搜索</span>
          </button>
        </section>
        <section class="commend">
          <router-link
            :to="{ path: '/search', query: { word: item } }"
            v-for="item in hotChooseList"
            :key="item"
          >
            {{ item }}
          </router-link>
        </section>
      </section>
    </div>
    <div :class="{ 'header-active': isToScroll, pop: true }">
      <section class="nav">
        <section class="as">
          <template v-for="item in data.list">
            <router-link
              :key="item.id"
              :to="item.path"
              v-if="item.isShow"
              @click="$store.commit('setSign', item.path)"
              :class="{ active: signPath == item.path }"
            >
              <i :class="['iconfont', item.icon]"></i>
              <span>{{ item.title }}</span>
            </router-link>
          </template>
          <a v-if="data.quit.isShow" @click="quit">
            <i :class="['iconfont', data.quit.icon]"></i>
            <span>{{ data.quit.title }}</span>
          </a>
        </section>
        <section class="search-box">
          <section class="search">
            <input
              type="text"
              v-model.trim="keyWord"
              placeholder="输入你想要的商品"
            />
            <button @click="search(keyWord)" @keydown.enter="search(keyWord)">
              <i class="iconfont icon-sousuo"></i>
              <span>搜索</span>
            </button>
          </section>
        </section>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const signPath = computed(() => store.state.signPath);
    const data = reactive({
      list: [
        {
          id: 0,
          path: "/",
          title: "首页",
          icon: "icon-shouye",
          isShow: true,
        },
        {
          id: 1,
          path: "/login",
          title: "登录",
          icon: "icon-denglu",
          isShow: true,
        },
        {
          id: 2,
          path: "/register",
          title: "注册",
          icon: "icon-zhuce",
          isShow: true,
        },
        {
          id: 3,
          path: "/goodscar",
          title: "购物车",
          icon: "icon-gouwuchekong",
          isShow: false,
        },
      ],
      quit: {
        id: 4,
        path: "/quit",
        title: "退出登录",
        icon: "icon-tuichu",
        isShow: false,
      },
      hotList: [
        "电动牙刷",
        "行李箱",
        "眼镜",
        "口红",
        "香水",
        "咖啡",
        "皮带",
        "洗发水",
        "面霜",
        "面膜",
        "眼霜",
        "精华",
        "白酒",
        "乳液",
        "眼膜",
        "女士内裤",
        "卸妆水",
        "洗面奶",
        "男士内裤",
        "枕头",
      ],
    });
    data.list[1].isShow = data.list[2].isShow = store.state.navStatus;
    data.list[3].isShow = data.quit.isShow = !store.state.navStatus;
    let isToScroll = ref(false);
    const hotChooseList = computed(() => {
      let arr = <any>[];
      while (arr.length < 10) {
        let random = Math.floor(Math.random() * data.hotList.length);
        arr.push(data.hotList[random]);
        arr = Array.from(new Set(arr));
      }
      return arr;
    });
    let keyWord = ref<any>("");
    window.onscroll = function () {
      let scorllTop = document.documentElement.scrollTop;
      if (scorllTop >= 70) {
        isToScroll.value = true;
      } else {
        isToScroll.value = false;
      }
    };

    function search(value: string) {
      if (value == "") return;
      keyWord.value = "";
      router.push({
        path: "/search",
        query: {
          word: value,
        },
      });
    }
    function quit() {
      if (route.path === "/goodscar") {
        router.push("/");
        store.commit("setSign", "/");
      }
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("id");
      store.commit("setNavStatues", true);
      store.commit("setPrompt", {
        type: "success",
        message: `退出成功了哦`,
        start: true,
      });
    }
    watch(
      () => store.state.navStatus,
      (newValue) => {
        console.log(newValue);
        data.list[1].isShow = data.list[2].isShow = newValue;
        data.list[3].isShow = data.quit.isShow = !newValue;
      }
    );
    return {
      data,
      signPath,
      isToScroll,
      hotChooseList,
      keyWord,
      search,
      quit,
    };
  },
};
</script>

<style lang="less" scoped>
#header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background-color: #fff;
  z-index: 5;
  height: 170px;
}
#header > .no {
  width: 80%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  margin-top: 2rem;
}

#header > .pop {
  width: 80%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  margin-top: -1rem;
}
.header-active {
  position: fixed;
  top: 0;
  width: 100% !important;
  margin-top: 0 !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  background-color: #fff;
  z-index: 5;
  padding: 1rem;
  .nav {
    width: 80%;
    .as {
      display: inline-block;
      margin-right: 11.48rem;
      width: 27.5rem;
    }
  }
  .search-box {
    display: inline-block;
    visibility: inherit;
  }
}
.search-box {
  display: inline-block;
  visibility: hidden;
}
.as {
  display: inline-block;
  margin-right: 16rem;
}

.logo {
  width: 12rem;
  display: inline-block;
  margin: 0 0 2rem 3rem;
  img {
    width: 100%;
  }
}

.nav {
  a {
    text-decoration: none;
    color: black;
    margin: 0 2rem;
    font-weight: bolder;
    font-size: 1.25rem;
    transition: 0.5s;
    border-bottom: 2px solid;
    border-color: transparent;
    padding: 5px 0;
    i {
      margin-right: 0.3rem;
    }
  }
  a:hover {
    border-color: #784cfa;
    color: #784cfa;
  }
  .active {
    border-color: #784cfa;
    color: #784cfa;
  }
}
.search {
  margin-right: 5rem;
  section {
    display: flex;
    height: 3rem;
  }
  input {
    width: 25rem;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-right: none;
    display: inline-block;
    font-size: inherit;
    height: 3rem;
    line-height: 3rem;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  input::placeholder {
    color: #9c9c9c;
  }
  button {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 3rem;
  }

  input:hover {
    border-color: #f393f3;
  }
  button:hover {
    color: #784cfa;
    border-color: #f393f3;
    background-color: #f2e6f2;
  }
}
.commend {
  display: flex;
  margin: 0.5rem 0 -0.3rem;
  a {
    margin: 0 0.2rem;
    font-size: 0.8rem;
    color: #666;
    text-decoration: none;
  }
  a:hover {
    color: #784cfa;
  }
}
.logo-active {
  display: none;
}
</style>