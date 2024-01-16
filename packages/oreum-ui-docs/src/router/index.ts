import scrollHandler from '@/router/scrollHandler.ts'
import titleHandler from '@/router/titleHandler.ts'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

import routes from '@/routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

titleHandler(router)
scrollHandler(router)

export default router
