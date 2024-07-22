<script setup lang="ts">
interface DocumentTemplateSubitem {
  name: string,
  route: string
}

interface DocItemBase {
  name: string
}

interface DocItemWithChildren extends DocItemBase {
  children: Array<DocumentTemplateSubitem>
}

interface DocumentTemplateItemWithRoute extends DocItemBase {
  route: string
}

type DocItem = DocItemWithChildren | DocumentTemplateItemWithRoute

const MENU_ITEMS: DocItem = [
  {
    name: 'Setup'
  }
]
</script>

<template>
  <main class="app-main app-main_document">
    <menu class="app-menu">
      <li v-for="item of MENU_ITEMS">
        {{ item.name }}
      </li>
    </menu>
    <slot />
  </main>
</template>

<style lang="scss">

</style>