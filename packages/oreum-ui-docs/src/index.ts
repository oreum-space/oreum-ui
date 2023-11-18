import { createApp } from 'vue'
import router from '@/router/index'
import App from '@/App.vue'
import 'oreum-ui/oreum-ui.css'
import '@/styles/index.scss'
import oreumIcons from 'oreum-ui/icons.svg'
import { oreumIconsPlugin } from 'oreum-ui'
import appWidthPlugin from '@/plugins/appWidthPlugin'

createApp(App)
  .use(router)
  .use(oreumIconsPlugin, { oreumIcons })
  .use(appWidthPlugin)
  .mount('.app')
