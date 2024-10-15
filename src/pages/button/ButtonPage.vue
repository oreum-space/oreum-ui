<script setup lang="ts">
import { OButton, OButtonSizes, OButtonVariants } from '@lib'
import DocWrapper from '@/components/doc/DocWrapper.vue'

function excludeDefault <T> (_enum: T): T {
  return Object.fromEntries(Object.entries(_enum).filter(([key]) => key !== 'default')) as T
}

const sizes = excludeDefault(OButtonSizes)
const variants = excludeDefault(OButtonVariants)
</script>

<template>
  <doc-wrapper>
    <section>
      <div
        v-for="size in sizes"
        :key="size"
        class="doc-card"
      >
        {{ size }}
        <o-button
          v-for="variant in variants"
          :key="variant"
          :size="size"
          class="o_capitalize"
          :variant="variant"
          :label="variant"
        />
      </div>
    </section>
  </doc-wrapper>
</template>

<style lang="scss">
</style>
