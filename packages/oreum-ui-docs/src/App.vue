<template>
  <app-header />
  <router-view v-slot="{ Component: RouterViewComponent }">
    <component
      :is="RouterViewComponent"
      class="app-main"
    />
  </router-view>
</template>

<script
  setup
  lang="ts"
>
import { onMounted } from 'vue'
import AppHeader from '@/components/app/AppHeader.vue'

window.console.log('App created!')
onMounted(() => window.console.log('App mounted!'))
</script>

<style lang="scss">
.app-main {
  width: min(100%, var(--app-width));
  margin-inline: auto;
  padding: 72px 24px 24px;
}
</style>
