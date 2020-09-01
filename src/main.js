import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 基础样式
import '@/styles/base.css'
import '@/styles/iconfont.css'
// 响应式布局
import 'amfe-flexible'
// 请求相关
import 'utils/request'
// vant
import 'utils/vant'
// 全局组件和过滤器
import 'utils/global'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
