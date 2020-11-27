import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home"
import Register from "../views/Register"
import Login from "../views/Login"
import Search from "../views/Search"

//安装插件
Vue.use(VueRouter)

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
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/search",
      component: Search,
    }
  ]
})