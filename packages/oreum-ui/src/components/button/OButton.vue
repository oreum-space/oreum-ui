<template>
  <button
    :class="rootClass"
    :disabled="localDisabled"
    @click="click"
  >
    <slot>
      <o-icon
        v-if="icon"
        :icon="icon"
      />
      <span
        v-if="label"
        class="o-button__label"
      >
        {{ label }}
      </span>
    </slot>
    <o-progress
      v-if="async"
      class="o-button__progress"
      :progress="localProgress"
      :indeterminate="indeterminate"
    />
  </button>
</template>

<script
  setup
  lang="ts"
>
import { OIconProps } from '@/components/icon/OIcon.vue'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import OIcon from '@/components/icon/OIcon.vue'
import OProgress from '@/components/progress/OProgress.vue'
import { computed } from 'vue'

defineOptions({ name: 'OButton', inheritAttrs: false })

type ButtonTypes = 'default' | 'text' | 'icon'

export interface ButtonProps extends ClassBindingProps {
  type?: ButtonTypes,
  label?: string,
  icon?: OIconProps['icon'],
  progress?: number | boolean,
  primary?: boolean,
  disabled?: boolean,
  async?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  class: void 0,
  label: void 0,
  icon: void 0,
  disabled: false,
  async: false,
  primary: false,
  progress: false
})

const emit = defineEmits<{ 'click': [event: MouseEvent] }>()

const rootClass = computed(() => [
  'o-button',
  `o-button_${ props.type }`,
  {
    'o-button_async': props.async,
    'o-button_primary': props.primary,
    'o-button_progress': typeof props.progress === 'number' ? !isNaN(props.progress) : props.progress,
    'o-button_disabled': props.disabled
  },
  props.class
])

const indeterminate = computed(() => {
  return props.progress === void 0
})
const localProgress = computed(() => {
  if (typeof props.progress === 'boolean') {
    return void 0
  }
  return isNaN(props.progress) ? 1 : props.progress
})
const localDisabled = computed(() => {
  if (typeof props.progress === 'boolean') {
    return props.progress
  }
  return isNaN(props.progress) ? false : !!props.progress
})

function click (event: MouseEvent): void {
  emit('click', event)
}
</script>
