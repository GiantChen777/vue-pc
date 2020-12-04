<template>
  <div>
    <div class="login">
      <div class="login-center">
        <div class="login-warp">
          <div class="login-from">
            <ul class="tab-clearFix">
              <li>
                <a href="##" style="border-right: 0">扫描登录</a>
              </li>
              <li>
                <a href="##" class="current">账户登录</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottem">
        <div class="footer-ul">
          <ul>
            <li>
              <a href="###">关于我们</a>
            </li>
            <li>
              <a href="###">联系我们</a>
            </li>
            <li>
              <a href="###">联系客服</a>
            </li>
            <li>
              <a href="###">商家入驻</a>
            </li>
            <li>
              <a href="###">营销中心</a>
            </li>
            <li>
              <a href="###">手机尚品汇</a>
            </li>
            <li>
              <a href="###">尚品汇社区</a>
            </li>
            <li>
              <a href="###">关于我们</a>
            </li>
          </ul>
        </div>
        <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
        <div class="beian">京ICP备19006430号</div>
      </div>
    </div>
    <el-button type="danger" @click="login">登录</el-button>
    
  </div>
</template>

<script>
import { reqLogin } from '@api/user'

export default {
  name: 'Login',
  methods: {
    login() {
      // 在这之前需要定义接口api，然后才可以发送axios请求
      // 调用这个函数，发送axios请求，请求数据
      reqLogin('13700000000', '11111111')
        .then((res) => {
          console.log('res', res)
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
  },
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 487px;
  border: 1px solid pink;
}
.login-center {
  height: 487px;
  background-color: #e93854;
}
.login-center .login-warp {
  width: 1200px;
  height: 100%;
  background: url('./images/loginbg.png') no-repeat;
  margin: 0 auto;
  // border: 1px solid black;
}
.login-center .login-warp .login-from {
  width: 420px;
  height: 406px;
  padding: 20px 20px 0 20px;
  margin-top: 30px;
  // border: 1px solid yellow;
  float: right;
}
.login-from .tab-clearFix {
  width: 400px;
  height: 366px;
  // border: 1px solid pink;
  margin: 10px;
  display: flex;
  text-align: center;
  background-color: #fff;
}
.login-from .tab-clearFix li {
  width: 200px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #e4e4e4;
}
.login-from .tab-clearFix li a {
  font-size: 20px;
  text-decoration: none;
  font-weight: 600;
}
.login-from .tab-clearFix li:nth-child(2) a {
  color: red;
}
.footer-bottem {
  width: 1200px;
  margin: 0 auto;
}
.footer-ul ul {
  height: 54px;
  line-height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-ul ul li {
  padding: 0 20px;
  margin: 15px 0;
  height: 24px;
  line-height: 24px;
  border-right: 1px solid black;
  a:hover {
    text-decoration: none;
    color: pink;
  }
}
.address {
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 5px 0;
}
.beian {
  height: 24px;
  line-height: 24px;
  text-align: center;
}
</style>
