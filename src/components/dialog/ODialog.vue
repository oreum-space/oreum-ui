<template>
  <teleport
    :to="target"
  >
    <div
      :class="rootClass"
    >
      <div
        class="o-dialog__header"
      >
        <o-button
          type="icon"
          icon="close"
        />
        <slot name="header" />
      </div>
      <div class="o-dialog__main">
        <slot name="main" />
      </div>
    </div>
  </teleport>
</template>

<script
  setup
  lang="ts"
>
import OButton from '@/components/button/OButton.vue'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  ref
} from 'vue'

interface DialogProps extends ClassBindingProps {
  modelValue?: boolean,
  target?: string | HTMLElement
}

defineOptions({ name: 'ODialog', inheritAttrs: false })
const props = withDefaults(defineProps<DialogProps>(), {
  modelValue: void 0,
  target: '#o-dialog-target'
})

const emit = defineEmits<{ 'update:model-value': [opened: boolean] }>()

const localOpened = ref(false)

const opened = computed({
  get () {
    return props.modelValue ?? localOpened.value
  },
  set (value: boolean) {
    if (props.modelValue === void 0) {
      localOpened.value = value
    }
    emit('update:model-value', value)
  }
})

const rootClass = computed(() => [
  'o-dialog',
  {
    'o-dialog_opened': opened.value
  },
  props.class
])
</script>
