import './styles/index.scss'

import OButton from './components/button/OButton.vue'
import themes, { Theme } from './plugins/themes.ts'

export type OTheme = Theme

export {
  OButton,
  themes
}
