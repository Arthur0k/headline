import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import '@/styles/base.css'
import '@/styles/iconfont.css'
import 'amfe-flexible'

// import { Button, Form } from 'vant'
import AkHeader from 'components/AkHeader'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.prototype.$axios = axios
console.log(axios)
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)
// Vue.use(Button)
// Vue.use(Form)

Vue.component('ak-header', AkHeader)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
