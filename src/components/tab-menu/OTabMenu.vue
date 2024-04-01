<template>
  <div
    :class="rootClass"
  >
    <div
      v-for="tab of tabs"
      class="o-tab-menu__tab"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends TabMenuProps"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { IconProps } from '@/components/icon/OIcon.vue'
import { computed } from 'vue'

export interface TabMenuTab {
  id?: number | string,
  label: string,
  disabled?: boolean,
  icon?: IconProps
}

export interface TabMenuProps extends ClassBindingProps {
  modelValue?: T['id'],
  tabs?: Array<T>
}

const props = withDefaults(defineProps<TabMenuProps>({}), {
  modelValue: void 0,
  tabs: []
})

const rootClass = computed(() => [
  'o-tab-menu',
  props.class
])
</script>

<style lang="scss">

</style>