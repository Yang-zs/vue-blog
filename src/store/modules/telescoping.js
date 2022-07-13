import users from '@/api/users'
export default {
  namespaced: true,
  state: {
    collapse: false
  },
  mutations: {
    changeCollapse(state) {
      state.collapse = !state.collapse
    }
  },
  actions: {
    setCollapse({ commit }) {
      commit('changeCollapse')
    }
  }
}
