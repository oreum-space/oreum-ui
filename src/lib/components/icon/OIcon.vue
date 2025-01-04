<script setup lang="ts">
import '@lib/components/icon/OIcon.scss'
import noAttrs from '@lib/utils/noAttrs.ts'
import { OIconNames, OIconProps } from '@lib/components/icon/OIcon.ts'
import icons from '@lib/generated/types/icons.ts'
import { computed } from 'vue'

import svg from '@lib/generated/assets/icons.svg'

defineOptions(noAttrs('OIcon'))

const props = withDefaults(defineProps<OIconProps>(), {
  class: null,
  name: 'default'
})

const href = computed(() => `${ svg }#${ icons.includes(props.name as OIconNames) ? props.name : 'default' }`)

const rootClass = computed(() => [
  'o-icon',
  props.class
])
</script>

<template>
  <svg
    :class="rootClass"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="href" />
  </svg>
</template>
