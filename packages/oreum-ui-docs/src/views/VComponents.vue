<template>
  <main class="v-components">
    VComponents
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component
          :is="Component"
          class="v-components__view"
        />
      </template>
      <div
        v-else
        class="v-components__view"
      >
        default
      </div>
    </router-view>
  </main>
</template>

<script
  setup
  lang="ts"
>

</script>

<style scoped>

</style>