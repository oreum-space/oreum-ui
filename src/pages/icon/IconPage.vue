<script setup lang="ts">
import { OIcon, OIconNames } from '@lib'
</script>

<template>
  <section>
    <div class="doc-card icon-page">
      <h2>IconPage</h2>
      <div class="icon-page__list">
        <div
          v-for="iconName in OIconNames"
          :key="iconName"
          class="icon-page__icon"
        >
          <span>{{ iconName }}</span>
          <o-icon :name="iconName" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.icon-page {
  color: var(--o-ground--text-contrast);
  flex-flow: column;

  &__list {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
  }

  &__icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 80px;
    background-color: var(--o-ground--background-default);
    border-radius: 12px;
    padding-top: 16px;

    span {
      position: absolute;
      font-size: 14px;
      line-height: 16px;
      max-width: 64px;
      overflow: clip;
      text-overflow: ellipsis;
      background-color: var(--o-ground--background-default);
      top: 0;
      transition: var(--transition-duration);
    }

    .o-icon {
      transition: var(--transition-duration);
    }

    &:hover {
      .o-icon {
        scale: 4;
      }

      span {
        max-width: 128px;
        padding-inline: 4px;
        border-radius: 4px;
      }
    }
  }
}
</style>
