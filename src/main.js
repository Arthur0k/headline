import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '@/styles/base.css'
import '@/styles/iconfont.css'
import 'amfe-flexible'

// import { Button, Form } from 'vant'
import AkHeader from 'components/AkHeader'
import AKNavItem from 'components/AkNavItem'
import Vant from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.prototype.$axios = axios

// 全局过滤器
Vue.filter('time', value => {
  return moment(value).format('YYYY-MM-DD')
})

axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)
// Vue.use(Button)
// Vue.use(Form)

Vue.component('ak-header', AkHeader)
Vue.component('ak-nav-item', AKNavItem)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
