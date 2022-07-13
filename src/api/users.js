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

export default {
  getUserList,
  addUserInfo,
  removeUser
}
