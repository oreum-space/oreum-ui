<script setup lang="ts">
import { useRouter } from 'vue-router'
import useLang from '../composables/useLang'
import { computed } from 'vue'
import { OButton } from '../lib/oreum-ui'

const router = useRouter()

const { page } = useLang('landing')

const title = computed(() => page.value?.title.split('$') ?? [])

function goToSetupPage () {
  router.push('/setup')
}
</script>

<template>
  <main
    v-if="page"
    class="app-main"
  >
    <section class="app-title">
      <h1 class="app-title__header">
        {{ title[0] }}
        <a
          href="https://vuejs.org/"
          class="app-title__vue"
          target="_blank"
        >Vue</a> {{ title[1] }}
        <a
          href="https://www.typescriptlang.org/"
          class="app-title__ts"
          target="_blank"
        >TS</a>
      </h1>
      <p class="app-title__subtitle">
        {{ page.subtitle }}
      </p>
      <div class="app-title__button-row">
        <o-button
          size="large"
          :label="page.start"
          @click="goToSetupPage"
        />
        <o-button
          :label="page.star"
          variant="secondary"
          size="large"
          href="https://github.com/oreum-space/oreum-ui"
          target="_blank"
        />
      </div>
    </section>
    <section class="app-section">
      <div style="width: 4000px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque aut beatae deserunt dolore quo
        tenetur. Consectetur iusto nihil nostrum nulla officia reprehenderit tempora vel. Accusamus animi at culpa
        cumque, debitis deserunt dolor facilis incidunt inventore officiis omnis quas ratione saepe sint, suscipit
        tempore veniam? Assumenda corporis dolorum exercitationem impedit iste laudantium mollitia quo tempora
        temporibus tenetur? A ab, adipisci amet in, labore odit optio perferendis placeat, quae quasi rem vero.
        Distinctio doloribus eum hic obcaecati optio qui saepe sunt temporibus velit veniam. Adipisci alias commodi
        deserunt earum est in nihil officia, perspiciatis sit? Ad dolores eum fugiat officia?
      </div>
      <div style="width: 128px">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias atque aut beatae deserunt dolore quo
        tenetur. Consectetur iusto nihil nostrum nulla officia reprehenderit tempora vel. Accusamus animi at culpa
        cumque, debitis deserunt dolor facilis incidunt inventore officiis omnis quas ratione saepe sint, suscipit
        tempore veniam? Assumenda corporis dolorum exercitationem impedit iste laudantium mollitia quo tempora
        temporibus tenetur? A ab, adipisci amet in, labore odit optio perferendis placeat, quae quasi rem vero.
        Distinctio doloribus eum hic obcaecati optio qui saepe sunt temporibus velit veniam. Adipisci alias commodi
        deserunt earum est in nihil officia, perspiciatis sit? Ad dolores eum fugiat officia?
      </div>
    </section>
  </main>
</template>

<style lang="scss">
.app-title {
  padding-block: 72px;
  background-image: radial-gradient(closest-side, var(--o-ground--background-default), color-mix(in srgb, var(--o-surface-95), transparent 100%) 90%);

  &__header {
    display: block;
    font-size: 42px;
    line-height: 64px;
    text-align: center;
  }

  &__ts,
  &__vue {
    font-weight: 800;
    text-decoration: none;
  }

  &__subtitle {
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    margin-top: 16px;
    white-space: pre-wrap;
  }

  &__button-row {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 24px;
  }
}

.app-subtitle {
  text-align: center;
  font-size: 18px;
  margin-top: 16px;
}
</style>
