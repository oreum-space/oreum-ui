<script setup lang="ts">
import AppBackground from '../components/AppBackground.vue'
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
  <header
    :class="headerClass"
  >
    <div class="app-header__content">
      <picture class="app-header__logo">
        <source srcset="../assets/oreum-ui-compact.svg" media="(max-width: 600px)" />
        <img src="../assets/oreum-ui.svg" alt="Oreum UI logo" height="24" />
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
  <slot />
  <footer class="app-footer">
    <div class="app-footer__content">
      <picture class="app-footer__logo">
        <source srcset="../assets/oreum-ui-compact.svg" media="(max-width: 600px)" />
        <img src="../assets/oreum-ui.svg" alt="Oreum UI logo" height="24" />
      </picture>
    </div>
  </footer>
  <div class="app-anchor">
    <app-background />
  </div>
</template>

<style lang="scss">
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

.app-anchor {
  position: relative;
  grid-area: a;
}
</style>