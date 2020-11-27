import Vue from 'vue'
import App from './App'

import router from "./router"
// 引入公共资源样式
import "./style/reset.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
