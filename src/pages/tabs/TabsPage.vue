<script setup lang="ts">
import DocWrapper from '@/components/doc/DocWrapper.vue'
import { OTabs, OTabsTab } from '@lib'
import { ref } from 'vue'
import Lorem from '@/utils/Lorem.ts'

const modelValue = ref<OTabsTab<number> | undefined>(undefined)

const tabs = new Array(15).fill(null).map((unused, index): OTabsTab<number> => ({ id: index, label: `${ Lorem.word } ${ index }` }))
</script>

<template>
  <doc-wrapper>
    <section>
      <o-tabs
        v-model="modelValue"
        :tabs="tabs"
      >
        <template #default="{ tab }">
          <span class="o_capitalize">{{ tab.label }}</span>
        </template>
      </o-tabs>
    </section>
  </doc-wrapper>
</template>

<style lang="scss">

</style>
