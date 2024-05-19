<template>
  <li
    :class="rootClass"
    role="presentation"
  >
    <a
      ref="menuitemElement"
      :tabindex="tabindex"
      :aria-disabled="props.tab.disabled"
      role="menuitem"
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
>
import OIcon, { IconProps } from '@/components/icon/OIcon.vue'
import {computed, ref} from 'vue'

export interface TabMenuTab {
  id: number | string,
  label: string,
  disabled?: boolean,
  icon?: IconProps['icon']
}

export type TabMenuTabId = TabMenuTab['id']

interface TabMenuTabProps {
  tab: TabMenuTab,
  active: boolean,
  selectedByKeyboard: boolean
}

interface TabMenuTabSlots {
  default (props: { tab: TabMenuTab, active: boolean }): unknown,

  icon (props: { tab: TabMenuTab, active: boolean }): unknown
}

defineOptions({ name: 'OTabMenuTab', inheritAttrs: false })

const props = defineProps<TabMenuTabProps>()

defineSlots<TabMenuTabSlots>()

const emit = defineEmits<{
  'select-tab': [id: TabMenuTabId]
}>()

const menuitemElement = ref<HTMLElement | void>(void 0)

const rootClass = computed(() => [
  'o-tab-menu__tab',
  { 'o-tab-menu__tab_active': props.active },
  { 'o-tab-menu__tab_disabled': props.tab.disabled }
])

const tabindex = computed(() => props.selectedByKeyboard ? '0' : '-1')

function selectTab () {
  if (props.active || props.tab.disabled) return
  emit('select-tab', props.tab.id)
}

defineExpose({
  menuitemElement,
  tab: props.tab
})
</script>
