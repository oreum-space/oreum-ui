<template>
  <div
    :class="rootClass"
    :style="rootStyle"
  >
    <span class="o-avatar__username">
      {{ username }}
    </span>
    <img
      class="o-avatar__image"
      :src="src"
      :alt="`${ username } avatar`"
    >
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { computed } from 'vue'

defineOptions({ name: 'OAvatar', inheritAttrs: false })

type AvatarSizes = 'small' | 'medium' | 'large'

export interface AvatarProps extends ClassBindingProps {
  username?: string,
  src?: string,
  size?: AvatarSizes,
  color?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  username: 'Unknown',
  src: void 0,
  size: 'medium',
  color: void 0
})

const rootClass = computed(() => [
  'o-avatar',
  `o-avatar_${ props.size }`,
  props.class
])

const rootStyle = computed(() => ({
  '--avatar-border-color': props.color
}))
</script>
