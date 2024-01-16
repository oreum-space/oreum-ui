<template>
  <o-button
    :class="['app-menu-button', {
      'app-menu-button_active': modelValue
    }]"
    type="icon"
    @click="toggleModelValue"
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8"
        y="15"
        width="16"
        height="2"
        rx="1"
      />
      <rect
        x="8"
        y="15"
        width="16"
        height="2"
        rx="1"
      />
    </svg>
  </o-button>
</template>

<script
  setup
  lang="ts"
>
import { OButton } from 'oreum-ui'
interface MenuButtonProps {
  modelValue: boolean
}

const props = defineProps<MenuButtonProps>()

const emit = defineEmits<{ 'update:model-value': [value: boolean] }>()

function toggleModelValue () {
  emit('update:model-value', !props.modelValue)
}
</script>

<style lang="scss">
.o-button_icon.app-menu-button {
  width: 48px;
  height: 48px;
  margin-inline: -8px;
  border: 0 solid transparent !important;
  &:focus { box-shadow: none }

  svg rect {
    fill: currentColor;
    transition: translate ease-in-out 125ms 125ms, rotate ease-in-out 125ms;
    transform-origin: center center;
  }

  svg rect:nth-child(1) {
    translate: 0 4px;
  }

  svg rect:nth-child(2) {
    translate: 0 -4px;
  }

  &_active svg rect {
    transition: translate ease-in-out 125ms, rotate ease-in-out 125ms 125ms;
  }

  &_active svg rect:nth-child(1) {
    rotate: 45deg;
    translate: 0;
  }

  &_active svg rect:nth-child(2) {
    rotate: -45deg;
    translate: 0;
  }
}
</style>