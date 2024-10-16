import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.scss'
import { themes } from './lib'

createApp(App)
  .use(themes, { default: 'dark' })
  .use(router)
  .mount('body')
