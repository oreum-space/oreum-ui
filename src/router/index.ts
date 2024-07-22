import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

declare module 'vue-router' {
  interface RouteMeta {
    template?: 'landing' | 'document'
  }
}

export default createRouter({
  routes,
  history: createWebHistory()
})