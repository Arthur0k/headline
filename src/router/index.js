import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('views/Login')
const Register = () => import('views/Register')
const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

export default router
