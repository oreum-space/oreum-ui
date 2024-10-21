import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'Landing',
    component: () => import('@/pages/LandingPage.vue'),
    path: '/',
    meta: {
      template: 'landing'
    }
  },
  {
    name: 'Setup',
    component: () => import('@/pages/SetupPage.vue'),
    path: '/setup',
    meta: {
      template: 'document'
    }
  },
  {
    name: 'Button',
    component: () => import('@/pages/button/ButtonPage.vue'),
    path: '/button',
    meta: {
      template: 'document'
    }
  },
  {
    name: 'Collapse',
    component: () => import('@/pages/collapse/CollapsePage.vue'),
    path: '/collapse',
    meta: {
      template: 'document'
    }
  },
  {
    name: 'Icon',
    component: () => import('@/pages/icon/IconPage.vue'),
    path: '/icon',
    meta: {
      template: 'document'
    }
  },
  {
    name: 'Tabs',
    component: () => import('@/pages/tabs/TabsPage.vue'),
    path: '/tabs',
    meta: {
      template: 'document'
    }
  }
]

export default routes
