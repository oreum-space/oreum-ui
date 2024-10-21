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
@use '@/styles' as global;

.doc-wrapper {
  display: grid;
  grid-template:
    'menu tabs tabs' auto
    'menu view side' auto / 256px calc(100% - var(--content-padding) * 2 - 256px - 192px) 192px;
  gap: var(--content-padding);
  max-width: 100%;

  @media (max-width: global.$tablet) {
    grid-template:
      'menu tabs tabs' auto
      'menu view side' auto / 256px calc(100% - var(--content-padding) * 1 - 256px);
  }

  @media (max-width: global.$pad) {
    grid-template:
      'menu tabs tabs' auto
      'menu view side' auto / 0 calc(100% - var(--content-padding) * 1 - 256px);
  }
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
