import type { RouteRecordRaw } from 'vue-router'

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
      title: '404 | Oreum UI'
    }
  },
  {
    name: 'Components',
    path: '/components',
    children: <Array<RouteRecordRaw>>[
      {
        name: 'Button',
        path: '/button'
      }
    ],
    component: () => import('@/views/VComponents.vue')
  }
]

export default routes
