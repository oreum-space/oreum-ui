export const LARGE_ICONS = ['menu', 'menu-close'] as const
export const STATE_ICONS = ['shown'] as const
export const STATIC_ICONS = [
  'default',
  'plus',
  'close',
  'minimize',
  'arrow',
  'check',
  'show',
  'hide',
  'indeterminate',
  ...LARGE_ICONS
] as const
const ICONS = [
  ...STATIC_ICONS,
  ...STATE_ICONS
] as const

export default ICONS