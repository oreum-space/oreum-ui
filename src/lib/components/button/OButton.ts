export enum OButtonSizes {
  tiny = 'tiny',
  small = 'small',
  medium = 'medium',
  large = 'large',
  huge = 'huge',
  default = medium
}

export enum OButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  info = 'info',
  warn = 'warn',
  help = 'help',
  danger = 'danger',
  contrast = 'contrast',
  default = primary
}

export interface OButtonProps {
  size?: OButtonSizes,
  variant?: OButtonVariants,
  class?: string | null,
  label?: string,
  text?: boolean,
  rounded?: boolean,
  outlined?: boolean,
  square?: boolean,
  loading?: boolean,
  href?: string,
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export interface OButtonEmits {
  'click': [event: PointerEvent]
}

export interface OButtonSlots {
  default (props: never): unknown
}
