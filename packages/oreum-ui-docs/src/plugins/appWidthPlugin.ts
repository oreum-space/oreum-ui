import {
  Plugin,
  ref
} from 'vue'

export default <Plugin<void>>{
  install (app) {
    const width = ref(window.innerWidth)

    addEventListener('resize', () => width.value = window.innerWidth)

    app.provide('width', width)
  }
}