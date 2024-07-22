<script setup lang="ts">
import useRouteTemplate from './utils/useRouteTemplate'

const TemplateComponent = useRouteTemplate()
</script>

<template>
  <template-component>
    <router-view />
  </template-component>
</template>

<style lang="scss">
.app-body {
  --content-width: 1536px;
  --content-padding: 48px;

  @media (max-width: 720px) {
    --content-padding: 32px;
  }

  @media (max-width: 512px) {
    --content-padding: 24px;
  }

  @media (max-width: 384px) {
    --content-padding: 16px;
  }

  width: 100lvw;
  height: 100svh;

  display: grid;
  grid-template:
    "a a a" 0
    "h h h" 48px
    ". m ." auto
    "f f f" 48px / 1fr min(var(--content-width), 100%) 1fr;

  overflow-x: hidden;
  overflow-y: auto;

  scrollbar-gutter: stable both-edges;
}
</style>
