<script setup lang="ts">
import useRouteTemplate from './composables/useRouteTemplate'
import AppHeader from './components/app/AppHeader.vue'
import AppFooter from './components/app/AppFooter.vue'
import AppSquares from './components/app/AppSquares.vue'

const TemplateComponent = useRouteTemplate()
</script>

<template>
  <app-header />
  <template-component>
    <router-view />
  </template-component>
  <app-footer />
  <div class="app-anchor">
    <app-squares />
  </div>
</template>

<style lang="scss">
.app-body {
  --content-width: 1536px;
  --content-padding: 48px;

  width: 100lvw;
  height: 100svh;

  display: grid;
  grid-template:
    "a a a" 0
    "h h h" 64px
    ". m ." auto
    "f f f" 48px / 1fr min(var(--content-width), 100%) 1fr;

  overflow-x: hidden;
  overflow-y: auto;

  scrollbar-gutter: stable both-edges;

  @media (max-width: 1280px) {
    --content-padding: 32px;
  }

  @media (max-width: 1024px) {
    --content-padding: 24px;
  }

  @media (max-width: 720px) {
    --content-padding: 16px;
  }

  @media (max-width: 512px) {
    --content-padding: 8px;
  }
}

.app-main {
  grid-area: m;
  padding-inline: var(--content-padding);
}

.app-anchor {
  position: relative;
  grid-area: a;
}
</style>
