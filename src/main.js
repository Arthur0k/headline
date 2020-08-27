import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/base.css'
import '@/styles/iconfont.css'
import 'amfe-flexible'

import { Button } from 'vant'

Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
