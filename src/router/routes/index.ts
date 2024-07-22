import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Landing',
    component: () => import('../../pages/LandingPage.vue'),
    path: '/'
  }
]

export default routes