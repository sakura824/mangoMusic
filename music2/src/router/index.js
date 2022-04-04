import Vue from 'vue'
import VueRouter from 'vue-router'
import Discovery from '../views/Discovery.vue'
import Mv from '../views/Mv.vue'
import Mvs from '../views/Mvs.vue'
import PlayList from '../views/PlayList.vue'
import PlayLists from '../views/PlayLists.vue'
import Result from '../views/Result.vue'
import Songs from '../views/Songs.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import MyInfo from '../views/MyInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  }, 
  {
    path: '/discovery',
    name: 'Discovery',
    component: Discovery
  },
  {
    path: '/mv',
    name: 'Mv',
    component: Mv
  },
  {
    path: '/mvs',
    name: 'Mvs',
    component: Mvs
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: PlayList
  },
  {
    path: '/playlists',
    name: 'PlayLists',
    component: PlayLists
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/songs',
    name: 'Songs',
    component: Songs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/myinfo',
    name: 'MyInfo',
    component: MyInfo
  }
]

const router = new VueRouter({
  routes
})

export default router
