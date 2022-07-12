// 导入axios
import axios from 'axios'
import { getItem } from './storage'
import loading from './loading'
// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    loading.open()
    const token = getItem('token')
    if (token) {
      console.log(token, token)
      config.headers.token = token
      console.log(config)
    }
    return config
  },
  (error) => {
    loading.close()
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    loading.close()
    if (response.data.code === 200) {
      return response.data.data
    }
  },
  (error) => {
    loading.close()
    return Promise.reject(error)
  }
)

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

// 导出axios实例对象
export default request
