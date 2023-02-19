import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'profile',
        component: () => import('@/views/profile')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'videos',
        component: () => import('@/views/videos')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path:'/edit',
    component:() => import('@/views/eidt')
  },
  {
    path:'/search',
    component:() => import('@/views/search')
  },
  {
    path:'/detail',
    name:'arDetail',
    component:() => import('@/views/arDedail')
  }

]

const router = new VueRouter({
  routes
})

export default router
