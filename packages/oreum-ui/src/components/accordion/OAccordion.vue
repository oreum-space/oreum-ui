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
      v-if="!$slots['custom-header']"
      class="o-accordion__header"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="o-accordion__header-content">
        <slot
          name="header"
          :disabled="disabled"
        />
      </span>
      <o-icon
        icon="accordion"
        :state="opened"
      />
    </OButton>
    <div class="o-accordion__content-wrapper">
      <div
        ref="content"
        class="o-accordion__content"
      >
        <slot
          name="default"
        />
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
  Ref,
  computed,
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import OIcon from '@/components/icon/OIcon.vue'
import OButton from '@/components/button/OButton.vue'


interface AccordionProps extends ClassBindingProps {
  timeout?: number | [number, number],
  disabled?: boolean
}

interface HeaderSlotProps {
  disabled: boolean
}

interface AccordionSlots {
  default (props: object): never,
  header (props: HeaderSlotProps): never,
  'custom-header' (props: HeaderSlotProps): never
}

defineOptions({ name: 'OAccordion', inheritAttrs: false })
const props = withDefaults(defineProps<AccordionProps>(), {
  timeout: 250,
  disabled: false
})
const slots = defineSlots<AccordionSlots>()

const resizeObserver = new ResizeObserver(calculateContentHeight)

const opened = ref(false)
const contentHeight = ref(0)
const content = <Ref<HTMLElement>>ref()

const openTimeout = computed(() => Array.isArray(props.timeout) ? props.timeout[0] : props.timeout)
const closeTimeout = computed(() => Array.isArray(props.timeout) ? props.timeout[1] : props.timeout)
const rootStyle = computed(() => ({
  '--open-timeout': `${ openTimeout.value }ms`,
  '--close-timeout': `${ closeTimeout.value }ms`,
  '--content-height': `${ contentHeight.value }px`
}))
const rootClass = computed(() => [
  'o-accordion',
  {
    'o-accordion_opened': opened.value,
    'o-accordion_custom': slots['custom-header'],
    'o-accordion_disabled': props.disabled
  },
  props.class
])

function toggle () {
  if (opened.value) return close()
  open()
}

function open () {
  if (opened.value) return
  opened.value = true
  resizeObserver.observe(content.value)
}

function close () {
  if (!opened.value) return
  opened.value = false
  resizeObserver.unobserve(content.value)
}

function calculateContentHeight () {
  if (contentHeight.value !== content.value.scrollHeight) {
    contentHeight.value = content.value.offsetHeight
  }
}


onMounted(() => {
  resizeObserver.observe(content.value)
  calculateContentHeight()
})

onUnmounted(() => {
  resizeObserver.disconnect()
})

defineExpose({
  opened,
  toggle,
  open,
  close
})
</script>
