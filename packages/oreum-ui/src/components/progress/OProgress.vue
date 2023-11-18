<template>
  <svg
    :class="rootClass"
    :style="rootStyle"
    width="16"
    height="16"
  >
    <circle
      cx="8"
      cy="8"
      r="5.5"
    />
  </svg>
</template>

<script
  setup
  lang="ts"
>
import type { ClassBinding } from '@/types/ClassBinding.ts'
import { computed } from 'vue'

defineOptions({
  name: 'OProgress',
  inheritAttrs: false
})

export type OProgressProps = {
  progress?: number
  class?: ClassBinding
}

const props = defineProps<OProgressProps>()

const isUndefined = computed(() => props.progress === void 0)
const rootClass = computed(() => ['o-progress', { 'o-progress_undefined': isUndefined.value }, props.class])
const rootStyle = computed(() => isUndefined.value ? void 0 : ({ '--o-progress': props.progress }))
</script>
