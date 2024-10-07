import { ObjectPlugin } from 'vue'
import { computed, ref } from 'vue'

export type Theme = 'dark' | 'light'

const globalTheme = ref<Theme | void>(void 0)

function setTheme (theme: Theme) {
  globalTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)
}

function setThemeManual (theme: Theme): void {
  localStorage.setItem('theme', theme)
  setTheme(theme)
}

function getThemeFromMedia (): Theme | void {
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light'
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
}

const themes: ObjectPlugin<[{
  default: Theme
  ignoreMedia?: boolean
}]> = {
  install (app, options) {
    function updateColorScheme (): void {
      switch (localStorage.getItem('theme')) {
        case 'dark':
          setTheme('dark')
          break
        case 'light':
          setTheme('light')
          break
        default:
          setTheme((options?.ignoreMedia ? void 0 : getThemeFromMedia()) ?? options?.default ?? 'dark')
          break
      }
    }

    if (!options?.ignoreMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem('theme')) {
          updateColorScheme()
        }
      })
    }

    app.provide('theme', computed({
      get: () => globalTheme.value,
      set: setThemeManual
    }))

    updateColorScheme()
  }
}

export default themes
