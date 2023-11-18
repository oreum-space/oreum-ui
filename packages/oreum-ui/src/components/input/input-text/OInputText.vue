<template>
  <label
    :class="rootClasses"
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
    >
  </label>
</template>

<script
  setup
  lang="ts"
>
import OIcon from '@/components/icon/OIcon.vue'
import { computed, ref } from 'vue'

defineOptions({
  name: 'OInputText',
  inheritAttrs: false
})

type GModelValue = string | null | void

type Props = {
  modelValue?: GModelValue,
  type?: 'text' | 'email' | 'password' | 'url',
  label?: string,
  valid?: boolean | void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: void 0,
  type: 'text',
  label: '',
  valid: void 0
})

const emit = defineEmits<{
  'update:modelValue': [newModelValue: GModelValue]
}>()

const localValue = ref<GModelValue>(props.modelValue || '')
const passwordShown = ref<boolean>(false)

const value = computed({
  get (): GModelValue {
    return props.modelValue !== void 0
      ? props.modelValue
      : localValue.value
  },
  set (newValue: GModelValue): void {
    if (props.modelValue === void 0) localValue.value = newValue
    emit('update:modelValue', newValue)
  }
})
const isTypePassword = computed((): boolean => props.type === 'password')
const rootClasses = computed((): Record<string, boolean> => ({
  'o-input': true,
  'o-input-text': true,
  'o-input_has-value': !!value.value,
  'o-input_invalid': (<Props['valid']>props.valid !== void 0 && !props.valid),
  'o-input_valid': <Props['valid']>props.valid !== void 0 && !!<Props['valid']>props.valid
}))
const localType = computed((): string =>
  props.type === 'password'
    ? (passwordShown.value ? 'text' : 'password')
    : props.type)

function togglePasswordShown (): void {
  window.console.log('togglePasswordShown')
  passwordShown.value = !passwordShown.value
}

defineExpose({
  value
})
</script>
