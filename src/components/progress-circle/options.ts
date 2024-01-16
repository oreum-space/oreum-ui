const SMALL_SIZE = 16
const SMALL_RADIUS = 6
const SMALL_STROKE_WIDTH = 1

const MEDIUM_SIZE = 24
const MEDIUM_RADIUS = 9
const MEDIUM_STROKE_WIDTH = 2

const LARGE_SIZE = 32
const LARGE_RADIUS = 12
const LARGE_STROKE_WIDTH = 2

const TWO_PI = 2 * Math.PI

function createOption (radius: number, strokeWidth: number, size: number) {
  const textSize = size.toString()

  return {
    radius,
    circleLength: TWO_PI * radius,
    attrs: {
      root: { width: textSize, height: textSize },
      circle: { r: radius, 'stroke-width': strokeWidth.toString() }
    } as const
  } as const
}

export default {
  small: createOption(SMALL_SIZE, SMALL_RADIUS, SMALL_STROKE_WIDTH),
  medium: createOption(MEDIUM_SIZE, MEDIUM_RADIUS, MEDIUM_STROKE_WIDTH),
  large: createOption(LARGE_SIZE, LARGE_RADIUS, LARGE_STROKE_WIDTH)
} as const