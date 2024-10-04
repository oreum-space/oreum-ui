import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

declare module 'vue-router' {
  interface RouteMeta {
    template?: 'landing' | 'document'
  }
}

export default createRouter({
  routes,
  history: createWebHistory()
})
