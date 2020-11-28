import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home"
import Register from "../views/Register"
import Login from "../views/Login"
import Search from "../views/Search"

//安装插件
Vue.use(VueRouter)
//重写push和replace方法
const push = VueRouter.prototype.push
const replace = VueRouter.prototype.replace
VueRouter.prototype.push = function (loaclhost, onComplete, onAbort) {
  // 如果想处理失败就可以失败的
  if (onComplete && onAbort) {
    return push.call(this.loaclhost, onComplete, onAbort)
  }
  // 否则不处理就直接自己设置( 如果用户不处理失败，给默认值：空函数)
  return push.call(this, loaclhost, onComplete, () => { })
}
VueRouter.prototype.replace = function (loaclhost, onComplete, onAbort) {
  // 如果想处理失败就可以失败的
  if (onComplete && onAbort) {
    return replace.call(this.loaclhost, onComplete, onAbort)
  }
  // 否则不处理就直接自己设置(如果用户不处理失败，给默认值：空函数)
  return replace.call(this, loaclhost, onComplete, () => { })
}

//导出
export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFootershow: true
      }
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFootershow: true
      }
    },
    {
      path: "/search/:searchText?",
      component: Search,
    }
  ]
})