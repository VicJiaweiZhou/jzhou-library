import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const AboutView = () => import('../views/AboutView.vue') // lazy-loaded

import FirebaseSigninView from '../views/FirebaseSigninView.vue'

import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/about', name: 'About', component: AboutView },
    { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView } ,
    { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView }
  ]
})

export default router
