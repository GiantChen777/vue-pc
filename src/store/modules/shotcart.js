import { reqGetCartList, reqUpdateCartCount, reqDelCart, reqUpdateCartCheck } from "@api/shotcart"
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
    // 定义加入购物车的方法，添加或者减少购物车的方法堵在这个方法中
    async UpdateCartCount ({ commit }, { skuId, skuNum }) {
      await reqUpdateCartCount(skuId, skuNum)
      commit("UPDATE_CARTCOUNT", { skuId, skuNum })
    },
    // 定义删除购物车数据的方法
    async gelCart ({ commit }, skuId) {
      await reqDelCart(skuId)
      commit("GEL_CART", skuId)
    },
    // 定义切换商品选中状态
    // skuId: 商品的ID
    // isChecked: 商品选中状态, '0'代表不选中, '1'代表选中
    async UpdateCartCheck ({ commit }, { skuId, isChecked }) {
      console.log(skuId, isChecked)
      await reqUpdateCartCheck(skuId, isChecked)
      //  commit("UPDATE_CARTCHECK", { skuId, isChecked })
      console.log(commit)
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
    },
    GEL_CART (state, skuId) {
      state.cartList = state.cartList.filter((item) => {
        return item.skuId !== skuId
      })
    },
    /*      UPDATE_CARTCHECK (state, { skuId, isChecked }) {
              state.cartList = state.cartList.map((item) => {
                if (item.skuId === skuId) {
                  item.isChecked = isChecked
                }
                return item
              })
        }  */
  }
}