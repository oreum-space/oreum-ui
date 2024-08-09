<script setup lang="ts">
import { inject, onMounted, ref, watch, WritableComputedRef } from 'vue'
import { OTheme } from '../lib/oreum-ui'

const root = ref<HTMLCanvasElement>()

onMounted(() => init(root.value!))

function init (canvas: HTMLCanvasElement) {
  window.requestAnimationFrame(createDraw(canvas))
}

interface Square {
  direction: boolean,
  max: number,
  min: number,
  current: number,
  speed: number
}

const theme = inject<WritableComputedRef<OTheme>>('theme')

let backgroundColor = getComputedStyle(document.body).getPropertyValue('--o-ground--background-default')

watch(theme, () => {
  backgroundColor = getComputedStyle(document.body).getPropertyValue('--o-ground--background-default')
})

function createDraw (canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d")

  context.globalCompositeOperation = 'destination-over'
  context.imageSmoothingEnabled = false

  const colors = [
    getComputedStyle(document.body).getPropertyValue('--o-orange-20'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-30'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-40'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-50'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-60'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-70'),
    getComputedStyle(document.body).getPropertyValue('--o-orange-80')
  ]

  let
    previousWidth = 0,
    previousHeight = 0

  let squares: Array<Array<Square>> = []

  let offsetX = 0

  return function draw () {
    const
      width = canvas.width = canvas.clientWidth,
      height = canvas.height = canvas.clientHeight

    const
      initialX = width % 24 / 2,
      initialY = 2

    let
      x = initialX,
      y = initialY

    const
      maxX = width - 64,
      maxY = height - 64

    const centerX = width / 2
    const maxDistance = height * 0.5

    if (previousWidth !== width || previousHeight !== height) {
      offsetX = (width % 2 === 0) ? 0.5 : 0
      squares = []

      while (y < maxY) {
        const row = []
        squares.push(row)

        while (x < maxX) {
          const baseX = Math.abs(centerX - x)
          const currentDistance = Math.sqrt(baseX ** 2 + (y * 1.75) ** 2)
          const transparency = currentDistance / maxDistance * 0.8

          row.push({
            direction: Math.random() > 0.5,
            max: transparency + 0.75,
            min: transparency - 0.25,
            current: transparency + (Math.random() * 0.6 - 0.2),
            speed: Math.random() * 0.001 + 0.0005,
            color: colors.at(Math.floor(Math.random() * 7))
          })
          x += 24
        }
        x = initialX
        y += 24
      }
      previousWidth = width
      previousHeight = height
    }

    x = initialX
    y = initialY

    let
      xIndex = 0,
      yIndex = 0

    while (y < maxY) {
      while (x < maxX) {
        const square = squares[yIndex][xIndex]

        if (square.min <= 1.2) {
          square.current += (square.direction ? 1 : -1) * square.speed

          if (square.current > square.max || square.current < square.min) {
            square.direction = !square.direction
            square.current += (square.direction ? 1 : -1) * square.speed
            square.speed = Math.random() * 0.001 + 0.0005

            if (square.current >= 1) {
              square.color = colors.at(Math.floor(Math.random() * 7))
            }
          }

          const transparency = Math.floor((1 - Math.min(1, Math.max(-1, square.current))) * 0x80)

          if (transparency >= 1) {
            context.fillStyle = square.color + (Math.floor(transparency / 3).toString(16).padStart(2, '0'))
            context.strokeStyle = square.color + (transparency.toString(16).padStart(2, '0'))
          } else {
            context.fillStyle = backgroundColor + (Math.floor((0x80 - transparency) / 2).toString(16).padStart(2, '0'))
            context.strokeStyle = backgroundColor + ((0x80 - transparency).toString(16).padStart(2, '0'))
          }
          context.fillRect(x + offsetX + 0.5, y + 1, 19, 19)
          context.strokeRect(x + offsetX, y + 0.5, 20, 20)
        }
        x += 24
        xIndex++
      }
      x = initialX
      xIndex = 0
      y += 24
      yIndex++
    }

    setTimeout(draw, 1 / 60)
  }
}
</script>

<template>
  <canvas
    ref="root"
    class="app-background"
  />
</template>

<style lang="scss">
.app-background {
  display: block;
  position: absolute;
  width: 100vw;
  max-width: 1440px;
  height: 50vw;
  max-height: 720px;
  z-index: -128;

  pointer-events: none;
  user-select: none;

  image-rendering: pixelated;

  background-image: radial-gradient(closest-side, color-mix(in srgb, var(--o-primary-50), transparent 90%), var(--o-ground--background-default) 90%);
  background-repeat: no-repeat;
  background-position-y: -25vw;

  @media (min-width: 1440px) {
    left: calc(50vw - 720px);
    background-position-y: -360px;
  }

  @media (max-width: 720px) {
    width: 720px;
    height: 360px;
    left: calc(50vw - 360px);
    background-position-y: -180px;
  }
}
</style>