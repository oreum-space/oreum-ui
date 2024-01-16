<template>
  <main class="v-home">
    <section class="v-home__hero">
      <h1>
        Oreum UI Vue
        <br>
        Component Library
      </h1>
      <p>
        Comfortable library for building web user interfaces for OreumSpace products.
      </p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.v-home {
  text-align: center;

  &__hero {
    padding-block: 96px;

    h1 {
      font-size: 76px;
      line-height: 1.25;
      font-weight: 800;
      color: transparent;
      background-color: #FBDA61;
      background-image: linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 48px;

      @media (max-width: 1024px) {
        font-size: 64px;
      }

      @media (max-width: 768px) {
        font-size: 48px;
      }

      @media (max-width: 512px) {
        font-size: 36px;
      }
    }

    p {
      font-size: 20px;
      line-height: 32px;
      margin-top: 48px;
      color: var(--description-color);
      font-weight: 500;
    }
  }
}
</style>