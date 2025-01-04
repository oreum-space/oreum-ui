import { OIconNames, OIconName } from '@lib/generated/types/icons.ts'
import { ClassProps } from '@lib/utils/ClassProps.ts'

export interface OIconProps extends ClassProps {
  name?: OIconName | string
}

export { OIconNames }
export type { OIconName }
