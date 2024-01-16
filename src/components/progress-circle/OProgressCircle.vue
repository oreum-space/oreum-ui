<template>
  <svg
    :class="rootClass"
    v-bind="rootAttrs"
    role="progressbar"
  >
    <circle
      r="0"
      v-bind="circleAttrs"
      cx="50%"
      cy="50%"
    />
    <text
      v-if="show"
      x="50%"
      y="50%"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ textValue }}
    </text>
  </svg>
</template>

<script
  setup
  lang="ts"
>
import OPTIONS from './options.ts'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { computed } from 'vue'

defineOptions({
  name: 'OProgressBar',
  inheritAttrs: false
})

type ProgressCircleSizes = 'small' | 'medium' | 'large'

export interface ProgressCircleProps extends ClassBindingProps {
  indeterminate?: boolean,
  show?: boolean,
  size?: ProgressCircleSizes
  value?: number
}

const props = withDefaults(defineProps<ProgressCircleProps>(), {
  indeterminate: false,
  show: false,
  size: 'small',
  value: void 0
})

const protectedValue = computed(() => {
  if (props.value === void 0 || isNaN(props.value)) {
    return 0
  }
  return Math.min(Math.max(0, props.value), 1)
})
const textValue = computed(() => Math.round(Math.min(Math.max(0, protectedValue.value * 100), 100)))
const rootClass = computed(() => [
  'o-progress-circle',
  `o-progress-circle_${ props.size }`,
  { 'o-progress_indeterminate': props.indeterminate },
  props.class
])
const option = computed(() => OPTIONS[props.size])
const rootAttrs = computed(() => option.value)
const circleAttrs = computed(() => option.value)
</script>

<style
  scoped
  lang="scss"
>

</style>