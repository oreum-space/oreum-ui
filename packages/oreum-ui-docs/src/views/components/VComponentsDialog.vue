<template>
  <o-card
    tag="section"
    clear
  >
    <h1>Dialog</h1>
    <div id="o-dialog-target" />
    <template v-if="mounted">
      <o-dialog />
    </template>
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import { OCard, ODialog } from 'oreum-ui'
import {
  onMounted,
  ref
} from 'vue'

const mounted = ref(false)

onMounted(() => mounted.value = true)

</script>

<style
  scoped
  lang="scss"
>

</style>