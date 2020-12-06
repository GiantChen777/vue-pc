import { reqGetCartList, reqUpdateCartCount } from "@api/shotcart"
export default {
  state: {
    cartList: []   //购物车所有的数据
  },
  getters: {},
  actions: {
    // 定义请求所有的购物车的数据
    async getCartList ({ commit }) {
      const cartList = await reqGetCartList()
      commit('GET_CARTLIST', cartList)
    },
    // 定义加入购物车的方法，添加或者删除购物车的方法堵在这个方法中
    async UpdateCartCount ({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum)
      commit("UPDATE_CARTCOUNT", { skuId, skuNum })
    },
  },
  mutations: {
    GET_CARTLIST (state, cartList) {
      state.cartList = cartList
    },
    UPDATE_CARTCOUNT (state, { skuId, skuNum }) {
      // 判断点击的是不是给skuId一样的商品，给之进行更新商品数量，
      state.cartList = state.cartList.map((item) => {
        if (item.skuId === skuId) {
          item.skuNum += skuNum
        }
        return item
      })
    }
  }
}