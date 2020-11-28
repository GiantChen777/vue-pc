import Vue from 'vue'
import App from './App'

import router from "./router"
// 引入公共资源样式
import "./style/reset.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 这个router是 new VueRouter产生的实例，所以重写push和replace方法的时候，需要在原型上修改重写问题
  router
}).$mount('#app')
