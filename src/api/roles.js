import request from '@/utils/request'
const getRolesList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
// 当前登录用户的菜单
const getRoleInfo = (id) => {
  return request({
    url: `/role/info/${id}`,
    method: 'GET'
  })
}

const getMenuNav = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}

export default {
  getRolesList,
  getRoleInfo,
  getMenuNav
}
