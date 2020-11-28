<template>
  <div class="footer">
    <div class="footer-list">
      <div class="footer-first">
        <ul>
          <h4>购物指南</h4>
          <li>购物流程</li>
          <li>会员介绍</li>
          <li>生活旅行/团购</li>
          <li>常见问题</li>
          <li>购物指南</li>
        </ul>
      </div>
      <div class="footer-two">
        <ul>
          <h4>配送方式</h4>
          <li>上门自提</li>
          <li>211限时达</li>
          <li>配送服务查询</li>
          <li>配送费收取标准</li>
          <li>海外配送</li>
        </ul>
      </div>
      <div class="footer-three">
        <ul>
          <h4>支付方式</h4>
          <li>货到付款</li>
          <li>在线支付</li>
          <li>分期付款</li>
          <li>邮局汇款</li>
          <li>公司转账</li>
        </ul>
      </div>
      <div class="footer-four">
        <ul>
          <h4>售后服务</h4>
          <li>售后政策</li>
          <li>价格保护</li>
          <li>退款说明</li>
          <li>返修/退换货</li>
          <li>取消订单</li>
        </ul>
      </div>
      <div class="footer-five">
        <ul>
          <h4>特色服务</h4>
          <li>夺宝岛</li>
          <li>DIY装机</li>
          <li>延保服务</li>
          <li>尚品汇E卡</li>
          <li>尚品汇通信</li>
        </ul>
      </div>
      <div class="footer-six">
        <ul>
          <h4>帮助中心</h4>
          <img src="./images/wx_cz.jpg" />
        </ul>
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
</template>

<script>
export default {
  name: 'Footer',
}
</script>
<style lang="less" scoped>
.footer {
  background-color: #ccc;
}
.footer-list {
  width: 1200px;
  height: 208px;
  display: flex;
  padding: 20px 20px 20px 40px;
  margin: 0 auto;
  justify-content: space-around;
}
.footer-list div {
  width: 190px;
}
.footer-list div ul h4 {
  width: 100%;
  height: 18px;
  font-size: 14px;
}
.footer-list div ul li {
  width: 100%;
  height: 18px;
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
