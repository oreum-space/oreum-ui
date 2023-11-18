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
  Ref
} from 'vue'

const width = inject<Ref<number>>('width')
const shown = ref(false)
const mobile = computed(() => width.value <= 512)
</script>

<style lang="scss">
.app-menu {
  display: flex;
  list-style-type: none;

  a {
    display: flex;
    align-items: center;
    padding: 8px;
    opacity: 1;
    transition: opacity 200ms ease-in-out;
    height: 48px;

    &:hover {
      opacity: 0.8;
    }

    img {
      width: 24px;
      pointer-events: none;
    }
  }

  &_mobile {
    position: fixed;
    top: 48px;
    left: calc(100% + 12px);
    background-color: var(--background-color);
    // box-shadow: 0 0 12px 12px var(--background-color);
    transition: left ease-in-out 250ms;
    width: 100%;
    height: calc(100% - 48px);
    padding: 4px;
  }

  &_shown {
    left: 0;
  }
}
</style>