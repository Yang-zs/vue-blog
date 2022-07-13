import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
import tagsview from './modules/tagsview'
import telescoping from './modules/telescoping'
Vue.use(Vuex)
export default new Vuex.Store({
  getters,
  modules: {
    user,
    tagsview,
    telescoping
  }
})
