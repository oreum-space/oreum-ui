import components from '@/routes/components.ts'
import { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/VHome.vue')
  },
  {
    name: 'PageNotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/VPageNotFound.vue'),
    meta: {
      title: `404 | ${ import.meta.env.VITE_DEFAULT_TITLE }`
    }
  },
  components
]

export default routes
