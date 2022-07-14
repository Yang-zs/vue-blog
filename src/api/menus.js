import request from '@/utils/request'
const getMenuList = () => {
  return request({
    url: '/menu/list',
    method: 'GET'
  })
}
export default {
  getMenuList
}
