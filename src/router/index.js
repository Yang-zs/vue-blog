import Vue from 'vue'
import VueRouter from 'vue-router'
import { getItem } from '../utils/storage'
Vue.use(VueRouter)

const publicPath = []
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/console',
    component: () => import('../layout'),
    children: [
      {
        path: '/console',
        name: 'console',
        component: () => import('../views/console'),
        meta: { title: '控制台' }
      }
    ]
  },
  {
    path: '/sys',
    name: 'home',
    redirect: '/console',
    component: () => import('../layout'),
    children: [
      {
        path: '/sys/users',
        name: 'users',
        component: () => import('../views/sys/users.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: '/sys/menus',
        name: 'menus',
        component: () => import('../views/sys/menus.vue'),
        meta: { title: '菜单管理' }
      },
      {
        path: '/sys/roles',
        name: 'roles',
        component: () => import('../views/sys/roles.vue'),
        meta: { title: '角色管理' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') return next()
  const tokenStr = getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
