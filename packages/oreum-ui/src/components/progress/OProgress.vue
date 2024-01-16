<template>
  <svg
    v-if="type === 'circle'"
    :class="rootClass"
    :style="rootStyle"
    v-bind="rootCircleAttrs"
    role="progressbar"
  >
    <circle
      v-bind="circleAttrs"
      :style="circleStyle"
      cx="50%"
      cy="50%"
    />
    <text
      v-if="digits"
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ Math.round(Math.min(100, Math.max(0, (progress ?? 0) * 100))) }}
    </text>
  </svg>
  <div
    v-else
    :class="rootClass"
    role="progressbar"
  >
    <div class="o-progress__value">
      <template v-if="digits">
        {{ progress ?? 0 }}
      </template>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { computed } from 'vue'

defineOptions({
  name: 'OProgress',
  inheritAttrs: false
})

type ProgressTypes = 'circle' | 'bar'

type ProgressSizes = 'small' | 'medium' | 'large'

export interface ProgressProps extends ClassBindingProps {
  progress?: number,
  type?: ProgressTypes,
  indeterminate?: boolean,
  digits?: boolean
  size?: ProgressSizes
}

const props = withDefaults(defineProps<ProgressProps>(), {
  class: void 0,
  progress: void 0,
  type: 'circle',
  indeterminate: false,
  digits: false,
  size: 'small'
})

const rootStyle = computed(() => props.indeterminate ? void 0 : ({
  '--o-progress': Math.min(1, Math.max(0, props.progress ?? 0))
}))
const rootClass = computed(() => [
  'o-progress',
  `o-progress_${ props.type }`,
  `o-progress_${ props.size }`, {
    'o-progress_indeterminate': props.indeterminate
  }, props.class
])
const ROOT_CIRCLE_ATTRS = {
  small: { width: '16', height: '16' } as const,
  medium: { width: '24', height: '24' } as const,
  large: { width: '32', height: '32' } as const
} as const
const rootCircleAttrs = computed(() => ROOT_CIRCLE_ATTRS[props.size])
const CIRCLE_ATTRS = {
  small: { r: '6', 'stroke-width': '1' } as const,
  medium: { r: '9', 'stroke-width': '2' } as const,
  large: { r: '12', 'stroke-width': '2' } as const
} as const
const circleAttrs = computed(() => CIRCLE_ATTRS[props.size])
const circleDashArray = computed(() => {

})
const circleStyle = computed(() => ({
  '--r': circleAttrs.value.r,
  '--w': circleAttrs.value['stroke-width'],
  '--circle-dash-array': circleDashArray.value
}))
</script>
