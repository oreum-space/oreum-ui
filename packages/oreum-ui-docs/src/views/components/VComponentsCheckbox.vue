<template>
  <o-card
    tag="section"
    clear
  >
    <h1>Checkbox</h1>
    <o-checkbox>
      Basic
    </o-checkbox>
    <o-checkbox :model-value="true">
      Selected
    </o-checkbox>
    <o-checkbox model-value="indeterminate">
      Indeterminate
    </o-checkbox>

    <o-checkbox disabled>
      Basic Disabled
    </o-checkbox>
    <o-checkbox
      :model-value="true"
      disabled
    >
      Selected Disabled
    </o-checkbox>
    <o-checkbox
      model-value="indeterminate"
      disabled
    >
      Indeterminate Disabled
    </o-checkbox>
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import {
  OCheckbox,
  OCard
} from 'oreum-ui'
</script>

<style
  scoped
  lang="scss"
>

</style>