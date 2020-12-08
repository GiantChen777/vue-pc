<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked === 1"
              @change="checkCartItem(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button
              href="javascript:void(0)"
              class="mins"
              @click="addNum(item.skuId, -1)"
              :disabled="item.skuNum === 1"
            >
              -
            </button>
            <!-- 给input绑定失去焦点事件，发送请求 -->
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @blur="update(item.skuId, item.skuNum, $event)"
            />
            <!-- 定义一个加减数量的方法，需要发送请求，接收传参 -->
            <button
              href="javascript:void(0)"
              class="plus"
              @click="addNum(item.skuId, 1)"
              :disabled="item.skuNum === 10"
            >
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum * item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delList(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ShopCart',
  computed: {
    ...mapState({
      cartList: (state) => state.shotcart.cartList,
      // 在计算属性中监视cartList数据库中购物车的变化，因为cartList是一个数组，一旦发生变化，我们的商品总数就会发送变化
      // 商品总数
      total() {
        return this.cartList
          .filter((item) => {
            return item.isChecked === 1
          })
          .reduce((p, c) => {
            return p + c.skuNum
          }, 0)
      },
      // 选中商品总价格
      // 这一步操作完，然后定义加减方法，发送请求，改变数量，首先先定义moudel请求的方法
      totalPrice() {
        return this.cartList
          .filter((item) => {
            return item.isChecked === 1
          })
          .reduce((p, c) => {
            return p + c.skuNum * c.skuPrice
          }, 0)
      },
    }),
  },
  methods: {
    ...mapActions(['getCartList', 'UpdateCartCount', 'gelCart']),
    // 调用actions方法更新商品数据并且重新刷新页面，
    addNum(skuId, skuNum) {
      this.UpdateCartCount({ skuId, skuNum })
    },
    // 删除选中的数据
    delList(skuId) {
      if (window.confirm(`您确认删除的是这个数据嘛？`)) {
        this.gelCart(skuId)
      }
    },
    /*  // 清空去掉里面所有的非数字的函数
    formatskuNum(e) {
      let skuNum = +e.target.value.replace(/\D+/g, '')
      if (skuNum < 1) {
        // 商品数量不能小于1
        skuNum = 1
      } else if (skuNum > 10) {
        // 商品数量不能大于库存
        skuNum = 10
      }
      e.target.value = skuNum
      e.target.value = skuNum
      // this.cartList.find((item) => item.skuId === skuId).skuNum = skuNum
    }, */
    // 更改input里面的数字，失去焦点的时候发送请求
    update(skuId, skuNum, e) {
      this.UpdateCartCount({ skuId, skuNum: e.target.value - skuNum })
    },
    // 更新数据库里面的单选选中状态
    async checkCartItem(item) {
      // 获取数据
      const skuId = item.skuId
      const isChecked = item.isChecked === 1 ? '0' : '1'
      console.log(skuId, isChecked)
      try {
        // 获取数据之后发送请求
        await this.$store.dispatch('UpdateCartCheck', {
          skuId,
          isChecked,
        })

        //  如果成功了，重新获取购物车数据显示
        this.$store.dispatch('getCartList')
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getCartList()
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>