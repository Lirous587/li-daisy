import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/HomeView.vue'
import AvartarView from '../views/AvatarView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: AvartarView,
    },
  ],
})

export default router
