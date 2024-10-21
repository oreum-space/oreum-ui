<script setup lang="ts" generic="TabIds extends string">
import '@lib/components/tabs/OTabs.scss'
import noAttrs from '@lib/utils/noAttrs.ts'
import { OTabsModelValue, OTabsProps, OTabsSlots, OTabsTab } from '@lib/components/tabs/OTabs.ts'
import { computed, useTemplateRef, watch } from 'vue'

defineOptions(noAttrs('OTabs'))

const modelValue = defineModel<OTabsModelValue<TabIds>>('modelValue', { default: undefined })

const props = withDefaults(defineProps<OTabsProps<TabIds>>(), {
  tabs: () => []
})

const listItems = useTemplateRef<Array<HTMLLIElement>>('list-items')
const currentListItem = computed<HTMLLIElement | null>(() => {
  if (!Array.isArray(listItems.value) || !listItems.value.length || modelValue.value === void 0) {
    return null
  }

  const index = props.tabs.findIndex(tab => tab.id === modelValue.value)

  if (index === -1) {
    return null
  }

  return listItems.value[index]
})

const rootClass = computed(() => ['o-tabs', props.class])
const rootStyle = computed(() => ({
  '--o-tabs--left': `${ currentListItem.value?.offsetLeft ?? 0 }px`,
  '--o-tabs--width': `${ currentListItem.value?.clientWidth ?? 0 }px`,
  '--o-tabs--opacity': `${ +!!currentListItem.value }`
}))

defineSlots<OTabsSlots<TabIds>>()

watch(currentListItem, scrollToCurrentElement)

function scrollToCurrentElement () {
  if (!currentListItem.value) {
    return
  }

  if (currentListItem.value.offsetLeft < currentListItem.value.parentElement.scrollLeft) {
    currentListItem.value.parentElement.scrollTo({
      left: currentListItem.value.offsetLeft,
      behavior: 'smooth'
    })
  }

  if (
    currentListItem.value.offsetLeft + currentListItem.value.clientWidth >
    currentListItem.value.parentElement.scrollLeft + currentListItem.value.parentElement?.clientWidth
  ) {
    currentListItem.value.parentElement.scrollTo({
      left: currentListItem.value.offsetLeft + currentListItem.value.clientWidth - currentListItem.value.parentElement?.clientWidth,
      behavior: 'smooth'
    })
  }
}

function selectTab (tab: OTabsTab<TabIds>) {
  modelValue.value = tab.id
}
</script>

<template>
  <menu
    :class="rootClass"
    :style="rootStyle"
  >
    <li
      v-for="tab of tabs"
      :key="tab.id"
      ref="list-items"
      :class="['o-tabs__item', { 'o-tabs__item_current': tab.id === modelValue }]"
    >
      <button
        class="o-tabs__button"
        @click="selectTab(tab)"
      >
        <slot
          :name="`tab-${ tab.id }`"
          :tab="tab"
        >
          <slot
            name="default"
            :tab="tab"
          >
            {{ tab.label }}
          </slot>
        </slot>
      </button>
    </li>
  </menu>
</template>
