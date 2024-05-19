<template>
  <menu
    ref="rootElement"
    :class="rootClass"
    role="menubar"
    @keydown.right.prevent="keyboardSelect(1, true)"
    @keydown.left.prevent="keyboardSelect(-1, true)"
    @keydown.home.prevent="keyboardSelect(0)"
    @keydown.end.prevent="keyboardSelect(-1)"
    @keydown.space.enter.prevent="selectByKeyboard"
    @blur="keyboardReset"
  >
    <o-tab-menu-tab
      v-for="tab of tabs"
      ref="tabInstances"
      :key="tab.id"
      :tab="tab"
      :active="tab.id === value"
      :selected-by-keyboard="tab.id === keyboardValue"
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
  default (props: { tab: TabMenuTab, active: boolean }): unknown,
  icon (props: { tab: TabMenuTab, active: boolean }): unknown
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

const localValue = ref<TabMenuTabId | void>(props.modelValue ?? props.tabs.at(0)?.id ?? void 0)
const keyboardValue = ref<TabMenuTabId | void>(localValue.value)
const tabInstances = ref<Array<InstanceType<typeof OTabMenuTab>>>()
const detailElement = ref<HTMLLIElement>()
const rootElement = ref<HTMLMenuElement>()

const rootClass = computed(() => [
  'o-tab-menu',
  props.class
])

const enabledTabs = computed(() => props.tabs?.filter((tab) => !tab.disabled) ?? [])
const activeTabInstance = computed<InstanceType<typeof OTabMenuTab> | void>(() => tabInstances.value?.find(tabInstance => tabInstance.tab.id === value.value))
const keyboardTabInstance = computed<InstanceType<typeof OTabMenuTab> | void>(() => tabInstances.value?.find(tabInstance => tabInstance.tab.id === keyboardValue.value))

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

function hideShadows () {
  const { style } = rootElement.value!
  style.setProperty('--shadow-left', '0')
  style.setProperty('--shadow-right', '0')
}

let isScrollHandling = false
function updateShadows () {
  const { style } = rootElement.value!
  const { scrollLeft, scrollWidth, clientWidth } = rootElement.value!
  style.setProperty('--shadow-left', String(+(scrollLeft >= 1)))
  style.setProperty('--shadow-right', String(+(scrollLeft <= scrollWidth - clientWidth - 1)))
}

function renderShadows () {
  if (!isScrollHandling) {
    if (rootElement.value!.clientWidth < rootElement.value!.scrollWidth) {
      isScrollHandling = true
      rootElement.value!.addEventListener('scroll', updateShadows)
      updateShadows()
    }
  } else {
    if (rootElement.value!.clientWidth >= rootElement.value!.scrollWidth) {
      isScrollHandling = false
      rootElement.value!.removeEventListener('scroll', updateShadows)
      hideShadows()
    }
  }
}

function renderDetailElement () {
  const { style } = detailElement.value!
  style.setProperty('--width', `${ activeTabInstance.value?.$el.clientWidth ?? 0 }px`)
  style.setProperty('--left', `${ activeTabInstance.value?.$el.offsetLeft ?? 0 }px`)
  const lastElement: HTMLElement = (Array.isArray(tabInstances.value) ? tabInstances.value.at(-1) : tabInstances.value)?.$el

  if (lastElement) {
    style.setProperty('--content-width', `${ lastElement.clientWidth + lastElement.offsetLeft }px`)
  }
  renderShadows()
}

function scrollToActiveTab () {
  const view = rootElement.value!
  const { $el: element } = keyboardTabInstance.value!

  if (view.scrollLeft + view.clientWidth < element.offsetLeft + element.clientWidth) {
    rootElement.value!.scrollTo({ left: element.offsetLeft + element.clientWidth - view.clientWidth + 16, behavior: 'smooth' })
  }
  if (view.scrollLeft > element.offsetLeft) {
    rootElement.value!.scrollTo({ left: element.offsetLeft - 16, behavior: 'smooth' })
  }
}

function selectTab (newModelValue: TabMenuTabId) {
  value.value = newModelValue
  keyboardReset()
  scrollToActiveTab()
}

function selectByKeyboard () {
  keyboardValue.value !== void 0 && selectTab(keyboardValue.value)
}

function getIndexById (id: TabMenuTabId) {
  return enabledTabs.value.findIndex((tab) => tab.id === id)
}

function keyboardSelect (offset: number, useIndex = false) {
  if (keyboardValue.value !== void 0) {
    const index = getIndexById(keyboardValue.value)
    if (useIndex && offset <= 0 ? index <= 0 : index === -1 || index >= props.tabs.length) return

    const newValue = enabledTabs.value.at(useIndex ? index + offset : offset)
    if (!newValue) return
    keyboardValue.value = newValue.id
    scrollToActiveTab()
    tabInstances.value?.find((tabInstance) => tabInstance.tab.id === newValue.id)?.menuitemElement?.focus()
  }
}

function keyboardReset () {
  keyboardValue.value = value.value
}

onMounted(() => {
  renderDetailElement()
  const observer = new ResizeObserver(renderDetailElement)
  observer.observe(rootElement.value!)
  requestAnimationFrame(() => rootElement.value?.style.setProperty('--duration', '250ms'))
  watch(activeTabInstance, renderDetailElement)
  onUnmounted(() => observer.disconnect())
})
</script>
