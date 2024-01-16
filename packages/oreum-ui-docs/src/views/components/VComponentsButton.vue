<template>
  <o-card
    tag="section"
    clear
  >
    <h1>
      Button
    </h1>
    <o-button>
      Default
    </o-button>
    <o-button primary>
      Primary
    </o-button>
    <o-button type="text">
      Text
    </o-button>
    <o-button
      type="icon"
      icon="default"
    />
    <o-button
      primary
      async
      :progress="sending"
      @click="send"
    >
      Async
    </o-button>
    <o-button
      primary
      async
      :progress="progress"
      @click="process"
    >
      Async with progress
    </o-button>
  </o-card>
</template>

<script
  setup
  lang="ts"
>
import {
  OButton,
  OCard
} from 'oreum-ui'
import { ref } from 'vue'

const sending = ref(false)

function send () {
  if (sending.value) return
  sending.value = true
  setTimeout(() => sending.value = false, 2000)
}

const progress = ref<number>(NaN)

function process () {
  if (!isNaN(progress.value)) return
  progress.value = 0

  const intervalId = window.setInterval(() => {
    if (progress.value === 1) {
      window.clearInterval(intervalId)
      progress.value = NaN
      return
    }
    progress.value = Math.min(1, <number>progress.value + Math.max(Math.random() * 0.25, 0.1))
  }, 250)
}
</script>

<style
  scoped
  lang="scss"
>

</style>