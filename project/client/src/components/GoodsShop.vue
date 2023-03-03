<template>
  <div id="shop">
    <section class="shop-msg">
      <router-link :to="{ path: '/shop', query: { id: data.Id } }">
        <section class="title">
          <i class="iconfont icon-dianpu1"></i>
          <span>{{ data.addressName }}</span>
        </section>
      </router-link>
      <section class="logo">
        <section>
          <router-link :to="{ path: '/shop', query: { id: data.Id } }">
            <img :src="data.addressLogo" />
          </router-link>
          <p>
            <span>商品质量：<i>5.0</i></span>
            <span>服务态度：<i>5.0</i></span>
          </p>
        </section>
        <router-link
          :to="{ path: '/shop', query: { id: data.Id } }"
          class="go-shop"
        >
          进店看看
        </router-link>
      </section>
      <section class="same">
        <router-link
          :to="{ path: '/details', query: { id: item.Id } }"
          v-for="item in list.sameList"
          :key="item.Id"
        >
          <Goods :item="item" :hover="false" />
        </router-link>
      </section>
    </section>
    <section class="goods-msg">
      <section class="title">
        <p :class="{ active: tabChange }" @click="tabChange = true">商品信息</p>
        <p :class="{ active: !tabChange }" @click="tabChange = false">
          评价详情{{ data.evaluate }}
        </p>
      </section>
      <section class="context" v-show="tabChange">
        <p v-for="(item, index) in list.description" :key="index">
          <span class="context-title">{{ item.title }}</span>
          <span class="context-text">{{ item.text }}</span>
        </p>
        <section class="context-img">
          <img
            :src="item"
            v-for="(item, index) in list.descriptionImage"
            :key="index"
          />
        </section>
      </section>
      <section class="comment" v-show="!tabChange">
        <div
          v-for="(item, index) in list.comment"
          :key="index"
          class="comment-bulid"
        >
          <section class="comment-bulid-user">
            <img :src="item.userPic" />
            <p class="username">{{ item.userName }}</p>
            <p class="vip">
              <i>{{ item.vip }}</i>
            </p>
          </section>
          <section class="comment-bulid-text">
            <p class="speak">{{ item.text }}</p>
            <p class="message">
              <span class="time">{{ item.time }}</span>
              <span class="product">{{ item.product }}</span>
            </p>
          </section>
        </div>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { getShopMsg } from "@/tools/api";
import Goods from "@/components/GoodList.vue";
export default {
  props: ["data"],
  components: {
    Goods,
  },
  setup(props: any, ctx: any) {
    let tabChange = ref<boolean>(true);
    let list = reactive({
      sameList: <any>[],
      comment: <any>[],
      description: <any>[],
      descriptionImage: <any>[],
    });
    list.comment = JSON.parse(props.data.comment);
    list.description = JSON.parse(props.data.description);
    list.descriptionImage = JSON.parse(props.data.descriptionImage);

    getShopMsg({ page: 1, supplier: props.data.supplier }).then((res: any) => {
      list.sameList = res;
      ctx.emit("showcover");
    });
    return {
      tabChange,
      list,
    };
  },
};
</script>

<style lang="less" scoped>
#shop {
  width: 100%;
  margin: auto;
  display: flex;
  margin: 4rem 0;
  border: 1px solid #ccc;
  background-color: #fff;
  .shop-msg .title,
  .goods-msg .title {
    background: #eeecef;
    border-bottom: 1px solid #ccc;
    height: 4rem;
    display: flex;
  }
  .shop-msg {
    width: 25%;
    border-right: 1px solid #ccc;
    .title {
      justify-content: center;
      align-items: center;
      color: #000;
    }
    .logo {
      display: flex;
      flex-direction: column;
      height: 10rem;
      margin: 1rem 0;
      section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        margin: auto;
        box-sizing: border-box;
        padding: 1rem 0;
        img {
          width: 5rem;
          height: 5rem;
          border: 1px solid #ccc;
        }
        p {
          display: flex;
          flex-direction: column;
          margin-right: 2rem;
          span {
            font-size: 0.8rem;
            margin: 0.2rem 0;
            i {
              font-style: normal;
              color: #f7b200;
            }
          }
        }
      }
      .go-shop {
        width: 70%;
        margin: auto;
        background-color: #f7b200;
        color: #fff;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
      }
    }
    .same {
      width: 80%;
      margin: auto;
      display: flex;
      flex-direction: column;
      a {
        padding: 1rem 0;
        border-bottom: 1px solid #ccc;
        width: 15rem;
        height: 20re;
      }
    }
  }
  .goods-msg {
    width: 75%;
    .title {
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 11rem;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        cursor: pointer;
      }
      p.active {
        background: #fff;
        color: #523669;
        border-bottom: 3px solid #523669;
      }
    }
    .context {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 2rem 3rem;
      p {
        line-height: 2rem;
        border-bottom: 2px dotted #cecece;
        color: #333;
        margin: 0.2rem 0;
        .context-title {
          display: inline-block;
          color: #666;
          width: 10rem;
        }
        .context-text {
          display: inline-block;
          width: 40rem;
          color: #333;
        }
      }
      .context-img {
        margin: 3rem 0;
        display: flex;
        flex-direction: column;
        img {
          width: 100%;
        }
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 2rem 3rem;
      .comment-bulid {
        display: flex;
        min-height: 7rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #ccc;
        justify-content: space-between;
        .comment-bulid-user {
          margin-top: 0.5rem;
          width: 12%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            margin-bottom: 0.2rem;
          }
          .username {
            text-align: center;
            font-size: 0.9rem;
            color: #333;
            margin-bottom: 0.2rem;
          }
          .vip {
            text-align: center;
            font-size: 0.9rem;
            i {
              background-color: #ffde84;
              color: #ab7742;
              padding: 0 0.5rem;
              font-weight: bolder;
            }
          }
        }
        .comment-bulid-text {
          margin-top: 1.5rem;
          width: 84%;
          .speak {
            margin-right: 1.5rem;
            font-size: 0.9rem;
            color: #4a4a4a;
            line-height: 21px;
          }
          .message {
            display: flex;
            margin-top: 0.5rem;
            margin-right: 1.5rem;
            color: #bbb;
            font-size: 12px;
            line-height: 16px;
            .product {
              margin-left: 2rem;
            }
          }
        }
      }
    }
  }
}
</style>