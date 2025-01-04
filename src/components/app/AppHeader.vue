<script setup lang="ts">
import { computed, inject, onMounted, ref, WritableComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { OButton, OButtonSizes, OTheme } from '@lib'
import AppSvg from '@/components/app/AppSvg.vue'
import useLangSettings from '@/composables/useLangSettings.ts'

const router = useRouter()
const { setLang, lang } = useLangSettings()

const onTop = ref(false)

const headerClass = computed(() => [
  'app-header',
  ...(onTop.value ? ['app-header_sticky'] : [])
])

const theme = inject<WritableComputedRef<OTheme>>('theme')!

function onScroll () {
  onTop.value = document.body.scrollTop >= 1
}

function goToHome () {
  router.push('/')
}

function switchLang () {
  setLang(lang.value === 'ru' ? 'en' : 'ru')
}

function switchTheme () {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
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
      <picture
        class="app-header__logo app-logo"
        @click="goToHome"
      >
        <source
          srcset="../../assets/oreum-ui-compact.svg"
          media="(max-width: 600px)"
          width="78"
        >
        <img
          src="../../assets/oreum-ui.svg"
          alt="Oreum UI logo"
          width="195"
          height="24"
          role="link"
        >
      </picture>
      <menu class="app-header__menu">
        <li>
          <o-button
            :size="OButtonSizes.small"
            square
            @click="switchLang"
          >
            <app-svg :href="`/src/assets/lang.svg#${ lang }`" />
          </o-button>
        </li>
        <li>
          <o-button
            :size="OButtonSizes.small"
            square
            @click="switchTheme"
          >
            <app-svg :href="`/src/assets/theme.svg#${ theme }`" />
          </o-button>
        </li>
        <li>
          <o-button
            :size="OButtonSizes.small"
            square
            href="https://discord.gg/BxSJjnJFRG"
            target="_blank"
          >
            <app-svg :href="`/src/assets/brand.svg#discord`" />
          </o-button>
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
  transition: var(--transition-ease);
  transition-property: backdrop-filter, -webkit-backdrop-filter, background-color;
  mask-image: linear-gradient(90deg, transparent, black 28px);
  -webkit-mask-image: -webkit-linear-gradient(90deg, transparent, black 28px);

  &::before {
    content: '';
    position: absolute;
    height: 12px;
    width: 100%;
    background: linear-gradient(0deg, transparent, var(--o-ground--background-default));
    z-index: -1;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px var(--content-padding) 28px;
    max-width: var(--content-width);
  }

  &__menu {
    display: flex;
    gap: 8px;
    margin-block: -2px;

    li {
      list-style-type: none;
    }
  }

  &_sticky {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background: color-mix(in srgb, var(--o-ground--background-default), transparent);
  }
}
</style>
