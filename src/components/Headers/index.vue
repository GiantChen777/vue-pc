<template>
  <div class="header-container">
    <div class="header">
      <div class="header-top">
        <div class="header-login-list">
          <p>尚品汇欢迎您！</p>
          <span>请</span>
          <router-link to="/login">登录</router-link>
          <router-link to="/register" class="register">免费注册</router-link>
        </div>
        <div class="header-type-list">
          <ul>
            <li>
              <a href="###" class="first">我的订单</a>
            </li>
            <li>
              <a href="###">我的购物车</a>
            </li>
            <li>
              <a href="###">我的尚品汇</a>
            </li>
            <li>
              <a href="###">尚品汇会员</a>
            </li>
            <li>
              <a href="###">企业采购</a>
            </li>
            <li>
              <a href="###">关注尚品汇</a>
            </li>
            <li>
              <a href="###">我的订单</a>
            </li>
            <li>
              <a href="###">合作招商</a>
            </li>
            <li>
              <a href="###">商家后台</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <div class="header-img">
        <router-link to="/">
          <img src="./images/logo.png" />
        </router-link>
      </div>
      <div class="header-input">
        <input type="text" class="header-text" v-model="searchText" />
        <button @click="search" class="header-button" type="button">
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    search() {
      //在search组件中，编程式导航点击的时候，第二次开始会出现一个问题，原因是编程式导航只传递一个参数的时候，返回的是一个promise对象，所以我们需要解决这个问题，所以我们可以重新定义push和replace，在new VueRouter
      // 结构赋值
      const { searchText } = this
      /*  // 第一种方法判断params参数有没有
      //判断“/”，searchText的内容是不是为空，为空的话则不加“/”，
      const params = searchText ? `/${searchText}` : ``
      const location = `/search` + params */

      // 第二种方法判断params参数有没有，使用命名路由的方法
      const location = {
        name: 'search',
      }
      if (searchText) {
        location.params = {
          searchText,
        }
      }

      //判断query有没有
      const { categoryName } = this.$route.query
      if (categoryName) {
        location.query = this.$route.query
      }

      this.$router.push(location)
    },
  },
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 30px;
  background-color: #eaeaea;
}
.header-top {
  width: 1200px;
  height: 30px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.header-top a:hover {
  color: pink;
  text-decoration: none;
}

.header-login-list {
  display: flex;
  align-items: center;
}
.header-login-list p {
  margin: 0 10px 0 0;
}
.header-login-list a.register {
  margin: 0 0 0 5px;
  padding: 0 0 0 5px;
  border-left: 1px solid #ccc;
}
.header-type-list ul {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.header-type-list ul li a {
  margin: 0 5px;
  padding: 0 0 0 5px;
  border-left: 1px solid #ccc;
}
.header-type-list ul li a.first {
  border-left: none;
}
.header-bottom {
  width: 1200px;
  height: 67px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 0 11px 0;
}
.header-bottom .header-img {
  width: 176px;
  height: 56px;
  // line-height: 56px;
}
.header-bottom .header-input {
  display: flex;
  align-items: center;
}
.header-input .header-text {
  width: 490px;
  height: 32px;
  border: 2px solid #ea4a36;
  outline: none;
  box-sizing: border-box;
}
.header-input .header-button {
  width: 68px;
  height: 32px;
  background-color: #ea4a36;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
