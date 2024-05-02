<template>
  <li
    :class="rootClass"
    role="menuitem"
  >
    <a
      :tabindex="tabindex"
      :aria-disabled="props.tab.disabled"
      @click="selectTab"
    >
      <slot
        :tab="props.tab"
        :active="active"
      >
        <slot
          name="icon"
          :tab="props.tab"
          :active="active"
        >
          <o-icon
            v-if="props.tab.icon"
            :icon="props.tab.icon"
          />
        </slot>
        {{ props.tab.label }}
      </slot>
    </a>
  </li>
</template>

<script
  setup
  lang="ts"
  generic="Tab extends TabMenuTab"
>
import OIcon, { IconProps } from '@/components/icon/OIcon.vue'
import { computed } from 'vue'

export interface TabMenuTab {
  id: number | string,
  label: string,
  disabled?: boolean,
  icon?: IconProps['icon']
}

export type TabMenuTabId = TabMenuTab['id']

interface TabMenuTabProps {
  tab: Tab,
  active: boolean
}

interface TabMenuTabSlots {
  default (props: { tab: Tab, active: boolean }): unknown,

  icon (props: { tab: Tab, active: boolean }): unknown
}

defineOptions({ name: 'OTabMenuTab', inheritAttrs: false })

const props = defineProps<TabMenuTabProps>()

defineSlots<TabMenuTabSlots>()

const emit = defineEmits<{
  'select-tab': [id: TabMenuTabId]
}>()

const rootClass = computed(() => [
  'o-tab-menu__tab',
  { 'o-tab-menu__tab_active': props.active },
  { 'o-tab-menu__tab_disabled': props.tab.disabled }
])

const tabindex = computed(() => props.active ? '0' : '-1')

function selectTab () {
  if (props.active || props.tab.disabled) return
  emit('select-tab', props.tab.id)
}
</script>
