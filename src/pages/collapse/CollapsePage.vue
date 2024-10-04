<script setup lang="ts">
import { OButton, OCollapse } from '@lib/oreum-ui'
import { ref } from 'vue'

const collapse = ref<InstanceType<typeof OCollapse>>()

function toggle () {
  collapse.value!.toggle()
}

function open () {
  collapse.value!.open()
}

function close () {
  collapse.value!.close()
}
</script>

<template>
  <section>
    <div class="doc-card">
      <div class="collapse-page__tower">
        <div class="collapse-page__flex">
          <OButton
            label="toggle"
            @click="toggle"
          />
          <OButton
            label="open"
            @click="open"
          />
          <OButton
            label="close"
            @click="close"
          />
        </div>
        <OCollapse
          ref="collapse"
          opened
          initial
        >
          <div class="collapse-page__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur consequatur, distinctio eveniet ex laborum laudantium obcaecati quae reiciendis repellat.
          </div>
        </OCollapse>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.collapse-page {
  &__tower {
    display: block;
  }

  &__flex {
    display: flex;
    gap: 8px;
  }

  &__content {
    background-color: var(--o-ground--text-default);
    color: var(--o-ground--background-default);
    margin-top: 8px;
  }
}
</style>
