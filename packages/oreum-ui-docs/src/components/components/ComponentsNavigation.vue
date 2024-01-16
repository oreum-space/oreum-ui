<template>
  <nav class="components-nav">
    <o-button
      class="components-nav__content"
      type="text"
      @click="toggleContent"
    >
      On this page
    </o-button>
    <o-button
      class="components-nav__sidebar"
      type="text"
      @click="toggleSidebar"
    >
      Menu
    </o-button>
  </nav>
  <aside :class="['components-sidebar', { 'components-sidebar_opened': sidebarOpened }]">
    <ul>
      <li
        v-for="component of components"
        :key="component.name"
      >
        <router-link :to="component.path">
          {{ component.name }}
        </router-link>
      </li>
    </ul>
  </aside>
  <span class="components-sidebar__shadow" />
  <aside :class="['components-content', { 'components-content_opened': contentOpened }]">
    Lorem<br>
    Ipsum<br>
    Dolor<br>
    Sit amet<br>
    Consectetur<br>
    Adipisicing<br>
    Elit Aliquid<br>
    Animi<br>
    Corporis<br>
    Deserunt<br>
    Dolore eaque eum<br>
    Explicabo<br>
    Magnam<br>
    Quas<br>
    Saepe
  </aside>
</template>

<script setup lang="ts">
import { OButton } from 'oreum-ui'
import {
  onMounted,
  onUnmounted,
  ref
} from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const sidebarOpened = ref(false)
const contentOpened = ref(false)


function toggleSidebar () {
  if (sidebarOpened.value) return closeSidebar()
  openSidebar()
}

function openSidebar () {
  if (sidebarOpened.value) return
  sidebarOpened.value = true
}

function closeSidebar () {
  if (!sidebarOpened.value) return
  sidebarOpened.value = false
}

function toggleContent () {
  if (contentOpened.value) return closeContent()
  openContent()
}

function openContent () {
  if (contentOpened.value) return
  contentOpened.value = true
}

function closeContent () {
  if (!contentOpened.value) return
  contentOpened.value = false
}

class ComponentUrl {
  name: string
  path: `/components/${ string }`

  constructor (name: string, path?: string) {
    this.name = name
    this.path = `/components/${ path ?? name.toLowerCase() }`
  }
}

const components = [
  new ComponentUrl('Accordion'),
  new ComponentUrl('Avatar'),
  new ComponentUrl('Button'),
  new ComponentUrl('Card'),
  new ComponentUrl('Checkbox'),
  new ComponentUrl('Dialog'),
  new ComponentUrl('Divider'),
  new ComponentUrl('Icon'),
  new ComponentUrl('InputText', 'input-text'),
  new ComponentUrl('Progress'),
]

function clickOutside (event: Event) {
  if (contentOpened.value) {
    let current = event.target

    while (current instanceof HTMLElement) {
      if (current.classList.contains('components-content') || current.classList.contains('components-nav__content')) {
        break
      }
      current = current.parentElement
    }
    if (!(current instanceof HTMLElement)) {
      closeContent()
    }
  }

  if (sidebarOpened.value) {
    let current = event.target

    while (current instanceof HTMLElement) {
      if (current.classList.contains('components-sidebar') || current.classList.contains('components-nav__sidebar')) {
        break
      }
      current = current.parentElement
    }
    if (!(current instanceof HTMLElement)) {
      closeSidebar()
    }
  }
}

onBeforeRouteUpdate(() => {
  closeContent()
  closeSidebar()
})

onMounted(() => addEventListener('pointerup', clickOutside))
onUnmounted(() => removeEventListener('pointerup', clickOutside))
</script>

<style lang="scss">
.components-sidebar {
  position: absolute;
  --min-left: 24px;
  @media (max-width: 512px) {
    --min-left: 16px;
  }
  left: max(var(--min-left), (100vw - var(--app-width)) / 2 + 16px);
  width: 256px;
  top: 48px;
  height: calc(100vh - 48px);
  @supports (width: 1dvh) { height: calc(100dvh - 48px) }
  padding-block: 24px;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  z-index: 50;
  background-color: var(--current-background-color);

  &__shadow {
    position: absolute;
    --min-left: 24px;
    @media (max-width: 512px) {
      --min-left: 16px;
    }
    left: max(var(--min-left), (100vw - var(--app-width)) / 2 + 16px);
    width: calc(256px + 64px);
    @supports (width: 1dvh) { height: calc(100dvh - 48px) }
    translate: -32px 0;
    top: 48px;
    height: calc(100vh - 48px);
    z-index: 50;

    pointer-events: none;
    box-shadow: inset 0 0 12px 12px var(--current-background-color);

    clip-path: inset(0 48px 0 32px); // desktop
    @supports (scrollbar-width: thin) { clip-path: inset(0 49px 0 32px) } // desktop firefox
    @supports (-webkit-overflow-scrolling: touch) { clip-path: inset(0 40px 0 32px) }// mobile

    @media (max-width: 1280px) {
      height: calc(100vh - #{48 + 32}px);
      top: #{48 + 32}px;
    }
  }

  font-size: 24px;
  line-height: 1.5;

  @media (max-width: 1280px) {
    height: calc(100vh - #{48 + 32}px);
    top: #{48 + 32}px;
  }

  @media (max-width: 1024px) {
    transition: left 250ms ease-in-out;

    &:not(&_opened) {
      left: -#{256 + 48}px;
    }
  }

  li {
    list-style-type: none;
  }


  li a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 16px;
    line-height: 1.5;
    transition: opacity 250ms ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }
}


.components-content {
  position: absolute;
  top: 48px;
  height: calc(100vh - 48px);
  @supports (width: 1dvh) { height: calc(100dvh - 48px) }
  width: 256px;
  --min-right: 24px;
  @media (max-width: 512px) {
    --min-right: 16px;
  }
  right: max(var(--min-right), (100vw - var(--app-width)) / 2 + 16px);
  padding: 24px 16px;
  background-color: var(--current-background-color);
  z-index: 50;

  @media (max-width: 1280px) {
    height: calc(100vh - #{48 + 32}px);
    top: #{48 + 32}px;
    transition: top 250ms ease-in-out, opacity 250ms ease-in-out;
    opacity: 1;

    &:not(&_opened) {
      top: 48px;
      opacity: 0;
      pointer-events: none;
    }
  }
}

.components-nav {
  display: none;

  @media (max-width: 1280px) {
    display: flex;
    justify-content: space-between;
    flex-flow: row-reverse;
    position: sticky;
    top: 48px;
    width: 100%;
    background-color: var(--background-color);
    padding-inline: 8px;
    z-index: 60;
    clip-path: inset(-2px 0 -32px 0);

    &::before {
      z-index: -1;
      content: ' ';
      width: 100%;
      height: 32px;
      background: var(--current-background-color);
      box-shadow: 0 0 12px 12px var(--background-color);
      inset: 0;
      position: absolute;
      pointer-events: none;
    }
  }

  &__sidebar.o-button {
    display: none;

    @media (max-width: 1024px) { display: flex }
  }
}
</style>