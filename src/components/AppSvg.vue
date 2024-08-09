<script setup lang="ts">
const props = withDefaults(defineProps<{
  href: string
}>(), {
  href: void 0
})
</script>

<template>
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot>
      <use
        v-if="href"
        :href="href"
      />
    </slot>
  </svg>
</template>
