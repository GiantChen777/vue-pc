<template>
  <div class="register-page">
    <div class="register"></div>
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
</template>

<script>
export default {
  name: 'Regieter',
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.register {
  width: 1200px;
  height: 487px;
  border: 1px solid pink;
  margin: 0 auto;
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
