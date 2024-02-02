const optionsRaw = {
  'small': {
    'size': 16,
    'radius': 6,
    'thickness': 1
  } as const,
  'medium': {
    'size': 24,
    'radius': 9,
    'thickness': 2
  } as const,
  'large': {
    'size': 32,
    'radius': 12,
    'thickness': 2
  } as const
} as const

const TWO_PI = 2 * Math.PI

interface OptionData {
  size: number,
  radius: number,
  thickness: number
}

class Option {
  readonly radius: number
  readonly circleLength: number
  readonly attrs: {
    readonly root: { width: string, height: string }
    readonly circle: { r: string, 'stroke-width': string }
  }

  constructor ({ size, radius, thickness }: OptionData) {
    const textSize = size.toString()

    this.radius = radius
    this.circleLength = TWO_PI * radius
    this.attrs = {
      root: { width: textSize, height: textSize },
      circle: { r: radius.toString(), 'stroke-width': thickness.toString() }
    }
  }
}

export default {
  small: new Option(optionsRaw.small),
  medium: new Option(optionsRaw.medium),
  large: new Option(optionsRaw.large)
}