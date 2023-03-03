<template>
  <div id="swiper" @mouseenter="enter" @mouseleave="leave">
    <div class="croll-box" ref="longBox">
      <img :src="item" v-for="item in data.swiperList" :key="item" />
    </div>
    <i :class="{
      left: true,
      'side-left': swiperConfig.btnIsPop,
    }" @mouseenter="swiperConfig.enterBtn[0] = true" @mouseleave="swiperConfig.enterBtn[0] = false"
      @click="click('left')">
      <i class="iconfont icon-xiangzuo1" :style="{
        'font-size': '1.5rem',
        color: swiperConfig.enterBtn[0] ? '#fff' : '#000',
      }"></i>
    </i>
    <i :class="{
      right: true,
      'side-right': swiperConfig.btnIsPop,
    }" @mouseenter="swiperConfig.enterBtn[1] = true" @mouseleave="swiperConfig.enterBtn[1] = false"
      @click="click('right')">
      <i class="iconfont icon-xiangyou1" :style="{
        'font-size': '1.5rem',
        color: swiperConfig.enterBtn[1] ? '#fff' : '#000',
      }"></i>
    </i>
  </div>
</template>

<script lang="ts">
import { onBeforeRouteLeave } from "vue-router";
import { reactive, ref } from "@vue/reactivity";
import { getSwiper } from "@/tools/api";
import { onMounted } from "@vue/runtime-core";
export default {
  setup() {
    const longBox = ref<any>(document.querySelector(".croll-box"));
    let data = reactive({
      swiperList: <any>[],
    });
    let swiperConfig = reactive({
      btnIsPop: true,
      enterBtn: [false, false],
      index: 0,
      lock: true,
      timer: <any>null,
    });
    getSwiper().then((result: any) => {
      console.log(result.data);
      data.swiperList = result.data;
      data.swiperList.push(result.data[0]);
    });

    onMounted(() => {
      swiperConfig.timer = setInterval(() => {
        autoPlay();
      }, 2000);
    });

    function enter() {
      swiperConfig.btnIsPop = false;
      clearInterval(swiperConfig.timer);
    }
    function leave() {
      swiperConfig.btnIsPop = true;
      swiperConfig.timer = setInterval(() => {
        autoPlay();
      }, 2000);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        clearInterval(swiperConfig.timer);
      }
    });

    function click(type: string) {
      if (!swiperConfig.lock) return;
      if (type == "left") {
        if (swiperConfig.index == 0) {
          swiperConfig.index = 5;
          longBox.value.style.marginLeft = `-${54 * swiperConfig.index}rem`;
          longBox.value.style.transition = "none";
          setTimeout(() => {
            longBox.value.style.transition = ".5s ease";
            swiperConfig.index = 4;
            longBox.value.style.marginLeft = `-${54 * swiperConfig.index}rem`;
          });
        } else {
          swiperConfig.index--;
          longBox.value.style.marginLeft = `-${54 * swiperConfig.index}rem`;
        }
      } else {
        longBox.value.style.transition = ".5s ease";
        swiperConfig.index++;
        if (swiperConfig.index == 5) {
          setTimeout(() => {
            longBox.value.style.transition = "none";
            swiperConfig.index = 0;
            longBox.value.style.marginLeft = `-${54 * swiperConfig.index}rem`;
          }, 500);
        }
        longBox.value.style.marginLeft = `-${54 * swiperConfig.index}rem`;
      }
      swiperConfig.lock = false;
      setTimeout(() => {
        swiperConfig.lock = true;
      }, 500);
    }
    function autoPlay() {
      click("right");
    }

    onBeforeRouteLeave(() => {
      clearInterval(swiperConfig.timer);
    });

    return {
      data,
      enter,
      leave,
      swiperConfig,
      longBox,
      click,
    };
  },
};
</script>
<style lang="less" scoped>
#swiper {
  width: 54rem;
  height: 100%;
  overflow: hidden;
  position: relative;

  .croll-box {
    width: calc(54rem * 6);
    height: 100%;

    img {
      height: 100%;
      width: 54rem;
    }
  }
}

.left,
.right {
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  top: calc(50% - 1.5rem);
  border-radius: 50%;
  background-color: rgba(120, 76, 250, 0.4);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}

.left {
  left: 2rem;
}

.right {
  right: 2rem;
}

.side-left {
  left: -3rem;
}

.side-right {
  right: -3rem;
}

.left:hover,
.right:hover {
  background-color: rgba(120, 76, 250, 0.8);
}
</style>