<script
  setup
  lang="ts"
  generic="Data extends { [key: string]: string | number | boolean | object }"
>
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import { computed } from 'vue'

interface TableProps extends ClassBindingProps {
  columns?: Array<{
    label: string,
    key: Exclude<keyof Data, symbol>
  }>
  rows?: Array<Data>
}

interface TableSlots {
  [key: `row-${ string }`]: (props: { value: string | number | boolean | object }) => unknown
}

defineOptions({ name: 'OTable', inheritAttrs: false })

const props = withDefaults(defineProps<TableProps>(), {
  columns: void 0,
  rows: void 0
})

defineSlots<TableSlots>()

const rootClass = computed(() => [
  'o-table',
  props.class
])
</script>

<template>
  <table :class="rootClass">
    <thead v-if="columns">
      <tr>
        <th
          v-for="column of columns"
          :key="column.key"
        >
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) of rows"
        :key="index"
      >
        <td
          v-for="column of columns"
          :key="column.key"
        >
          <slot
            :name="`row-${ column.key }`"
            :value="row[column.key]"
          >
            {{ row[column.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
