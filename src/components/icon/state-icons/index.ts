import { defineAsyncComponent } from 'vue'

export const stateIcons = [
  {
    name: 'shown',
    component: defineAsyncComponent(() => import('./OIconShown.vue')),
    large: false
  },
  {
    name: 'accordion',
    component: defineAsyncComponent(() => import('./OIconAccordion.vue')),
    large: true
  }
] as const

export const STATE_ICONS = stateIcons.map(stateIcon => stateIcon.name)
export const LARGE_STATE_ICONS = stateIcons.filter(stateIcon => stateIcon.large).map(stateIcon => stateIcon.name)
