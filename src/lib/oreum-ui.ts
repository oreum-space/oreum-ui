import '@lib/styles/index.scss'

//  Components  OCollapse
import OCollapse from '@lib/components/collapse/OCollapse.vue'
export { OCollapse }
import { OCollapseEmits, OCollapseModelValue, OCollapseProps, OCollapseSlots } from '@lib/components/collapse/OCollapse.ts'
export type { OCollapseEmits, OCollapseModelValue, OCollapseProps, OCollapseSlots }

//  Components  OButton
import OButton from '@lib/components/button/OButton.vue'
import { OButtonSizes, OButtonVariants } from '@lib/components/button/OButton.ts'
export { OButton, OButtonSizes, OButtonVariants }
import { OButtonProps, OButtonEmits, OButtonSlots } from '@lib/components/button/OButton.ts'
export type { OButtonProps, OButtonEmits, OButtonSlots }

//  Plugin      Theme
import themes, { Theme } from './plugins/themes.ts'
export type OTheme = Theme
export { themes }
