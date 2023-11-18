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
  tag?: Tags
}

const props = withDefaults(defineProps<CardProps>(), {
  class: void 0,
  tag: 'div'
})

const rootClass = computed(() => [
  'o-card',
  props.class
])
</script>
