import { useRoute } from 'vue-router'
import { computed, defineAsyncComponent } from 'vue'

export const TEMPLATES = {
  landing: defineAsyncComponent(() => import('../templates/LandingTemplate.vue')),
  document: defineAsyncComponent(() => import('../templates/DocumentTemplate.vue'))
}

export default function useRouteTemplate () {
  const route = useRoute()
  return computed(() => TEMPLATES[route?.meta.template] ?? TEMPLATES.landing)
}