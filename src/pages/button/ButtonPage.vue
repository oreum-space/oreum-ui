<script setup lang="ts">
import { OButton, OButtonVariants } from '@lib/oreum-ui'
</script>

<template>
  <section class="">
    <div class="doc-card">
      <OButton
        v-for="variant in OButtonVariants"
        :key="variant"
        class="o_capitalize"
        :variant="variant"
        :label="variant"
        />
    </div>
  </section>
</template>

<style lang="scss">
</style>
