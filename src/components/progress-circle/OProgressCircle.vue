<template>
  <svg
    :class="rootClass"
    v-bind="rootAttrs"
    role="progressbar"
  >
    <circle
      v-bind="circleAttrs"
      :style="circleStyle"
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
      {{ textValue === 100 ? '✓' : textValue }}
    </text>
  </svg>
</template>

<script
  setup
  lang="ts"
>
import throttle from '@/utilities/throttle.ts'
import OPTIONS from './options.ts'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  ref,
  watch
} from 'vue'

defineOptions({
  name: 'OProgressCircle',
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

function protectValue (value: ProgressCircleProps['value']): number {
  if (value === void 0 || isNaN(value)) return 0
  return Math.min(Math.max(0, value), 1)
}

const localValue = ref(protectValue(props.value))

const textValue = computed(() => Math.round(Math.min(Math.max(0, localValue.value * 100), 100)))
const rootClass = computed(() => [
  'o-progress-circle',
  `o-progress-circle_${ props.size }`,
  { 'o-progress-circle_indeterminate': props.indeterminate || props.value === void 0 },
  props.class
])
const option = computed(() => OPTIONS[props.size])
const rootAttrs = computed(() => option.value.attrs.root)
const circleAttrs = computed(() => option.value.attrs.circle)
const strokeDasharray = computed(() => {
  if (props.indeterminate) return void 0

  const { circleLength } = option.value

  return `0 ${ circleLength * (1 - localValue.value) * 0.5 + 2 } ${ circleLength * localValue.value } 24000`
})
const circleStyle = computed(() => ({
  'stroke-dasharray': strokeDasharray.value
}))

watch(() => props.value, throttle(() => localValue.value = protectValue(props.value), 100))
</script>
