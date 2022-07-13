import { setItem, getItem } from '@/utils/storage'
import LoginApi from '../../api/login'
import UserApi from '../../api/users'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    navList: getItem('menus') || [],
    userInfo: getItem('userInfo') || {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setNavList(state, menus) {
      state.navList = menus
      setItem('menus', menus)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', state.userInfo)
    }
  },
  actions: {
    // 验证码
    async getCaptcha() {
      const { captchaImg, token } = await LoginApi.getCaptcha()
      return { captchaImg, token }
    },
    // 登录
    async loginOperation({ commit }, loginForm) {
      const response = await LoginApi.login(loginForm)
      if (!response) return
      commit('setToken', response)
      return response
    },
    async getNav({ commit }) {
      const { menus } = await LoginApi.getNav()
      commit('setNavList', menus)
    },
    // 获取用户信息
    async getUSerInfo({ commit }) {
      const res = await LoginApi.getUSerInfo()
      console.log(res, '用户信息')
      if (!res) return
      commit('setUserInfo', res)
    },
    async addUserInfo({ commit }, addForm) {
      const response = UserApi.getUSerInfo(addForm)
      console.log(response, '添加结果')
      return response
    }
  }
}
