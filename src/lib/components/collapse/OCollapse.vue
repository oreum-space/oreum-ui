<script setup lang="ts">
import '@lib/components/collapse/index.scss'
import noAttrs from '@lib/utils/noAttrs.ts'
import {
  OCollapseEmits,
  OCollapseModelValue,
  OCollapseProps,
  OCollapseSlots
} from '@lib/components/collapse/OCollapse.ts'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineOptions(noAttrs('OCollapse'))

const props = withDefaults(defineProps<OCollapseProps>(), {
  class: null,
  timeout: void 0,
  opened: void 0,
  initial: void 0,
  horizontal: false,
  end: false
})

const modelValue = defineModel<OCollapseModelValue>('modelValue', { default: false })

const emit = defineEmits<OCollapseEmits>()

defineSlots<OCollapseSlots>()

const content = ref<HTMLDivElement>()

const contentSize = ref<number>()

const resizeObserver = new ResizeObserver(calculateContent)

function calculateContent () {
  const [scroll, offset] = props.horizontal
    ? [content.value!.scrollWidth, content.value!.offsetWidth]
    : [content.value!.scrollHeight, content.value!.offsetHeight]

  if (contentSize.value !== scroll) {
    contentSize.value = offset
  }
}

const rootClass = computed(() => [
  'o-collapse',
  {
    'o-collapse_horizontal': props.horizontal,
    'o-collapse_end': props.end
  },
  props.class
])

const rootStyle = computed(() => {
  const hasTimeout = props.timeout !== void 0
  const timeoutIsArray = Array.isArray(props.timeout)

  return {
    '--o-collapse--content-size': contentSize.value && `${ contentSize.value }px`,
    '--o-collapse--open-timeout': hasTimeout ? `${ timeoutIsArray ? props.timeout[0] : props.timeout }ms` : void 0,
    '--o-collapse--close-timeout': hasTimeout ? `${ timeoutIsArray ? props.timeout[1] : props.timeout }ms` : void 0
  }
})

function close () {
  if (modelValue.value) {
    modelValue.value = false
  }
}

function open () {
  if (!modelValue.value) {
    modelValue.value = true
  }
}

function toggle (state?: boolean) {
  modelValue.value = state ?? !modelValue.value
}

(function preOpen () {
  if (props.opened && !props.initial) {
    modelValue.value = true
  }
})()

onMounted(() => {
  resizeObserver.observe(content.value!)
  calculateContent()

  if (props.opened && props.initial) {
    modelValue.value = true
  }

  watch(modelValue, (value, oldValue) => {
    if (value === oldValue) {
      return
    }
    if (value) {
      emit('open')
    } else {
      emit('close')
    }
    emit('toggle', value)
  })
})

onBeforeUnmount(() => resizeObserver.disconnect())

defineExpose({
  close,
  open,
  toggle
})
</script>

<template>
  <div
    :class="rootClass"
    :style="rootStyle"
    :aria-hidden="!modelValue"
  >
    <div
      ref="content"
      class="o-collapse__content"
    >
      <slot name="default" />
    </div>
  </div>
</template>
