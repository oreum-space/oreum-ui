<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goToHome () {
  router.push('/')
}
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__content">
      <picture
        class="app-footer__logo app-logo"
        @click="goToHome"
      >
        <source
          srcset="../../assets/oreum-ui-compact.svg"
          media="(max-width: 600px)"
          width="78"
        >
        <img
          src="../../assets/oreum-ui.svg"
          alt="Oreum UI logo"
          width="195"
          height="24"
          role="link"
        >
      </picture>
    </div>
  </footer>
</template>

<style lang="scss">
.app-footer {
  display: flex;
  justify-content: center;
  width: 100%;
  backdrop-filter: blur(0);
  grid-area: f;

  &__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-block: 12px;
    max-width: var(--content-width);
    padding-inline: var(--content-padding);
  }

  &__logo img {
    opacity: 0.6;
  }
}
</style>
