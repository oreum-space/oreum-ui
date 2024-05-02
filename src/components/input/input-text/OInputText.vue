<template>
  <label
    :class="rootClass"
  >
    <span
      v-if="label"
      class="o-input__label"
    >
      {{ label }}
    </span>
    <o-icon
      v-if="isTypePassword"
      class="o-input-text__show-password"
      icon="shown"
      :state="passwordShown"
      @click="togglePasswordShown"
    />
    <input
      v-model="value"
      class="o-input__input"
      :type="localType"
      :placeholder="label"
      :disabled="disabled"
    >
  </label>
</template>

<script
  setup
  lang="ts"
>
import OIcon from '@/components/icon/OIcon.vue'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  ref
} from 'vue'

defineOptions({
  name: 'OInputText',
  inheritAttrs: false
})

type ModelValue = string | null | void

type InputTextTypes = 'text' | 'email' | 'password' | 'url'

interface InputTextProps extends ClassBindingProps {
  modelValue?: ModelValue,
  type?: InputTextTypes,
  label?: string,
  disabled?: boolean,
  valid?: boolean
}

const props = withDefaults(defineProps<InputTextProps>(), {
  modelValue: void 0,
  type: 'text',
  label: '',
  disabled: false,
  valid: void 0
})

const emit = defineEmits<{ 'update:model-value': [newModelValue: ModelValue] }>()

const localValue = ref<ModelValue>(props.modelValue ?? '')
const passwordShown = ref<boolean>(false)

const value = computed({
  get (): ModelValue {
    return props.modelValue ?? localValue.value
  },
  set (value: ModelValue): void {
    if (props.modelValue === void 0) {
      localValue.value = value
    }
    emit('update:model-value', value)
  }
})
const isTypePassword = computed(() => props.type === 'password')
const rootClass = computed(() => [
  'o-input',
  'o-input-text', {
    'o-input_has-value': !!value.value,
    'o-input_invalid': props.valid !== void 0 && !props.valid,
    'o-input_valid': props.valid ?? void 0,
    'o-input_disabled': props.disabled ?? void 0
  },
  props.class
])

const localType = computed(() => props.type === 'password'
  ? (passwordShown.value ? 'text' : 'password')
  : props.type)

function togglePasswordShown (): void {
  passwordShown.value = !passwordShown.value
}

defineExpose({
  value
})
</script>
