import Vue from 'vue'
import axios from 'axios'
import router from '@/router'

const URL = '/api'
Vue.prototype.$axios = axios
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return URL + url
  }
}
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.authorization = token
    }
    return config
  },
  err => err
)

axios.interceptors.response.use(
  res => {
    const { message, statusCode } = res.data
    if (statusCode === 401 || message === '用户验证信息失败') {
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      router.push('/login')
    }
    return res
  },
  err => err
)
