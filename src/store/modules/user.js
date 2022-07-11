import { setItem, getItem } from '@/utils/storage'
import LoginApi from '../../api/login'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    navList: getItem('menus') || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setNavList(state, menus) {
      state.navList = menus
      setItem('menus', menus)
    }
  },
  actions: {
    async getCaptcha() {
      const { captchaImg, token } = await LoginApi.getCaptcha()
      return { captchaImg, token }
    },
    async loginOperation({ commit }, loginForm) {
      const response = await LoginApi.login(loginForm)
      if (!response) return
      commit('setToken', response)
      return response
    },
    async getNav({ commit }) {
      const { menus } = await LoginApi.getNav()
      commit('setNavList', menus)
    }
  }
}
