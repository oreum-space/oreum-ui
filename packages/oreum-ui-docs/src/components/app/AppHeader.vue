<template>
  <header :class="rootClass">
    <router-link
      class="app-header__logo"
      to="/"
    >
      <app-logo />
      <h4>
        Oreum UI
      </h4>
    </router-link>
    <app-menu />
  </header>
</template>

<script
  setup
  lang="ts"
>
import AppLogo from '@/components/app/AppLogo.vue'
import AppMenu from '@/components/app/AppMenu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const rootClass = computed(() => ['app-header', { 'app-header_no-shadow': route.path?.startsWith('/components') }])
</script>

<style lang="scss">
.app-header {
  display: flex;
  justify-content: space-between;
  position: sticky;
  inset: 0;
  z-index: 100;

  height: 48px;
  width: 100%;
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

  &::before {
    z-index: -1;
    content: ' ';
    width: 100%;
    height: 48px;
    background: var(--current-background-color);
    box-shadow: 0 0 12px 12px var(--background-color);
    inset: 0;
    position: absolute;
    pointer-events: none;
  }

  &_no-shadow::before {
    box-shadow: 0 0 0 0 var(--background-color);
  }

  &__logo {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    transition: opacity 200ms ease-in-out;
    text-decoration: unset;

    &:hover {
      opacity: 0.8;
    }

    h4 {
      font-weight: 500;
    }
  }
}
</style>