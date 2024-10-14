<script setup lang="ts">
import DocMenu from '../components/doc/DocMenu.vue'
</script>

<template>
  <main class="app-main doc-main">
    <doc-menu />
    <slot />
  </main>
</template>

<style lang="scss">
.doc-main {
  display: grid;
  grid-template:
    "m s" auto / 256px 1fr;
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
