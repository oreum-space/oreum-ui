<script setup lang="ts">

</script>

<template>
  <aside class="doc-tabs">
    <ul>
      <li>
        tab
      </li>
      <li>
        tab
      </li>
    </ul>
  </aside>
  <main class="doc-view">
    <article>
      <header>
        <h1>
          <slot name="header" />
        </h1>
      </header>
      <p>
        <slot name="subheader" />
      </p>
      <slot />
    </article>
  </main>
  <aside class="doc-side">
    <ul>
      text
    </ul>
  </aside>
</template>

<style lang="scss">
.doc-tabs {
  grid-area: tabs;
}

.doc-view {
  grid-area: view;
}

.doc-side {
  grid-area: side;
}
</style>
