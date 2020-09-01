import Vue from 'vue'
import AkHeader from 'components/AkHeader'
import AKNavItem from 'components/AkNavItem'
import moment from 'moment'

// 全局注册组件
Vue.component('ak-header', AkHeader)
Vue.component('ak-nav-item', AKNavItem)
// 全局过滤器
Vue.filter('time', value => {
  return moment(value).format('YYYY-MM-DD')
})
