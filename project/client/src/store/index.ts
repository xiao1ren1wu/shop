import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    prompt: {
      type: "",
      message: "",
      start: false
    },
    signPath: '/',
    navStatus: true,
    lock: false,
  },
  mutations: {
    setPrompt(state, obj) {
      state.prompt = obj;
    },
    setSign(state, path) {
      state.signPath = path;
    },
    setNavStatues(state, status) {
      state.navStatus = status;
    },
    setLockBulid(state, status) {
      state.lock = status;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    vuexLocal.plugin
  ]
})
