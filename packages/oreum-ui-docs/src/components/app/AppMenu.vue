<template>
  <menu
    :class="[
      'app-menu', {
        'app-menu_mobile': mobile,
        'app-menu_shown': mobile && shown
      }
    ]"
  >
    <li>
      <router-link
        to="/components/"
        @click="close"
      >
        Components
      </router-link>
    </li>
    <li class="app-menu__separator" />
    <li>
      <a
        href="https://github.com/oreum-space/oreum-ui"
        target="_blank"
      >
        <img
          src="/branding/github-mark.svg"
          alt="github"
        >
      </a>
    </li>
    <li>
      <a
        href="https://discord.com/invite/BxSJjnJFRG"
        target="_blank"
      >
        <img
          src="/branding/discord-mark.svg"
          alt="discord"
        >
      </a>
    </li>
  </menu>
  <keep-alive>
    <app-menu-button
      v-if="mobile"
      v-model="shown"
    />
  </keep-alive>
</template>

<script
  setup
  lang="ts"
>
import AppMenuButton from '@/components/app/AppMenuButton.vue'
import {
  computed,
  inject,
  ref,
  Ref,
  watch
} from 'vue'
import { useRouter } from 'vue-router'

const width = inject<Ref<number>>('width')!
const shown = ref(false)
const mobile = computed(() => width.value <= 512)

useRouter().afterEach(close)

watch(shown, () => {
  if (shown.value) {
    return document.body.classList.add('scrollbar-invisible')
  }
  document.body.classList.remove('scrollbar-invisible')
})

function close () {
  shown.value = false;
}
</script>

<style lang="scss">
.app-menu {
  display: flex;
  list-style-type: none;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    padding: 8px;
    opacity: 1;
    transition: opacity 200ms ease-in-out;
    height: 48px;
    text-decoration: none;
    color: white;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 24px;
      pointer-events: none;
    }
  }

  &__separator {
    width: 2px;
    background: var(--border-color);
    height: 24px;
    border-radius: 1px;
    margin-inline: 16px;
  }

  &_mobile {
    z-index: 70;
    position: fixed;
    top: calc(-100vh - 12px);
    @supports (top: 100lvh) {
      top: calc(-100lvh - 12px);
    }
    left: 0;
    background-color: var(--background-color);
    transition: top ease-in-out 250ms;
    width: 100%;
    height: calc(100% - 48px);
    padding-inline: 16px;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    align-content: flex-start;
    box-shadow: 0 0 12px 12px var(--background-color);

    li {
      display: block;
    }
  }

  &_shown {
    top: 48px;
  }
}
</style>