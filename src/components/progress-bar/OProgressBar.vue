<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    role="progressbar"
  >
    <div class="o-progress-bar__value" />
    <span
      v-if="show"
      class="o-progress-bar__show"
    >
      <span>{{ textValue }}</span>
      <span>{{ textValue }}</span>
    </span>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import throttle from '@/utilities/throttle.ts'
import {
  computed,
  ref,
  watch
} from 'vue'

defineOptions({
  name: 'OProgressBar',
  inheritAttrs: false
})

interface ProgressBarProps extends ClassBindingProps {
  value?: number,
  show?: boolean | string,
  indeterminate?: boolean
}

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: void 0,
  show: false,
  indeterminate: false
})

function protectValue (value: ProgressBarProps['value']): number {
  if (value === void 0 || isNaN(value)) return 0
  return Math.min(Math.max(0, value), 1)
}

const localValue = ref(protectValue(props.value))

const textValue = computed(() => typeof props.show === 'string'
  ? props.show
  : Math.round(Math.min(Math.max(0, localValue.value * 100), 100)))
const rootClass = computed(() => [
  'o-progress-bar',
  { 'o-progress-bar_indeterminate': props.indeterminate || props.value === void 0 },
  props.class
])
const rootStyle = computed(() => ({
  '--progress': `${ localValue.value * 100 }%`
}))

watch(() => props.value, throttle(() => localValue.value = protectValue(props.value), 100))
</script>
