import '@lib/styles/index.scss'

//  Components  OCollapse
import OCollapse from '@lib/components/collapse/OCollapse.vue'
export { OCollapse }

//  Components  OButton
import OButton from '@lib/components/button/OButton.vue'
import { OButtonSizes, OButtonVariants } from '@lib/components/button/OButton.ts'
export { OButton, OButtonSizes, OButtonVariants }
import type { OButtonProps, OButtonEmits, OButtonSlots } from '@lib/components/button/OButton.ts'
export type { OButtonProps, OButtonEmits, OButtonSlots }

//  Plugin      Theme
import themes, { Theme } from './plugins/themes.ts'
export type OTheme = Theme
export { themes }
