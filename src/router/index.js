import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
        component: () => import('../views/sys/users.vue')
        // meta: { title: '用户管理' }
      },
      {
        path: '/sys/menus',
        name: 'menus',
        component: () => import('../views/sys/menus.vue')
        // meta: { title: '用户管理' }
      },
      {
        path: '/sys/roles',
        name: 'roles',
        component: () => import('../views/sys/roles.vue')
        // meta: { title: '用户管理' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
