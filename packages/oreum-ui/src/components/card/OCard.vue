<template>
  <component
    :is="tag"
    :class="rootClass"
  >
    <slot />
  </component>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { computed } from 'vue'

defineOptions({ name: 'OCard', inheritAttrs: true })

type NonSemanticTags = 'div'
type SemanticTags = 'article' | 'aside' | 'footer' | 'header' | 'main' | 'nav' | 'section'
type Tags = NonSemanticTags | SemanticTags

export interface CardProps extends ClassBindingProps {
  tag?: Tags,
  clear?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  class: void 0,
  tag: 'div',
  clear: void 0
})

const rootClass = computed(() => [
  'o-card',
  {
    'o-card_clear': props.clear
  },
  props.class
])
</script>
