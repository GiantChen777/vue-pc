import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store"

import Home from "../views/Home"
import Register from "../views/Register"
import Login from "../views/Login"
import Search from "../views/Search"
import Detail from "../views/Detail"
import AddCartSuccess from "../views/AddCartSuccess"
import ShopCart from "../views/ShopCart"
import Trade from "../views/Trade"
import Pay from "../views/Pay"
import PaySuccess from "../views/PaySuccess"
import Center from "../views/Center"

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
const router = new VueRouter({

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
      name: "search",
      path: "/search/:searchText?",
      component: Search,
    },
    {
      name: "detail",
      path: "/detail/:id",
      component: Detail,
    },
    {
      name: "addCartSuccess",
      path: "/addCartSuccess",
      component: AddCartSuccess,
    },
    {
      name: "shopcart",
      path: "/shopcart",
      component: ShopCart
    },
    {
      name: "trade",
      path: "/trade",
      component: Trade
    },
    {
      name: "pay",
      path: "/pay",
      component: Pay
    },
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess
    },
    {
      name: "center",
      path: "/center",
      component: Center
    },
  ],
  // 但由于点击的时候跳转的时候应该在页面的最顶部，而不是我们点击时候的位置，使用scrollBehavior来设置
  // 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样
  scrollBehavior () {
    return { x: 0, y: 0 }
  }

})
/*
  路由守卫：
    1. 是什么
      在路由跳转之前、之中、之后触发的钩子函数（类似于生命周期）
    2. 分类
      全局守卫
        全局前置守卫：在切换路由之前触发
          beforeEach
        全局解析守卫：之中
          beforeResolve
        全局后置守卫：之后
          afterEach
      路由守卫
      组件守卫		

*/

// 需要进行权限验证的地址
const permissionPaths = ["/trade", "/pay", "/center"];
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  /*
    to   要去的路由对象($route)
    from 从哪来的路由对象（当前路由对象）($route)
    next 是一个函数：跳转到哪个路由的方法
      比如：要去to这个路由 next()	
            要去登录路由 next('/login')  next({path: '/login'})  next({name: 'login'})
	
  	
    权限验证：
      如果用户未登录，不允许去 trade pay center 等路由
  */

  // if (permissionPaths.indexOf(to.path) > -1) {
  // 	if (store.state.user.token) {
  // 		next();
  // 	} else {
  // 		next("/login");
  // 	}
  // } else {
  // 	next();
  // }

  if (permissionPaths.indexOf(to.path) > -1 && !store.state.user.token) {
    return next("/login");
  }

  next();
});


export default router
