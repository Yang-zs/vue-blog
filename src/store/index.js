import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import userlist from './modules/userlist'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    userlist
  }
})
