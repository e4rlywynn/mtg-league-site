import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Seasons from '../pages/Seasons.vue'
// import About from '../pages/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/seasons', component: Seasons },
//   { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
