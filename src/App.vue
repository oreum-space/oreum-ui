<script setup lang="ts">
import AppBackground from './AppBackground.vue'
import { computed, onMounted, ref } from 'vue'

const onTop = ref(false)

const headerClass = computed(() => [
  'app-header',
  ...(onTop.value ? ['app-header_sticky'] : [])
])

function onScroll () {
  onTop.value = !!document.body.scrollTop
}

onMounted(() => {
  document.body.addEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="app-anchor">
    <app-background />
  </div>
  <header
    :class="headerClass"
  >
    <div class="app-header__content">
      <picture class="app-header__logo">
        <source srcset="./assets/oreum-ui-compact.svg" media="(max-width: 600px)" />
        <img src="./assets/oreum-ui.svg" alt="Oreum UI logo" height="24" />
      </picture>
      <menu class="app-header__menu">
        <li>
          <a href="https://discord.gg/BxSJjnJFRG">
            <button>Discord</button>
          </a>
        </li>
      </menu>
    </div>
  </header>
  <router-view />
  <footer class="app-footer">
    <div class="app-footer__content">
      <picture class="app-footer__logo">
        <source srcset="./assets/oreum-ui-compact.svg" media="(max-width: 600px)" />
        <img src="./assets/oreum-ui.svg" alt="Oreum UI logo" height="24" />
      </picture>
    </div>
  </footer>
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

.app-anchor {
  position: relative;
  grid-area: a;
}

.app-header {
  display: flex;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 0;
  grid-area: h;
  backdrop-filter: blur(0);

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-block: 12px;
    max-width: var(--content-width);
    padding-inline: var(--content-padding);
  }

  &::after {
    transition: opacity 300ms ease-in-out;
    content: ' ';
    position: absolute;
    bottom: 0;
    left: -32px;
    width: calc(100vw + 64px);
    height: 1px;
    background-color: var(--border-color);
    opacity: 0;
  }

  &_sticky {
    transition: all 300ms ease-in-out;
    backdrop-filter: blur(16px);
    background: color-mix(in srgb, var(--o-surface-95), transparent);

    &::after {
      opacity: 1;
    }
  }

  &__menu {
    li {
      list-style-type: none;
    }
  }
}

.app-main {
  grid-area: m;
  padding-inline: var(--content-padding);
}

.app-footer {
  display: flex;
  justify-content: center;
  width: 100%;
  backdrop-filter: blur(0);
  grid-area: f;

  &__content {
    width: 100%;
    padding-block: 12px;
    max-width: var(--content-width);
    padding-inline: var(--content-padding);
  }

  &__logo img {
    opacity: 0.5;
  }
}
</style>
