import { Router } from 'vue-router'

const title = <HTMLTitleElement>document.querySelector('title')

export default function titleHandler (router: Router): void {
  router.beforeEach((to) => {
    const titleText = to.meta.title || import.meta.env.VITE_DEFAULT_TITLE

    if (titleText !== title.innerText) {
      title.innerText = titleText
    }
  })
}