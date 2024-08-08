<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import useLang from '../composables/useLang'
import { OButton } from '../lib/oreum-ui'
import langSvg from '../assets/lang.svg'

const router = useRouter()
const { setLang, lang } = useLang()

const onTop = ref(false)

const headerClass = computed(() => [
  'app-header',
  ...(onTop.value ? ['app-header_sticky'] : [])
])

const theme = inject('theme')

function onScroll () {
  onTop.value = document.body.scrollTop >= 1
}

function goToHome () {
  router.push('/')
}

function switchLang () {
  setLang(lang.value === 'ru' ? 'en' : 'ru')
}

function watchScroll () {
  document.body.addEventListener('scroll', onScroll)
}

onMounted(() => {
  watchScroll()
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
          <o-button
            small
            square
            @click="switchLang"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use :href="`${ langSvg }#${ lang }`" />
            </svg>
          </o-button>
        </li>
        <li>
          <o-button
            label="Discord"
            href="https://discord.gg/BxSJjnJFRG"
            small
            square
          />
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
    display: flex;
    gap: 8px;

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