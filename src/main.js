import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/base.css'

// import Vant from 'vant'
// import 'vant/lib/index.css'
import { Button } from 'vant'

Vue.use(Button)
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
