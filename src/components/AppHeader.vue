<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const onTop = ref(false)

const headerClass = computed(() => [
  'app-header',
  ...(onTop.value ? ['app-header_sticky'] : [])
])

function onScroll () {
  onTop.value = document.body.scrollTop >= 1
}

function goToHome () {
  router.push('/')
}

onMounted(() => {
  document.body.addEventListener('scroll', onScroll)
})
</script>

<template>
  <header :class="headerClass">
    <div class="app-header__content">
      <picture class="app-header__logo">
        <source srcset="../assets/oreum-ui-compact.svg" media="(max-width: 600px)" />
        <img
          src="../assets/oreum-ui.svg"
          alt="Oreum UI logo"
          height="24"
          role="link"
          @click="goToHome"
        />
      </picture>
      <menu class="app-header__menu">
        <li>
          <a href="https://discord.gg/BxSJjnJFRG">
            <button>Discord</button>
          </a>
        </li>
      </menu>
    </div>
    <div class="app-header__shader" />
  </header>
</template>

<style lang="scss">
.app-header {
  display: flex;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 0;
  grid-area: h;
  background: transparent;
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
  transition: all 165ms ease-in-out;
  mask-image: linear-gradient(90deg, transparent, black 28px);
  -webkit-mask-image: -webkit-linear-gradient(90deg, transparent, black 28px);

  &::before {
    content: '';
    position: absolute;
    height: 12px;
    width: 100%;
    background: linear-gradient(0deg, transparent, var(--o-surface-95));
    z-index: -1;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px var(--content-padding) 28px;
    max-width: var(--content-width);
  }

  &__logo img {
    cursor: pointer;
  }

  &__menu {
    li {
      list-style-type: none;
    }
  }

  &_sticky {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: color-mix(in srgb, var(--o-surface-95), transparent);
  }
}
</style>