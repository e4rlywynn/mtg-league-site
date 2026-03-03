import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Seasons from '../pages/Seasons.vue'
import Blog from '../pages/Blog.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/seasons', component: Seasons },
  { path: '/blog', component: Blog },
  { path: '/announcement', redirect: '/blog' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
