<script setup lang="ts">
import '@lib/components/button/OButton.scss'
import { computed } from 'vue'
import {
  OButtonEmits,
  OButtonProps,
  OButtonSlots,
  OButtonSizes,
  OButtonVariants
} from '@lib/components/button/OButton.ts'
import noAttrs from '@lib/utils/noAttrs.ts'

defineOptions(noAttrs('OButton'))

const props = withDefaults(defineProps<OButtonProps>(), {
  size: OButtonSizes.default,
  variant: OButtonVariants.default,
  class: null,
  label: void 0,
  text: void 0,
  rounded: void 0,
  outlined: void 0,
  square: void 0,
  loading: void 0,
  href: void 0,
  target: '_blank'
})

const emit = defineEmits<OButtonEmits>()

defineSlots<OButtonSlots>()

const rootClass = computed(() => [
  'o-button', {
    [`o-button_${ props.size }`]: props.size !== OButtonSizes.default,
    [`o-button_${ props.variant }`]: props.variant !== OButtonVariants.default,
    'o-button_text': props.text,
    'o-button_rounded': props.rounded,
    'o-button_outlined': props.outlined,
    'o-button_square': props.square,
    'o-button_loading': props.loading
  }, props.class
])

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
    role="button"
    @click="click"
  >
    <slot name="default">
      {{ label }}
    </slot>
  </component>
</template>
