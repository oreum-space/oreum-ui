<template>
  <header class="app-header">
    <router-link
      class="app-header__logo"
      to="/"
    >
      <img
        src="/oreum-ui.svg"
        alt="oreum-ui"
      >
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
import AppMenu from '@/components/app/AppMenu.vue'
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  inset: 0;

  height: 48px;
  width: 100%;
  --min-padding-inline: 16px;
  padding-inline: max(var(--min-padding-inline), calc((100vw - var(--app-width)) / 2));

  background-color: var(--background-color);
  box-shadow: 0 0 12px 12px var(--background-color);

  @media (max-width: 512px) {
    --min-padding-inline: 4px;
  }

  &__logo {
    display: flex;
    gap: 8px;
    align-items: center;
    cursor: pointer;
    transition: opacity 200ms ease-in-out;
    text-decoration: unset;
    padding-inline: 8px;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 24px;
    }

    h4 {
      font-weight: 500;
    }
  }
}
</style>