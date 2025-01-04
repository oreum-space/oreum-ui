import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { themes } from './lib'

import './styles/index.scss'

createApp(App)
  .use(themes, { default: 'dark' })
  .use(router)
  .mount('body')
