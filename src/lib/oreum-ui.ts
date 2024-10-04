import './styles/index.scss'

import OButton, { OButtonSizes as _OButtonSizes, OButtonVariants as _OButtonVariants } from './components/button/OButton.vue'
import themes, { Theme } from './plugins/themes.ts'

export type OTheme = Theme

export type OButtonSizes = _OButtonSizes
export type OButtonVariants = _OButtonVariants

export {
  OButton,
  themes
}
