import { Router } from 'vue-router'


export default function scrollHandler (router: Router): void {
  router.afterEach((to, from) => {
    if (to.name !== from.name) {
      document.body.scrollTo({ top: 0, behavior: 'instant' })
    }
  })
}