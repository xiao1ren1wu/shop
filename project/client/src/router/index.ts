import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/goodscar',
    name: 'GoodsCar',
    component: () => import('@/views/GoodsCar.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/Details.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
