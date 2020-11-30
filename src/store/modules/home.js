// 在这里请求数据，发送axios
import { reqGetBaseCategoryList } from '@api/home'

export default {
  state: {
    categoryList: []  //这个是home组件三级列表的初始化响应式数据
  },
  getters: {},
  actions: {
    // 异步发送axios请求数据，所以需要在在这里定义数据
    async getCategoryList ({ commit }) {
      // 调用reqGetBaseCategoryList发送请求，获取得到数据，
      const categoryList = await reqGetBaseCategoryList()
      // 然后调用commit方法，将数据给到mutations，并且将数据也给到mutations
      commit("GET_CATEGORY_LIST", categoryList)
    }
  },
  mutations: {
    GET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    }
  }
}