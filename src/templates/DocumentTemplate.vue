<script setup lang="ts">
import DocMenu from '../components/doc/DocMenu.vue'
</script>

<template>
  <div class="app-main doc-wrapper">
    <doc-menu />
    <slot />
  </div>
</template>

<style lang="scss">
.doc-wrapper {
  display: grid;
  grid-template:
    'menu tabs tabs' auto
    'menu view side' auto / 256px 1fr;
  gap: var(--content-padding);
}

.doc-card {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
  justify-content: center;
  background-color: var(--o-card-background-default);
  padding: 16px;
  border-radius: 12px;
}
</style>
