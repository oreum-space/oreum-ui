import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

export const TEMPLATES = {
  landing: defineAsyncComponent(() => import('../templates/LandingTemplate.vue'))
}

export default function useRouteTemplate () {
  return TEMPLATES[useRoute().meta.template] ?? TEMPLATES.landing
}