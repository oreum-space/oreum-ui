<script lang="ts">
class SquaresSettings {
  static readonly initialY = 0
  static readonly squareGap = 3
  static readonly squareSize = 21
  static readonly squareSpace = SquaresSettings.squareGap + SquaresSettings.squareSize
  static readonly shadingFactor = 0.5 // Number between 0 - 1
  static readonly centerY = SquaresSettings.initialY + SquaresSettings.squareSpace / 2
  static readonly colors = '2345678'.split('').map(char => getComputedStyle(document.body).getPropertyValue(`--o-primary-${ char }0`))
}

class Square {
  private readonly controller: SquaresController
  private readonly minOpacity: number
  public readonly maxOpacity: number
  public readonly xStart: number
  public readonly yStart: number

  private speed: number
  private color: string
  private value: number
  private forward: boolean
  private fillStyle: string
  private strokeStyle: string

  private static createRandomSpeed () {
    return 1 / (0xaa + (Math.random() * 0x17f))
  }

  public static numberToHexOpacity (opacity: number): string {
    return Math.floor(opacity * 0xff).toString(16).padStart(2, '0')
  }

  constructor (controller: SquaresController, x: number, y: number) {
    const horizontalDistance = Math.abs(controller.centerX - (x + SquaresSettings.squareSpace * 0.5))
    const verticalDistance = Math.abs(controller.centerY - (y * 1.618 + SquaresSettings.squareSpace * 0.5))
    const distance = Math.sqrt(horizontalDistance ** 2 + verticalDistance ** 2)
    const baseOpacity = 1 - distance / controller.shadingDistance

    this.controller = controller
    this.xStart = +x + SquaresSettings.squareGap * 0.5
    this.yStart = +y + SquaresSettings.squareGap * 0.5
    this.color = SquaresSettings.colors.at(Math.floor(Math.random() * 7))
    this.speed = Square.createRandomSpeed()
    this.value = baseOpacity + (Math.random() * 1.5 - 1)
    this.maxOpacity = baseOpacity + 0.5
    this.minOpacity = baseOpacity - 1
    this.forward = Math.random() >= 0.5
  }

  get opacity () {
    return Math.max(0, Math.min(this.value, 1)) * 0.5
  }

  public drawSquare () {
    const newFillStyle = this.color + Square.numberToHexOpacity(this.opacity / 2)
    const newStrokeStyle = this.color + Square.numberToHexOpacity(this.opacity)

    if (newFillStyle !== this.fillStyle || newStrokeStyle !== this.strokeStyle) {
      this.controller.context.clearRect(this.xStart, this.yStart, SquaresSettings.squareSize, SquaresSettings.squareSize)
      this.controller.context.fillStyle = this.fillStyle = newFillStyle
      this.controller.context.fillRect(this.xStart, this.yStart, SquaresSettings.squareSize, SquaresSettings.squareSize)
      this.controller.context.strokeStyle = this.strokeStyle = newStrokeStyle
      this.controller.context.strokeRect(this.xStart, this.yStart, SquaresSettings.squareSize, SquaresSettings.squareSize)
    }

    this.value += (this.forward ? 1 : -1) * this.speed

    if (this.forward && this.value >= this.maxOpacity) {
      this.speed = Square.createRandomSpeed()
      this.forward = false
    }

    if (!this.forward && this.value <= this.minOpacity) {
      this.color = SquaresSettings.colors.at(Math.floor(Math.random() * 7))
      this.speed = Square.createRandomSpeed()
      this.forward = true
    }
  }
}

class SquaresController {
  private squares: Array<Square> = []
  private readonly canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D

  private width = -1
  private height = -1
  private initialX = 0
  private initialY = SquaresSettings.initialY
  private endX = 0
  private endY = 0
  public centerX = 0
  public centerY = SquaresSettings.centerY
  public shadingDistance = 0

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')!

    this.context.globalCompositeOperation = 'destination-over'
    this.context.imageSmoothingEnabled = false

    window.requestAnimationFrame(() => {
      this.frame()
    })
  }

  private updateSizes () {
    this.width = this.canvas.width = this.canvas.clientWidth - this.canvas.clientWidth % 2
    this.height = this.canvas.height = this.canvas.clientHeight - this.canvas.clientWidth % 2
    this.initialX = Math.round(this.width % SquaresSettings.squareSpace) / 2
    this.endX = this.width - SquaresSettings.squareSpace * 2
    this.endY = this.height - SquaresSettings.squareSpace
    this.centerX = this.width / 2
    this.shadingDistance = this.height * SquaresSettings.shadingFactor
  }

  private updateSquares () {
    let pointerX = this.initialX
    let pointerY = this.initialY

    this.squares = []

    while (pointerY < this.endY) {
      while (pointerX < this.endX) {
        const square = new Square(this, pointerX, pointerY)
        if (square.maxOpacity > 0) {
          this.squares.push(square)
        }
        pointerX += SquaresSettings.squareSpace
      }

      pointerX = this.initialX
      pointerY += SquaresSettings.squareSpace
    }
  }

  private frame () {
    const { clientWidth } = this.canvas

    if (this.width !== clientWidth - clientWidth % 2) {
      this.updateSizes()
      this.updateSquares()
    }

    for (const square of this.squares) {
      square?.drawSquare()
    }

    setTimeout(() => this.frame(), 1000 / 120)
  }
}
</script>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const root = ref<HTMLCanvasElement>()

onMounted(() => {
  new SquaresController(root.value!)
})
</script>

<template>
  <canvas
    ref="root"
    class="app-squares"
  />
</template>

<style lang="scss">
.app-squares {
  position: absolute;

  width: min(1440px, 100vw);
  height: min(720px, 50vw);
  z-index: -42;

  display: block;

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
