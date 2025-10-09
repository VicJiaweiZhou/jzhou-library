import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'

const AboutView = () => import('../views/AboutView.vue') // lazy-loaded

import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/about', name: 'About', component: AboutView },
    { path: '/Login', name: 'Login', component: FirebaseSigninView },  
    { path: '/Register', name: 'Register', component: FirebaseRegisterView },
    { path: '/addbook', name: 'AddBook', component: AddBookView },
    { path: '/GetBookCount', name: 'GetBookCount', component: GetBookCountView}
  ]
})

export default router
