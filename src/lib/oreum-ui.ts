import '@lib/styles/index.scss'

//  Components  OButton
import OButton from '@lib/components/button/OButton.vue'
import { OButtonSizes, OButtonVariants } from '@lib/components/button/OButton.ts'
export { OButton, OButtonSizes, OButtonVariants }

//  Plugin      Theme
import themes, { Theme } from './plugins/themes.ts'
export type OTheme = Theme
export { themes }
