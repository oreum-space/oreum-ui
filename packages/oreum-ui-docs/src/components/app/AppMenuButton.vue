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
        y="10"
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
      <rect
        x="8"
        y="20"
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
.app-menu-button {
  width: 40px;
  height: 40px;
  padding: 4px;
  border: 0 solid transparent !important;

  svg {
    transition: rotate ease-in-out 250ms;

    rect {
      fill: currentColor;
      transition: ease-in-out 250ms;
      transform-origin: center;
    }
  }

  &_active svg {
    rotate: 45deg;
  }

  &_active svg rect {
    &:nth-child(1) {
      translate: 0 5px;
    }

    &:nth-child(2) {
      rotate: -90deg;
    }

    &:nth-child(3) {
      translate: 0 -5px;
      opacity: 0;
    }
  }
}
</style>