import Vue from 'vue'
import { Toast } from 'vant'
import VueRouter from 'vue-router'
// 处理重复导航问题

Vue.use(VueRouter)

const Login = () => import('views/user/Login')
const Register = () => import('views/user/Register')
const User = () => import('views/user/User')
const UserEdit = () => import('views/user/UserEdit')
const MyComment = () => import('views/user/MyComment')
const MyFollow = () => import('views/user/MyFollow')
const MyCollect = () => import('views/user/MyCollect')
const Index = () => import('views/index/Index')
const Detail = () => import('views/index/Detail')
const Manage = () => import('views/index/Manage')
const Search = () => import('views/index/Search')

const routes = [
  { path: '/', name: 'index', alias: '/index', component: Index },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/user', name: 'user', component: User },
  { path: '/user-edit', name: 'user-edit', component: UserEdit },
  { path: '/mycomment', name: 'myComment', component: MyComment },
  { path: '/myfollow', name: 'myfollow', component: MyFollow },
  { path: '/mycollect', name: 'mycollect', component: MyCollect },
  { path: '/post-detail/:id', name: 'detail', component: Detail },
  { path: '/manage', name: 'manage', component: Manage },
  { path: '/search', name: 'search', component: Search }
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
    Toast('登录信息失效, 请重新登录')
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default router
