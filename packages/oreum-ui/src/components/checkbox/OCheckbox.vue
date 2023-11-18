<template>
  <label
    :class="rootClass"
  >
    <input
      ref="input"
      v-model="value"
      :indeterminate="indeterminate"
      :disabled="disabled"
      class="o-checkbox__input"
      type="checkbox"
    >
    <span class="o-checkbox__box">
      <o-icon :icon="icon" />
    </span>
    <span
      v-if="label"
      class="o-checkbox__label"
    >
      {{ label }}
    </span>
  </label>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  ref
} from 'vue'
import OIcon from '@/components/icon/OIcon.vue'

defineOptions({
  name: 'OCheckbox',
  inheritAttrs: false
})

export interface CheckboxProps extends ClassBindingProps {
  disabled?: boolean,
  label?: string,
  modelValue?: 'indeterminate' | boolean | null
}
export type CheckBoxModelValue = CheckboxProps['modelValue']

const props = withDefaults(defineProps<CheckboxProps>(), {
  class: void 0,
  disabled: false,
  label: '',
  modelValue: void 0
})

const emit = defineEmits<{ 'update:modelValue': [newModelValue: CheckBoxModelValue] }>()

const localValue = ref<CheckBoxModelValue>(props.modelValue || false)

const value = computed({
  get (): CheckBoxModelValue {
    return props.modelValue !== void 0
      ? props.modelValue
      : localValue.value
  },
  set (newValue: CheckBoxModelValue): void {
    if (props.modelValue === void 0) {
      localValue.value = newValue
    }
    emit('update:modelValue', newValue)
  }
})

const indeterminate = computed(() => value.value === 'indeterminate')
const icon = computed(() => indeterminate.value ? 'indeterminate' : 'check')
const rootClass = computed(() => [
  'o-checkbox',
  {
    'o-checkbox_labeled': !!props.label,
    'o-checkbox_disabled': props.disabled,
    'o-checkbox_indeterminate': indeterminate.value,
    'o-checkbox_checked': !!value.value
  },
  props.class
])
</script>
