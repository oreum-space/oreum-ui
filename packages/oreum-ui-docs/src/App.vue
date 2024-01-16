<template>
  <app-header />
  <router-view v-slot="{ Component: RouterViewComponent }">
    <component
      :is="RouterViewComponent"
      class="app-main"
    />
  </router-view>
  <app-footer />
</template>

<script
  setup
  lang="ts"
>
import AppFooter from '@/components/app/AppFooter.vue'
import AppHeader from '@/components/app/AppHeader.vue'
</script>

<style lang="scss">
.app-main {
  padding-block: 24px;
  --min-padding-inline: 24px;
  @supports (scrollbar-gutter: stable both-edges) {
    --min-padding-inline: 8px;
  }
  padding-inline: max(var(--min-padding-inline), calc((100vw - var(--app-width)) / 2));
  @media (max-width: 512px) {
    --min-padding-inline: 16px;
    @supports (scrollbar-gutter: stable both-edges) {
      --min-padding-inline: 0;
    }
  }
  min-height: calc(100vh);
  @supports (min-height: 100dvh) {
    min-height: calc(100dvh - 48px);
  }
}
</style>
