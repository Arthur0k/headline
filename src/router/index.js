import Vue from 'vue'
import VueRouter from 'vue-router'
// 处理重复导航问题

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const Login = () => import('views/Login')
const Register = () => import('views/Register')
const User = () => import('views/User')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/user', name: 'user', component: User }
]

const router = new VueRouter({
  routes
})

router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (token || to.name !== 'user') {
    next()
  } else {
    router.push('/login')
  }
})

export default router
