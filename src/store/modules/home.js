// 在这里请求数据，发送axios
import { reqGetBaseCategoryList, reqGetBanners, reqGetFloors, reqGetChen, reqGetTian, reqGetFu, reqGetbrand, reqgetBanner, reqgetZong } from '@api/home'

export default {
  state: {
    categoryList: [], //这个是home组件三级列表的初始化响应式数据
    banners: [],//首页轮播图数据,
    floors: [],  //首页楼层数据
    chen: [],//首页今日排行数据
    tian: [],//首页热卖排行数据
    fu: [],//首页猜你喜欢数据
    brand: [],//首页图标数据
    banner: [],//首页尚品汇快报的数据
    zong: [],//首页尚品汇快报图标的数据
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
    async getFloors ({ commit }) {
      const floors = await reqGetFloors()
      commit("REQ_GETFLOORS", floors)
    },
    // 请求今日推荐的数据
    async getChen ({ commit }) {
      const chen = await reqGetChen()
      commit('GET_CHEN', chen)
    },
    // 热卖排行
    async getTian ({ commit }) {
      const tian = await reqGetTian()
      commit("GET_TIAN", tian)
    },
    // c猜你喜欢数据
    async getFu ({ commit }) {
      const fu = await reqGetFu()
      commit("GET_FU", fu)
    },
    //首页图标的数据
    async getbrand ({ commit }) {
      const brand = await reqGetbrand()
      commit("GET_BRAND", brand)
    },
    // 首页尚品汇快报的数据
    async getBanner ({ commit }) {
      const banner = await reqgetBanner()
      commit("GET_BANNER", banner)
    },
    // 定义尚品汇图标的数据
    async getZong ({ commit }) {
      const zong = await reqgetZong()
      commit("GET_ZONG", zong)
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
    },
    GET_CHEN (state, chen) {
      state.chen = chen
    },
    GET_TIAN (state, tian) {
      state.tian = tian
    },
    GET_FU (state, fu) {
      state.fu = fu
    },
    GET_BRAND (state, brand) {
      state.brand = brand
    },
    GET_BANNER (state, banner) {
      state.banner = banner
    },
    GET_ZONG (state, zong) {
      state.zong = zong
    }
  }
}