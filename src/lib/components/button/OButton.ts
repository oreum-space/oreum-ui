import EmptyObject from '@lib/utils/EmptyObject.ts'
import { ClassProps } from '@lib/utils/ClassProps.ts'

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

export interface OButtonProps extends ClassProps {
  size?: OButtonSizes,
  variant?: OButtonVariants,
  label?: string,
  text?: boolean,
  rounded?: boolean,
  outlined?: boolean,
  square?: boolean,
  loading?: boolean,
  href?: string,
  target?: '_blank' | '_self' | '_parent' | '_top'
}

export type OButtonEmits = {
  click: [event: PointerEvent]
}

export type OButtonSlots = {
  default (props: EmptyObject): unknown
}
