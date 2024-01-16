<template>
  <svg
    :class="rootClass"
    :width="size"
    :height="size"
    :data-state="state"
    :data-icon-name="iconName"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use
      v-if="!isStateIcon"
      :href="href"
    />
    <component
      :is="stateComponent"
      v-else
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import { oreumIconsInjectionKey } from '@/plugins/oreumIconsPlugin.ts'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  inject
} from 'vue'
import Icons, { Icon } from '@/components/icon/Icons'

defineOptions({ name: 'OIcon', inheritAttrs: false })

export interface OIconProps extends ClassBindingProps {
  icon?: Icon
  state?: string | boolean
}

const props = withDefaults(defineProps<OIconProps>(), {
  icon: 'default',
  class: void 0,
  state: void 0
})

const oreumIcons = inject(oreumIconsInjectionKey)
if (!oreumIcons) throw new Error('Icons was not found! Please use "oreum-ui/oreumIconsPlugin".')

const iconName = computed<Icon>(() => Icons.isIcon(props.icon) ? props.icon : 'default')
const href = computed(() => oreumIcons + '/#' + iconName.value)
const isStateIcon = computed(() => Icons.isStateIcon(iconName.value))
const stateComponent = computed(() => Icons.getComponentByIcon(iconName.value))
const size = computed(() => Icons.isLargeIcon(iconName.value) ? 24 : 16)
const rootClass = computed(() => ['o-icon', props.class])

defineExpose({ isAnimatedIcon: isStateIcon })
</script>
