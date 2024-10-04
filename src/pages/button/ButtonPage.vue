<script setup lang="ts">
import { OButton } from '../../lib/oreum-ui'

function capitalize (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const OButtonVariants = ['tiny', 'small', 'medium', 'large', 'huge']
</script>

<template>
  <section class="">
    <div class="doc-card">
      <OButton
        v-for="variant of OButtonVariants"
        :key="variant"
        :variant="variant"
        :label="capitalize(variant)"
        />
    </div>
  </section>
</template>

<style lang="scss">
</style>
