import {
  stateIcons,
  STATE_ICONS,
  LARGE_STATE_ICONS
} from './state-icons'

export type Icon = typeof Icons.ICONS [number]

export default class Icons {
  static STATIC_LARGE_ICONS = ['menu', 'menu-close'] as const
  static LARGE_ICONS = [...this.STATIC_LARGE_ICONS, ...LARGE_STATE_ICONS] as const
  static STATIC_ICONS = [
    'components',
    'default',
    'plus',
    'close',
    'minimize',
    'arrow',
    'check',
    'show',
    'hide',
    'indeterminate',
    ...this.STATIC_LARGE_ICONS
  ] as const
  static STATE_ICONS = STATE_ICONS
  static ICONS = [...this.STATIC_ICONS, ...this.STATE_ICONS] as const

  static isIcon (string: string): string is Icon {
    return this.ICONS.some((icon) => icon === string)
  }

  static isStateIcon (icon: Icon): boolean {
    return this.STATE_ICONS.some((stateIcon) => stateIcon === icon)
  }

  static isLargeIcon (icon: Icon): boolean {
    return this.LARGE_ICONS.some((largeIcon) => largeIcon === icon)
  }

  static getComponentByIcon (icon: Icon) {
    return stateIcons.find((stateIcon) => stateIcon.name === icon)?.component || null
  }
}