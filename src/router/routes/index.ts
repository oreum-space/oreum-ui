import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Landing',
    component: () => import('../../pages/LandingPage.vue'),
    path: '/',
    meta: {
      template: 'landing'
    }
  },
  {
    name: 'Setup',
    component: () => import('../../pages/SetupPage.vue'),
    path: '/setup',
    meta: {
      template: 'document'
    }
  }
]

export default routes