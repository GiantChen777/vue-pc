// 在这里请求数据，发送axios
import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors } from '@api/home'

export default {
  state: {
    categoryList: [], //这个是home组件三级列表的初始化响应式数据
    banners: [],//首页轮播图数据,
    floors: []  //首页楼层数据
  },
  getters: {},
  actions: {
    // 异步发送axios请求数据，所以需要在在这里定义数据
    async getCategoryList ({ commit }) {
      // 调用reqGetBaseCategoryList发送请求，获取得到数据，
      const categoryList = await reqGetBaseCategoryList()
      // 然后调用commit方法，将数据给到mutations，并且将数据也给到mutations
      commit("GET_CATEGORY_LIST", categoryList)
    },
    // 请求轮播图数据banners,banners就是我们的轮播图数据
    // 请求到我们的数据，然后去轮播图页面引入我们所需要的数据，这里只是操作我们的数据，去ListContainer.vue文件中导入数据
    async getGetBanners ({ commit }) {
      const banners = await reqGetBanners()
      commit("GET_GETBANNERS", banners)
    },
    // 请求首页楼层电器数据
    async reqGetFloors ({ commit }) {
      const floors = await reqGetFloors()
      commit("REQ_GETFLOORS", floors)
    }

  },
  mutations: {
    GET_CATEGORY_LIST (state, categoryList) {
      state.categoryList = categoryList
    },
    GET_GETBANNERS (state, banners) {
      state.banners = banners
    },
    REQ_GETFLOORS (state, floors) {
      state.floors = floors
    }
  }
}