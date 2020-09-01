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
const UserEdit = () => import('views/UserEdit')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/user', name: 'user', component: User },
  { path: '/user-edit', name: 'user-edit', component: UserEdit }
]

const router = new VueRouter({
  routes
})

const authorizationName = ['user', 'user-edit']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (token || !authorizationName.includes(to.name)) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
