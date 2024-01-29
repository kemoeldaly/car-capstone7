import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase'

import CarSpecs from '../components/CarSpecs.vue'
import Recalls from '../components/Recalls.vue'
import Landing from '../components/Landing.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/CarSpecs',
    name: 'Carspecs',
    component: CarSpecs,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Recalls',
    name: 'Recalls',
    component: Recalls,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  } 


  next()
})

export default router;
