<template>
  <div id="goodsCar">
    <section class="context">
      <div v-for="item in data.shopList" :key="item.Id">
        <div class="car">
          <input
            type="checkbox"
            @click="choose({ e: $event, item })"
            ref="checkbox"
          />
          <img :src="item.imageUrl" alt="" />
          <h1>{{ item.title }}</h1>
          <section>
            <p class="price">￥{{ item.priceStr }}</p>
            <p class="count">
              <span
                class="add"
                @click="carChange({ type: 'add', id: item.Id })"
              >
                <i class="iconfont icon-jia"></i>
              </span>
              <span class="num">{{ item.count }}</span>
              <span
                class="sub"
                @click="carChange({ type: 'sub', id: item.Id })"
              >
                <i class="iconfont icon-jianshao"></i>
              </span>
            </p>
          </section>
          <p class="del" @click="carDelete(item.Id)">
            <i class="iconfont icon-shanchu"></i>
          </p>
        </div>
      </div>
      <div v-show="!data.shopList.length" class="nothing">
        <p>
          <span>购物车中没有商品哦,快去添加吧</span>
          <span class="go-home" @click="goHome">去首页</span>
        </p>
      </div>
    </section>
    <section class="bottom">
      <section>
        <p class="ipt">
          <input
            type="checkbox"
            id="allIpt"
            v-model="data.allSelect"
            @click="allChoose($event)"
          />
          <label for="allIpt">全选</label>
        </p>
        <h3 class="all-price">总计:{{ allPrice }}元</h3>
        <button>
          <i class="iconfont icon-gouwu"></i>
          <span>结算</span>
        </button>
      </section>
    </section>
    <target-cover :isShow="coverIsShow" />
    <div class="del-cover" v-show="delCoverObj.delCoverIsShow">
      <section>
        <p class="del-cover-context">
          当前操作会删除该商品哦,确定要继续吗 ( • ̀ω•́ )✧
        </p>
        <p class="del-cover-btns">
          <button class="cncel" @click="clickDel('cncel')">取消</button>
          <button class="sure" @click="clickDel('sure')">确定</button>
        </p>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { getShopList, carChangeApi } from "@/tools/api";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup(props: any, ctx: any) {
    const store = useStore();
    const router = useRouter();
    interface Eid {
      e: any;
      item: any;
    }
    let data = reactive({
      shopList: <any>[],
      selectList: <any>[],
      allSelect: <boolean>false,
    });
    let allPrice = ref<any>(0);
    let coverIsShow = ref<boolean>(true);
    let jwtData = {
      token: window.localStorage.token,
      goodId: "",
      type: "",
    };
    let checkbox = ref<any>();
    let delCoverObj = reactive({
      delCoverIsShow: <boolean>false,
      delCover: <any>"",
      id: <any>"",
    });
    function getList() {
      getShopList(jwtData.token).then((res) => {
        data.shopList = res;
        coverIsShow.value = false;
        if (data.selectList.length) {
          data.selectList.forEach((item: any, index: any) => {
            data.shopList.forEach((el: any) => {
              if (el.Id === item.Id) {
                data.selectList[index] = JSON.parse(JSON.stringify(el));
              }
            });
          });
          data.allSelect = data.selectList.length == data.shopList.length;
        } else {
          data.allSelect = false;
        }
        priceCalc();
      });
    }
    getList();

    function clickDel(type: any) {
      delCoverObj.delCoverIsShow = false;
      if (type === "sure") {
        delCoverObj.delCover = true; 
        carChange({
          id: jwtData.goodId,
          type: "del",
          token: jwtData.token,
        });
        store.commit("setPrompt", {
          type: "success",
          message: "商品删除成功辣 |*´Å`)ﾉ ",
          start: true,
        });
      } else if (type === "cncel") {
        delCoverObj.delCover = false;
        return;
      }
    }
    function carDelete(id: any) {
      jwtData.goodId = id;
      jwtData.type = "del";
      let index = data.selectList.findIndex(
        (el: any) => jwtData.goodId === el.Id
      );
      if (index !== -1) {
        data.selectList.splice(index, 1);
      }
      delCoverObj.delCoverIsShow = true;
    }
    function carChange(obj: any) {
      jwtData.goodId = obj.id;
      jwtData.type = obj.type;

      if (obj.type === "sub") {
        let index = data.shopList.findIndex(
          (el: any) => el.Id === jwtData.goodId
        );
        if (data.shopList[index].count === 1) {
          delCoverObj.id = data.shopList[index].Id;
          carDelete(delCoverObj.id);
          return;
        }
        store.commit("setPrompt", {
          type: "success",
          message: "修改购物车数量成功辣 |*´Å`)ﾉ ",
          start: true,
        });
      }
      if (obj.type === "add") {
        store.commit("setPrompt", {
          type: "success",
          message: "修改购物车数量成功辣 |*´Å`)ﾉ ",
          start: true,
        });
      }

      carChangeApi({ ...jwtData })?.then((res) => {
        getList();
      });
    }
    function choose(obj: Eid) {
      let index = data.selectList.findIndex((e: any) => e.Id === obj.item.Id);
      if (index === -1) {
        data.selectList.push(obj.item);
      } else {
        if (obj.e.target.checked) data.selectList.splice(index, 1, obj.item);
        else data.selectList.splice(index, 1);
      }
      data.allSelect = data.selectList.length == data.shopList.length;
      priceCalc();
    }
    function allChoose(e: any) {
      if (!data.shopList.length) {
        e.preventDefault();
        store.commit("setPrompt", {
          type: "error",
          message: "当前购物车为空不能全选哦 |*´Å`)ﾉ ",
          start: true,
        });
        return;
      }
      data.selectList = !data.allSelect
        ? JSON.parse(JSON.stringify(data.shopList))
        : [];
      checkbox.value.forEach((el: any) => {
        el.checked = !data.allSelect;
      });
      priceCalc();
    }
    function priceCalc() {
      if (data.selectList.length == 0) {
        allPrice.value = 0;
      } else {
        allPrice.value = data.selectList.reduce((pre: any, item: any) => {
          return (pre = item.count * item.priceStr + pre);
        }, 0);
      }
    }
    function goHome() {
      store.commit("setSign", "/");
      router.push("/");
    }
    return {
      data,
      checkbox,
      carChange,
      allPrice,
      choose,
      allChoose,
      coverIsShow,
      goHome,
      clickDel,
      delCoverObj,
      carDelete,
    };
  },
};
</script>

