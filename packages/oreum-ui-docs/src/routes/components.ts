import { RouteRecordRaw } from 'vue-router'

function name ([name]: TemplateStringsArray) {
  return `Components${ name }` as const
}

export default <RouteRecordRaw>{
  name: name``,
  path: '/components',
  component: () => import('@/views/VComponents.vue'),
  children: <Array<RouteRecordRaw>>[
    {
      path: 'accordion',
      name: name`Accordion`,
      component: () => import('@/views/components/VComponentsAccordion.vue')
    },
    {
      path: 'avatar',
      name: name`Avatar`,
      component: () => import('@/views/components/VComponentsAvatar.vue')
    },
    {
      path: 'button',
      name: name`Button`,
      component: () => import('@/views/components/VComponentsButton.vue')
    },
    {
      path: 'card',
      name: name`Card`,
      component: () => import('@/views/components/VComponentsCard.vue')
    },
    {
      path: 'checkbox',
      name: name`Checkbox`,
      component: () => import('@/views/components/VComponentsCheckbox.vue')
    },
    {
      path: 'dialog',
      name: name`Dialog`,
      component: () => import('@/views/components/VComponentsDialog.vue')
    },
    {
      path: 'divider',
      name: name`Divider`,
      component: () => import('@/views/components/VComponentsDivider.vue')
    },
    {
      path: 'icon',
      name: name`Icon`,
      component: () => import('@/views/components/VComponentsIcon.vue')
    },
    {
      path: 'input-text',
      name: name`InputText`,
      component: () => import('@/views/components/VComponentsInputText.vue')
    },
    {
      path: 'progress',
      name: name`Progress`,
      component: () => import('@/views/components/VComponentsProgress.vue')
    },
    { path: '' }
  ]
}