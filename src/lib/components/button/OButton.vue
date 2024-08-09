<script setup lang="ts">
import './index.scss'

import { computed } from 'vue'

defineOptions({ name: 'OButton', inheritAttrs: false })

export interface OButtonProps {
  label?: string,
  text?: boolean,
  rounded?: boolean,
  outlined?: boolean,
  tiny?: boolean,
  small?: boolean,
  large?: boolean,
  square?: boolean,
  loading?: boolean,
  href?: string,
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = withDefaults(defineProps<OButtonProps>(), {
  label: void 0,
  text: void 0,
  rounded: void 0,
  outlined: void 0,
  tiny: void 0,
  small: void 0,
  large: void 0,
  square: void 0,
  loading: void 0,
  href: void 0
})

const emit = defineEmits<{
  'click': [event: PointerEvent]
}>()

const rootClass = computed(() => ['o-button', {
  'o-button_text': props.text,
  'o-button_rounded': props.rounded,
  'o-button_outlined': props.outlined,
  'o-button_tiny': props.tiny,
  'o-button_small': props.small,
  'o-button_large': props.large,
  'o-button_square': props.square,
  'o-button_loading': props.loading,
  'o-button_href': !!props.href,
  ...props.class
}])

function click (event: PointerEvent) {
  emit('click', event)
}

</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="rootClass"
    :href="href"
    :target="href ? target : void 0"
    @click="click"
  >
    <slot>
      {{ label }}
    </slot>
  </component>
</template>
