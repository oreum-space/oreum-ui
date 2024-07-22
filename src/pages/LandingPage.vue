<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToSetupPage () {
  router.push('/setup')
}
</script>

<template>
  <main class="app-main">
    <section class="app-title">
      <h1 class="app-title__header">
        The Modern UI Library for
        <a
          href="https://vuejs.org/"
          class="app-title__vue"
        >Vue</a> with
        <a
          href="https://www.typescriptlang.org/"
          class="app-title__ts"
        >TS</a>
      </h1>
      <p class="app-title__subtitle">
        A user-friendly component library for fast and efficient development<br> with high TypeScript support and
        attention to detail for all devices.
      </p>
      <div class="app-title__button-row">
        <button @click="goToSetupPage">
          Get Started ▶️
        </button>

        <button>
          Gift a Star ⭐
        </button>
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
  background-image: radial-gradient(closest-side, var(--o-surface-95), color-mix(in srgb, var(--o-surface-95), transparent 100%) 90%);

  &__header {
    display: block;
    font-size: 42px;
    text-align: center;
  }

  &__vue {
    color: var(--o-emerald-50);
    font-weight: 800;
    text-decoration: none;
  }

  &__ts {
    color: var(--o-blue-50);
    font-weight: 800;
    text-decoration: none;
  }

  &__subtitle {
    text-align: center;
    font-size: 18px;
    margin-top: 16px;
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