import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../pages/Home.vue'
import Tournaments from '../pages/Tournaments.vue'
// import Leaderboard from '../pages/Leaderboard.vue'
// import About from '../pages/About.vue'

const routes = [
//   { path: '/', component: Home },
  { path: '/tournaments', component: Tournaments },
//   { path: '/leaderboard', component: Leaderboard },
//   { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
