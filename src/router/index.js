import { createRouter, createWebHistory } from 'vue-router'
import ToDoListView from '@/views/ToDoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDoListView
    }
  ]
})

export default router
