import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import large from './components/large/index'
import goTop from './components/goTop/index'
import cover from './components/togetCover/index'
import imgLazy from "./components/lazyLoad/index";
import prompt from "./components/popPrompt/index";
import './assets/icons/iconfonts/iconfont.css'
createApp(App).use(store).use(router).use(large).use(goTop).use(cover).use(imgLazy).use(prompt).mount('#app')
