<template>
  <div class="v-home">
    Home
    <o-icon
      icon="default"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
import { onMounted } from 'vue'
import { OIcon } from 'oreum-ui'

window.console.log('VHome created!')
onMounted(() => window.console.log('VHome mounted!'))
</script>

<style scoped>
</style>