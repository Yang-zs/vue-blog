import { setItem, getItem, removeItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    tagsView: []
  },
  mutations: {
    setTagsView(state, tagsView) {
      const data = state.tagsView.find((item) => item.path === tagsView.path)
      if (!data) {
        state.tagsView.push(tagsView)
      }
    },
    removeTagItem(state, index) {
      state.tagsView.splice(index, 1)
      setItem('tagsview', state.tagsView)
    }
  },
  actions: {}
}
