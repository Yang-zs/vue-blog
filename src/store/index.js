import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import userlist from './modules/userlist'
import tagsview from './modules/tagsview'
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    userlist,
    tagsview
  }
})
