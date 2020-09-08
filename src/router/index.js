import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = () => import('views/Login')
const user = () => import('views/User')
const register = () => import('views/Register')
const userEdit = () => import('views/UserEdit')

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: login },
  { path: '/register', name: 'register', component: register },
  { path: '/user', name: 'user', component: user },
  { path: '/user-edit', name: 'user-edit', component: userEdit }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const authorizations = ['user', 'user-edit']
  if (token || !authorizations.includes(to.name)) {
    next()
  } else {
    router.push('/login')
  }
})

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(...args) {
  originPush.apply(this, args).catch(err => err)
}

export default router
