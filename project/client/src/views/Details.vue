<template>
  <div>
    <div>
    <div id="details">
    <section class="header">
      <button @click="back">
        <i class="iconfont icon-xiangzuo1"></i>
        返回
      </button>
    </section>
    <div class="context">
      <section class="details-image">
        <enlarge-images :images="data.imgs" />
      </section>
      <section class="details-message">
        <section class="details-message-top">
          <h2 class="title">{{ data.detailObj.title }}</h2>
          <p class="depict">{{ data.detailObj.salePoint }}</p>
          <p class="supplier">{{ data.detailObj.supplier }}</p>
        </section>
        <section class="details-message-middle">
          <p class="msg">
            <span class="price">
              <span class="price-title">售价</span>
              <span class="price-context">
                ￥<i>{{ data.detailObj.priceStr }}</i>
              </span>
            </span>
            <span class="time">生产周期 {{ data.detailObj.leadTime }} 天</span>
          </p>
          <p class="choose" v-show="data.sizeList.length">
            <section class="size">
              <span>尺寸</span>
              <section>
                <span 
                v-for="(item,index) in data.sizeList" 
                :key="item" 
                @click="chooseActive = index">
                {{ item }}
                  <em v-show="chooseActive == index"></em>
                </span>
              </section>
            </section>
          </p>
        </section>
        <section class="details-message-bottom">
          <p class="add-car" @click="addCar">
            <i class="iconfont icon-gouwuchetianjia"></i>
            <span>添加至购物车</span>
          </p>
        </section>
      </section>
    </div>
    <div class="same">
        <router-link
          :to="{ path: '/details', query: { id: item.Id } }"
          v-for="item in data.sameList"
          :key="item.Id"
        >
          <Goods :item="item" />
        </router-link>
    </div>
    <div v-if="shopISFind">
      <Shop :data="data.detailObj" @showcover="coverIsShow = false;"/>
    </div>
  </div>
   <div class="bottom">
      <img src="../assets/images/footer.png" alt="">
    </div>
  </div>
  <target-cover :isShow="coverIsShow" />
  <go-top />
  </div>
</template>

<script lang="ts">
import { getDetail, getCarAdd, getSameList } from "@/tools/api";
import { computed, ref, reactive, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Goods from "@/components/GoodList.vue";
import Shop from "@/components/GoodsShop.vue";
export default {
  components: {
    Shop,
    Goods,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const data = reactive({
      detailObj: <any>{},
      imgs: <any>[],
      sizeList: <any>[],
      sameList: <any>[],
    });
    let chooseActive = ref<any>(0);
    const id = computed(() => route.query.id);
    let coverIsShow = ref<boolean>(true);
    let shopISFind = ref<boolean>(false);
    function getList() {
      getDetail(id.value).then((result: any) => {
        data.detailObj = result[0];
        getSameList(data.detailObj.supplier).then((res: any) => {
          data.sameList = res;
          shopISFind.value = true;
        });
        data.imgs = getJSON(result[0].imgs).slice(1, 6);
        data.sizeList = getJSON(data.detailObj.sizeList);
      });
    }
    getList();
    function getJSON(str: string) {
      return JSON.parse(str);
    }
    function back() {
      document.documentElement.scrollTop = 0;
      router.go(-1);
    }

    function addCar() {
      if (window.localStorage.getItem("token")) {
        let addCarData = {
          token: window.localStorage.getItem("token"),
          goodId: data.detailObj.Id,
        };
        getCarAdd(addCarData).then(() => {
          router.push("/goodscar");
          store.commit("setSign", "/goodscar");
          store.commit("setPrompt", {
            type: "success",
            message: "添加购物车成功 (*´ﾟ∀ﾟ｀)ﾉ ",
            start: true,
          });
        });
      } else {
        router.push("/login");
        store.commit("setSign", "/login");
        store.commit("setPrompt", {
          type: "warning",
          message: "您还没有登录哦 (❁´◡`❁)*✲ﾟ* ",
          start: true,
        });
      }
    }
    watch(
      () => route.query.id,
      () => {
        document.documentElement.scrollTop = 0;
        getList();
      }
    );
    return {
      data,
      getJSON,
      chooseActive,
      back,
      coverIsShow,
      addCar,
      shopISFind,
    };
  },
};
</script>

<style lang="less" scoped>
#details {
  width: 80%;
  margin: 3rem auto 0;
  .header {
    button {
      border: 1px solid #ccc;
      background-color: #fff;
      color: #7a7a7a;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        margin-right: 0.5rem;
      }
    }
  }
  .context {
    margin-top: 1rem;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
}
.same {
  display: flex;
  margin: 3rem 0;
  a {
    display: inline-block;
    width: 15rem;
    height: 20rem;
    margin: 0 1rem;
  }
}
.big {
  position: absolute;
}
.details-image {
  width: 25rem;
}
.details-message {
  width: 33rem;
  margin-right: 10rem;
  .details-message-top {
    border-bottom: 1px solid #ccc;
    .title {
      font-size: 20px;
      font-weight: 400;
      color: #333;
      margin-bottom: 14px;
    }
    .depict {
      font-size: 0.9rem;
      color: #999;
      margin-bottom: 0.9rem;
    }
    .supplier {
      position: relative;
      display: inline-block;
      height: 1.5rem;
      padding: 0 0.7rem;
      margin-bottom: 0.9rem;
      border-radius: 2px;
      background-color: #f7f1e8;
      font-size: 0.7rem;
      line-height: 1.5rem;
      color: #bf9e6b;
      cursor: pointer;
    }
  }
  .details-message-middle {
    color: #666;
    font-size: 0.9rem;
    .msg {
      margin: 0.9rem 0;
      display: flex;
      .price {
        height: 2.5rem;
        .price-title {
          line-height: 3rem;
        }
        .price-context {
          color: #f85453;
          margin-left: 2rem;
          i {
            vertical-align: -3px;
            font-size: 28px;
            font-style: normal;
          }
        }
      }
      .time {
        margin-left: 3rem;
        line-height: 3rem;
      }
    }
    .choose {
      margin: 0.9rem 0;
      .size {
        display: flex;
        span {
          word-break: keep-all;
          white-space: nowrap;
        }
        section {
          margin-left: 2rem;
          span {
            position: relative;
            display: inline-block;
            margin: 0 6px 15px 0;
            border: 1px solid #ccc;
            cursor: pointer;
            height: 33px;
            line-height: 33px;
            padding: 0 23px;
            font-size: 14px;
            em {
              position: absolute;
              bottom: 0;
              right: 0;
              width: 22px;
              height: 22px;
              background: url("../assets/images/details-choose-active.png")
                no-repeat;
            }
          }
        }
      }
    }
  }
  .details-message-bottom {
    .add-car {
      background-color: #f56c6c;
      color: #fff;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      width: 12rem;
      border-radius: 2px;
      cursor: pointer;
      i {
        margin-right: 0.5rem;
      }
    }
  }
}
.bottom {
  margin-top: 2rem;
  width: 100%;
  background-color: #fff;
  text-align: center;
  img {
    width: 80%;
  }
}
</style>