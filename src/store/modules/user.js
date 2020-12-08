// 定义请求去跳转到login页面
import { reqRegister, reqLogin, reqGetLogout } from "@api/user"

export default {
  state: {
    name: localStorage.getItem("name") || "",
    token: localStorage.getItem("token") || "",
  },
  getters: {},
  actions: {
    async register ({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code })
      console.log(commit)
    },
    async login ({ commit }, { phone, password }) {
      const user = await reqLogin({ phone, password })
      commit("LOGIN", user)
    },
    async loginout ({ commit }) {
      await reqGetLogout()
      commit("LOG_INOUT")
    }
  },
  mutations: {
    LOGIN (state, user) {
      state.name = user.name,
        state.token = user.token
    },
    LOG_INOUT (state) {
      state.name = '',
        state.token = ''
    }
  },
}