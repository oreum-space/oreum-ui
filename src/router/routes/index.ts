import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Landing',
    component: () => import('../../pages/LandingPage.vue'),
    path: '/',
    meta: {
      template: 'landing'
    }
  }
]

export default routes