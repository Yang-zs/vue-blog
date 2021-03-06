const getters = {
  token: (state) => state.user.token,
  navList: (state) => state.user.navList,
  tagsview: (state) => state.tagsview.tagsView,
  userInfo: (state) => state.user.userInfo,
  collapse: (state) => state.telescoping.collapse,
  permission: (state) => state.user.permission
}

export default getters
