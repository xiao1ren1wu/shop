<template>
  <div id="login">
    <section>
      <p>
        <i class="iconfont icon-denglu"></i>
        <input
          type="text"
          class="user"
          placeholder="用户名"
          v-model.lazy="data.userName"
          @change="change('user')"
        />
      </p>
      <span v-show="data.userIsShow">
        只能包含数字、字母、下划线、汉字6-12位
      </span>
    </section>
    <section>
      <p>
        <i class="iconfont icon-password"></i>
        <input
          type="password"
          class="password"
          placeholder="密码"
          v-model.lazy="data.password"
          @change="change('password')"
        />
      </p>

      <span v-show="data.passwordIsShow">只能包含数字、字母、下划线6-12位</span>
    </section>
    <section>
      <p>
        <i class="iconfont icon-password"></i>
        <input
          type="password"
          class="password-again"
          placeholder="确认密码"
          v-model.lazy="data.passwordAgain"
          @change="change('passwordAgain')"
        />
      </p>
      <span v-show="data.passwordAgainIsShow">两次密码内容不一致</span>
    </section>
    <section>
      <p>
        <button @click="login">登录</button>
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { loginApi } from "@/tools/api";
import { useRouter } from "vue-router";
export default {
  setup() {
    const data = reactive({
      userIsShow: false,
      passwordIsShow: false,
      passwordAgainIsShow: false,
      userName: "",
      password: "",
      passwordAgain: "",
    });
    const popData = reactive({
      message: "",
      start: false,
      type: "success",
    });
    const store = useStore();
    function change(type: any) {
      switch (type) {
        case "user":
          data.userIsShow =
            /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{6,12}$/.test(
              data.userName
            )
              ? false
              : true;
          break;
        case "password":
          data.passwordIsShow = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,12}$/.test(
            data.password
          )
            ? false
            : true;
          break;
        case "passwordAgain":
          data.passwordAgainIsShow =
            data.password == data.passwordAgain ? false : true;
          break;
      }
    }
    const router = useRouter();
    function login() {
      if (
        !data.userIsShow &&
        !data.passwordIsShow &&
        !data.passwordAgainIsShow
      ) {
        loginApi({ userName: data.userName, password: data.password }).then(
          (result: any) => {
            if (result.code === 0) {
              store.commit("setPrompt", {
                type: "error",
                message: "用户名或密码错误了哦 |*´Å`)ﾉ ",
                start: true,
              });
            } else if (result.code === 1) {
              window.localStorage.setItem("id", result.userId);
              window.localStorage.setItem("token", result.token);
              store.commit("setPrompt", {
                type: "success",
                message: `登录成功,欢迎:  ${data.userName}`,
                start: true,
              });
              router.push("/");
              store.commit("setSign", "/");
              data.userName = "";
              data.password = "";
              data.passwordAgain = "";
            }
          }
        );
      } else {
        store.commit("setPrompt", {
          type: "error",
          message: "请您填写正确信息呀 (〃'▽'〃) ",
          start: true,
        });
      }
    }
    return {
      data,
      change,
      login,
      popData,
    };
  },
};
</script>

<style lang="less" scoped>
#login {
  width: 80%;
  margin: 5rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  section {
    width: 25rem;
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
    p {
      position: relative;
      i {
        color: #c4c4c4;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0.6rem;
      }
      input,
      button {
        width: 100%;
        height: 2.5rem;
        line-height: 2.5rem;
        outline: none;
        border-radius: 0.3rem;
      }
      input {
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 0 2rem;
        color: #535353;
        border-radius: 0.3rem;
        font-size: 0.85rem;
      }
      button {
        margin: 1rem 0;
        color: #fff;
        background-color: #67c23a;
        border: 1px solid #67c23a;
        cursor: pointer;
      }
      button:hover {
        opacity: 0.9;
      }
      button:active {
        background-color: #5daf34;
        border: 1px solid #5daf34;
      }
      input::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #c4c4c4;
      }
      input:-ms-input-placeholder {
        /* IE 10+ */
        color: #c4c4c4;
      }
      input:-moz-placeholder {
        /* Firefox 18- */
        color: #c4c4c4;
        opacity: 1;
      }
      input::-moz-placeholder {
        /* Firefox 19+ */
        color: #c4c4c4;
        opacity: 1;
      }
    }

    span {
      color: red;
      font-size: 0.7rem;
    }
  }
}
</style>