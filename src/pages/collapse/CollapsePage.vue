<script setup lang="ts">
import { OButton, OCollapse } from '@lib'
import { useTemplateRef } from 'vue'

const collapses = useTemplateRef<InstanceType<typeof OCollapse>[]>('collapses')

const components = [
  { horizontal: false, end: false },
  { horizontal: false, end: true },
  { horizontal: true, end: false },
  { horizontal: true, end: true }
].map((component, index) => ({
  index,
  props: {
    horizontal: component.horizontal,
    end: component.end
  }
}))

function toggle (collapseIndex: number) {
  collapses.value[collapseIndex]!.toggle()
}

function open (collapseIndex: number) {
  collapses.value[collapseIndex]!.open()
}

function close (collapseIndex: number) {
  collapses.value[collapseIndex]!.close()
}
</script>

<template>
  <section>
    <div
      v-for="component of components"
      :key="component.index"
      class="doc-card"
    >
      <div class="collapse-page__tower">
        <div class="collapse-page__flex">
          <o-button
            label="toggle"
            @click="toggle(component.index)"
          />
          <o-button
            label="open"
            @click="open(component.index)"
          />
          <o-button
            label="close"
            @click="close(component.index)"
          />
        </div>
        <o-collapse
          ref="collapses"
          :horizontal="component.props.horizontal"
          :end="component.props.end"
          opened
          initial
        >
          <div class="collapse-page__content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur consequatur, distinctio eveniet ex laborum laudantium obcaecati quae reiciendis repellat.
          </div>
        </o-collapse>
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
    padding: 4px 8px;
    background-color: var(--o-ground--text-default);
    color: var(--o-ground--background-default);
    margin-top: 8px;
    width: 200px;
  }
}
</style>
