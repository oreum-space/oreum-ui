<template>
  <menu
    ref="rootElement"
    :class="rootClass"
    role="menubar"
  >
    <o-tab-menu-tab
      v-for="tab of tabs"
      ref="tabInstances"
      :key="tab.id"
      :tab="tab"
      :active="tab.id === value"
      @select-tab="selectTab"
    >
      <template #default="{ tab: currentTab, active }">
        <slot
          :tab="currentTab"
          :active="active"
        />
      </template>
      <template #icon="{ tab: currentTab, active }">
        <slot
          name="icon"
          :tab="currentTab"
          :active="active"
        />
      </template>
    </o-tab-menu-tab>
    <li
      ref="detailElement"
      role="none"
    />
  </menu>
</template>

<script
  setup
  lang="ts"
  generic="Tab extends TabMenuTab"
>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ClassBindingProps } from '@/types/ClassBindingProps.ts'
import OTabMenuTab, { TabMenuTab, TabMenuTabId } from '@/components/tab-menu/OTabMenuTab.vue'

export interface TabMenuProps extends ClassBindingProps {
  modelValue?: TabMenuTabId
}

interface PrivateTabMenuProps extends TabMenuProps {
  tabs?: Array<Tab>
}

interface TabMenuSlots {
  default (props: { tab: Tab, active: boolean }): unknown,
  icon (props: { tab: Tab, active: boolean }): unknown
}

defineOptions({ name: 'OTabMenuTab', inheritAttrs: false })

const props = withDefaults(defineProps<PrivateTabMenuProps>(), {
  class: void 0,
  modelValue: void 0,
  tabs: () => []
})

defineSlots<TabMenuSlots>()

const emit = defineEmits<{
  'update:model-value': [newModelValue: TabMenuTabId]
}>()

const localValue = ref<TabMenuTabId | void>(props.modelValue ?? void 0)
const tabInstances = ref<Array<InstanceType<typeof OTabMenuTab<Tab>>>>()
const detailElement = ref<HTMLLIElement>()
const rootElement = ref<HTMLMenuElement>()

const rootClass = computed(() => [
  'o-tab-menu',
  props.class
])

const activeTabInstance = computed(() => tabInstances.value?.find(tabInstance => tabInstance.tab.id === value.value))

const value = computed<TabMenuTabId | void>({
  get (): TabMenuTabId | void {
    return props.modelValue ?? localValue.value
  },
  set (value: TabMenuTabId | void): void {
    if (value === void 0) return
    if (props.modelValue === void 0) {
      localValue.value = value
    }
    emit('update:model-value', value)
  }
})

function renderDetailElement () {
  if (!detailElement.value) return
  const style = detailElement.value.style
  if (activeTabInstance.value) {
    style.setProperty('--width', `${ activeTabInstance.value.$el.clientWidth }px`)
    style.setProperty('--left', `${ activeTabInstance.value.$el.offsetLeft }px`)
  } else {
    style.setProperty('--width', '0')
    style.setProperty('--left', '0')
  }
}

function selectTab (newModelValue: TabMenuTabId) {
  value.value = newModelValue
}

onMounted(() => {
  renderDetailElement()
  const observer = new ResizeObserver(renderDetailElement)
  observer.observe(rootElement.value!)
  watch(activeTabInstance, renderDetailElement)
  onUnmounted(() => observer.disconnect())
})
</script>
