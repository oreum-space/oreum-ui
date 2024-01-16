<template>
  <o-card
    tag="section"
    clear
  >
    <h1>Accordion</h1>
    <o-accordion>
      <template #header>
        Header
      </template>
      <template #default>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </template>
    </o-accordion>
    <o-accordion disabled>
      <template #header>
        Disabled Header
      </template>
      <template #default>
        Content Disabled
      </template>
    </o-accordion>
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import {
  OAccordion,
  OCard
} from 'oreum-ui'
</script>

<style
  scoped
  lang="scss"
>

</style>