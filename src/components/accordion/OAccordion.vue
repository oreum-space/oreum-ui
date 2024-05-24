<template>
  <div
    :class="rootClass"
    :style="rootStyle"
  >
    <slot
      name="custom-header"
      :disabled="disabled"
    />
    <OButton
      v-if="(header || slots.header) && !slots['custom-header']"
      class="o-accordion__header"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="o-accordion__header-content">
        <slot
          name="header"
          :header="header!"
          :disabled="disabled"
        >
          {{ header }}
        </slot>
      </span>
      <o-icon
        icon="accordion"
        :state="!!value"
      />
    </OButton>
    <div class="o-accordion__content-wrapper">
      <div
        ref="content"
        class="o-accordion__content"
      >
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import {
  computed,
  ref,
  onMounted,
  onUnmounted, useSlots
} from 'vue'
import OIcon from '@/components/icon/OIcon.vue'
import OButton from '@/components/button/OButton.vue'

interface AccordionProps extends ClassBindingProps {
  modelValue?: boolean,
  timeout?: number | [number, number],
  disabled?: boolean,
  header?: string,
  preOpened?: boolean
}

interface HeaderSlotProps {
  disabled: boolean
}

interface AccordionSlots {
  default (props: object): unknown,
  header (props: HeaderSlotProps & { header: string }): unknown,
  'custom-header' (props: HeaderSlotProps): unknown
}

defineOptions({ name: 'OAccordion', inheritAttrs: false })
const props = withDefaults(defineProps<AccordionProps>(), {
  modelValue: void 0,
  timeout: 250,
  disabled: false,
  header: void 0,
  preOpened: false
})
const emit = defineEmits<{
  'update:model-value': [newModelValue: boolean | void]
}>()

defineSlots<AccordionSlots>()

const resizeObserver = new ResizeObserver(calculateContentHeight)

const slots = useSlots()
const localValue = ref(props.modelValue ?? props.preOpened)
const contentHeight = ref<number | void>(void 0)
const content = ref<HTMLElement | void>(void 0)

const value = computed({
  get (): boolean | void {
    return props.modelValue ?? localValue.value
  },
  set (value: boolean | void): void {
    if (value === void 0) return
    if (props.modelValue === void 0) {
      localValue.value = value
    }
    emit('update:model-value', value)
  }
})
const openTimeout = computed(() => Array.isArray(props.timeout) ? props.timeout[0] : props.timeout)
const closeTimeout = computed(() => Array.isArray(props.timeout) ? props.timeout[1] : props.timeout)
const rootStyle = computed(() => ({
  '--open-timeout': `${ openTimeout.value }ms`,
  '--close-timeout': `${ closeTimeout.value }ms`,
  '--content-height': !contentHeight.value ? 'auto' : `${ contentHeight.value }px`
}))

const rootClass = computed(() => [
  'o-accordion',
  {
    'o-accordion_opened': value.value,
    'o-accordion_disabled': props.disabled,
    'o-accordion_headless': props.header === void 0 && !slots.header
  },
  props.class
])

function toggle () {
  if (props.disabled) return;
  (value.value ? close : open)()
}

function open () {
  if (value.value) return
  value.value = true
  resizeObserver.observe(content.value!)
}

function close () {
  if (!value.value) return
  value.value = false
  resizeObserver.unobserve(content.value!)
}

function calculateContentHeight () {
  if (contentHeight.value !== content.value!.scrollHeight) {
    contentHeight.value = content.value!.offsetHeight
  }
}


onMounted(() => {
  resizeObserver.observe(content.value!)
  calculateContentHeight()
})

onUnmounted(() => {
  resizeObserver.disconnect()
})

defineExpose({
  value,
  toggle,
  open,
  close
})
</script>
