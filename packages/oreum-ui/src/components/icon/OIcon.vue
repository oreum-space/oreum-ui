<template>
  <svg
    :class="rootClass"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="href" />
    <template v-if="isStateIcon">
      <g
        v-if="icon === 'shown'"
        :class="{
          'o-icon__shown': true,
          'o-icon__shown_state': state
        }"
      >
        <path
          class="o-icon__detail"
          d="M12.5962 1.98959C12.7914 1.79433 13.108 1.79433 13.3033 1.98959C13.4985 2.18486 13.4985 2.50144 13.3033 2.6967L2.69666 13.3033C2.5014 13.4986 2.18481 13.4986 1.98955 13.3033C1.79429 13.108 1.79429 12.7915 1.98955 12.5962L12.5962 1.98959Z"
        />
        <path
          class="o-icon__shadow"
          d="M13.3033 2.6967C13.4986 2.50144 13.8152 2.50144 14.0104 2.6967C14.2057 2.89196 14.2057 3.20855 14.0104 3.40381L3.40381 14.0104C3.20855 14.2057 2.89197 14.2057 2.69671 14.0104C2.50144 13.8151 2.50144 13.4986 2.69671 13.3033L13.3033 2.6967Z"
        />
      </g>
    </template>
  </svg>
</template>

<script
  setup
  lang="ts"
>
import { oreumIconsInjectionKey } from '@/plugins/oreumIconsPlugin.ts'
import {
  computed,
  inject
} from 'vue'
import ICONS, {
  LARGE_ICONS,
  STATE_ICONS
} from '@/components/icon/icons'

defineOptions({
  name: 'OIcon',
  inheritAttrs: false
})

export interface OIconProps {
  icon?: (typeof ICONS)[number]
  class?: string | Record<string, boolean>
  state?: boolean
}

const props = withDefaults(defineProps<OIconProps>(), {
  icon: 'default',
  class: void 0,
  state: false
})

const oreumIcons = inject(oreumIconsInjectionKey)
if (!oreumIcons) throw new Error('Icons was not found! Please use "oreum-ui/oreumIconsPlugin".')
const href = computed(() => `${oreumIcons}/#${ ICONS.includes(props.icon) ? props.icon : 'default' }`)
const isStateIcon = computed(() => (<Readonly<Array<OIconProps['icon']>>>STATE_ICONS).includes(props.icon))
const isLarge = computed(() => (<Readonly<Array<OIconProps['icon']>>>LARGE_ICONS).includes(props.icon))
const size = computed(() => isLarge.value ? 24 : 16)
const rootClass = computed(() => ({
  ...(
    props.class
      ? typeof props.class === 'object'
        ? props.class
        : { [props.class]: true }
      : null
  ),
  'o-icon': true
}))

defineExpose({
  isAnimatedIcon: isStateIcon
})
</script>
