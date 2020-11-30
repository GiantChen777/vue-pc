import Vue from "vue";
import Vuex from "vuex"
import modules from "./modules"

// 安装使用
Vue.use(Vuex)

const state = {}

const getters = {}

const actions = {}

const mutations = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})