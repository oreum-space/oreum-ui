<template>
  <button class="c-button">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'OButton',
  inheritAttrs: false
})

withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Button'
})
</script>

<style lang="scss">
.c-button {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px 8px;
  background-color: #00000080;
  border: 1px solid black;
  color: white;
  font-family: Inter, sans-serif;
}
</style>