import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import 'assets/css/iconfont'
// vant
import { Button, Form, Field, Toast, Dialog, RadioGroup, Radio, Cell, CellGroup } from 'vant'
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)

Vue.config.productionTip = false
// axios
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.prototype.$axios = axios
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    config.headers.authorization = token
    return config
  },
  err => err
)
axios.interceptors.response.use(
  res => {
    const { statusCode, message } = res.data
    if (statusCode === 401 || message === '用户名或密码错误') {
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      router.push('/login')
    }
    return res
  },
  err => err
)

// components
const KtHeader = () => import('components/KtHeader')
Vue.component('kt-header', KtHeader)

// filter
Vue.filter('time', value => {
  return moment(value).format('YYYY-MM-DD')
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
