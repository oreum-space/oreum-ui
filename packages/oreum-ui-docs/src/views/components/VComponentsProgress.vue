<template>
  <o-card
    tag="section"
    clear
  >
    <h1>Progress</h1>

    <h2>Basic</h2>
    <div class="flex align-center">
      <o-progress />
      <o-progress size="medium" />
      <o-progress size="large" />
    </div>

    <h2>Indeterminate</h2>
    <div class="flex align-center">
      <o-progress indeterminate />
      <o-progress
        size="medium"
        indeterminate
      />
      <o-progress
        size="large"
        indeterminate
      />
    </div>

    <h2>Progress</h2>
    <div class="flex align-center">
      <o-progress :progress="range" />
      <o-progress
        size="medium"
        :progress="range"
      />
      <o-progress
        size="large"
        :progress="range"
      />
    </div>

    <h2>Progress With Digits</h2>
    <div class="flex align-center">
      <o-progress
        :progress="range"
        digits
      />
      <o-progress
        size="medium"
        :progress="range"
        digits
      />
      <o-progress
        size="large"
        :progress="range"
        digits
      />
    </div>
    <div class="flex align-center">
      <input
        v-model="range"
        type="range"
        min="0"
        max="1"
        step="0.01"
      >
      <code>
        {{ range }}
      </code>
    </div>
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import {
  OProgress,
  OCard
} from 'oreum-ui'
import { ref } from 'vue'

const range = ref(0.5)
</script>

<style lang="scss">
.flex {
  display: flex;
  gap: 4px;
}
.align-center {
  align-items: center;
}
</style>