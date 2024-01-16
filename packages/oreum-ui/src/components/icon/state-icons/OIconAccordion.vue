<template>
  <g>
    <rect
      class="o-icon__detail"
      x="4"
      y="11"
      width="9"
      height="2"
      rx="1"
    />
  </g>
  <g>
    <rect
      class="o-icon__detail"
      x="11"
      y="11"
      width="9"
      height="2"
      rx="1"
    />
  </g>
</template>

<style lang="scss">
.o-icon[data-icon-name='accordion'] {
  g, g rect {
    transition: rotate ease-in-out 250ms, translate ease-in-out 250ms;
    transform-origin: center center;
  }

  g { translate: 0 4px }
  g:first-child { clip-path: inset(0 1px 0 0) }
  g:last-child { clip-path: inset(0 0 0 1px) }
  g:first-child rect { rotate: 45deg }
  g:last-child rect { rotate: -45deg }

  &[data-state='true'] g { translate: 0 0 }
  &[data-state='true'] g rect { rotate: 0deg }
}
</style>
