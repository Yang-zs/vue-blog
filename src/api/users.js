import request from '@/utils/request'
// 获取列表数据
const getUserList = (data) => {
  return request({
    url: `/user/list?current=${data.current}&size=${data.size}&username=${data.username}`,
    method: 'GET'
  })
}
// 用户列表添加
const addUserInfo = (data) => {
  return request({
    url: '/user/add',
    method: 'POST',
    data
  })
}

// 删除用户
const removeUser = (data) => {
  return request({
    url: '/user/del',
    method: 'POST',
    data
  })
}
// 获取单个用户信息
const getAloneUserInfo = (id) => {
  return request({
    url: `user/userInfo/${id}`,
    method: 'GET'
  })
}
// 更新用户信息
const updataUserInfo = (data) => {
  return request({
    url: '/user/update',
    method: 'PUT',
    data
  })
}
// 分配权限
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}
// 获取角色列表
const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}

export default {
  getUserList,
  addUserInfo,
  removeUser,
  getAloneUserInfo,
  updataUserInfo,
  updateRole,
  getRoleList
}