<style lang="less" scoped>
#goodsCar {
  width: 100%;
  margin: 3rem 0;
  .context {
    width: 60%;
    margin: auto;
    padding-bottom: 4rem;
    .car {
      display: flex;
      height: 8rem;
      border: 1px solid #eee;
      justify-content: space-around;
      border-radius: 1rem;
      background-color: #fff;
      align-items: center;
      margin: 1.5rem 0;
      input {
        cursor: pointer;
      }
      img {
        border: 1px solid #eee;
        border-radius: 10px;
        width: 7rem;
      }
      h1 {
        width: 19rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .price {
          color: #ff786c;
          font-size: 1.2rem;
          margin: 0rem 0 0.5rem;
          font-weight: bolder;
        }
        .count {
          display: flex;
          margin: 0.25rem 0;
          .add,
          .sub {
            text-align: center;
            color: #fff;
            background-color: #283d55;
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
          }
          .add {
            line-height: 1.3rem;
          }
          .sub {
            font-size: 1em;
            font-weight: bolder;
            line-height: 1.6rem;
          }
          .num {
            font-size: 1.4rem;
            margin: 0 0.5rem;
          }
        }
      }
      .del {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: #fe7969;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i {
          color: #fff;
          font-size: 1.2rem;
        }
      }
    }
    .nothing {
      margin: 5rem 0;
      p {
        text-align: center;
        span {
          color: #000;
          margin: 0 1rem;
        }
        .go-home {
          color: #784cfa;
          cursor: pointer;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #f5f3da;
    height: 4rem;
    display: flex;
    align-items: center;
    section {
      width: 92%;
      margin: auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        width: 7rem;
        height: 2.5rem;
        background-color: #fff0f3;
        color: #ff796c;
        border: 1px solid #fff0f3;
        border-radius: 6px;
        cursor: pointer;
        i {
          margin-right: 0.5rem;
        }
      }
      button:active {
        background-color: #f8d2da;
        border: 1px solid #f8d2da;
      }
      .ipt {
        border: 1px solid #379aff;
        width: 5rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #379aff;
        background-color: #c0dfff;
        border: 1px solid #c0dfff;
        border-radius: 5px;
      }
    }
  }
  .del-cover {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    section {
      width: 30rem;
      height: 15rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .del-cover-context {
        height: 60%;
      }
      .del-cover-btns {
        display: flex;
        height: 40%;
        width: 60%;
        justify-content: space-around;
        button {
          display: flex;
          height: 40%;
          width: 7rem;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          opacity: 0.9;
        }
        .cncel {
          background-color: #fff;
          color: #b0b0b0;
          border: 1px solid #b0b0b0;
        }
        .cncel:active {
          background-color: #cccccc;
          color: #000;
        }
        .sure {
          background-color: #5b9cff;
          color: #fff;
          border: 1px solid #5b9cff;
        }
        .sure:active {
          background-color: #3485fb;
        }
      }
    }
  }
}
</style>