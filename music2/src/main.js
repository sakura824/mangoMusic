import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import './assets/icon/iconfont.css'
import './assets/bofang-icon/iconfont.css'
import './assets/font_2710807_ipsjv8xvc8/iconfont.css'
import util from './network/utils.js'
Vue.config.productionTip = false

Vue.prototype.util = util;
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
