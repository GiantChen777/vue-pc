import Vue from 'vue'
import App from './App'

import router from "./router"
import store from "@store";

// 引入mockServer,为了加载里面代码，里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import './mock/mockServe';

// 引入公共资源样式
import "./style/reset.css"

import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 这个router是 new VueRouter产生的实例，所以重写push和replace方法的时候，需要在原型上修改重写问题
  router,
  store
}).$mount('#app')
