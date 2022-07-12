import request from '@/utils/request'
const getCaptcha = () => {
  return request({
    url: '/captcha',
    method: 'GET'
  })
}

const login = (data) => {
  return request({
    url:
      '/login?username=' +
      data.username +
      '&password=' +
      data.password +
      '&code=' +
      data.code +
      '&token=' +
      data.token,
    method: 'POST',
    data
  })
}

const getNav = () => {
  return request({
    url: '/menu/nav',
    method: 'GET'
  })
}

const logout = () => {
  return request({
    url: '/sys/logout',
    method: 'POST'
  })
}

export default {
  getCaptcha,
  login,
  getNav,
  logout
}
