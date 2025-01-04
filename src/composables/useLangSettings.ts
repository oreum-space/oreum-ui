import { computed, ref } from 'vue'
import langs, { LangKeys } from '@/langs'

function setLang (newLang: LangKeys): void {
  setTimeout(() => {
    localStorage.setItem('lang', currentLang.value = newLang)
  })
}

function getLang (): LangKeys {
  const localStorageLang = localStorage.getItem('lang')
  const langKeys = Object.keys(langs) as Array<keyof typeof langs>

  if (localStorageLang) {
    for (const langKey of langKeys) {
      if (localStorageLang.includes(langKey)) {
        return langKey
      }
    }
  }

  const navigatorLanguage = navigator.language

  for (const langKey of langKeys) {
    if (navigatorLanguage.includes(langKey)) {
      setLang(langKey)
      return langKey
    }
  }

  setLang('en')
  return 'en'
}

const currentLang = ref(getLang())
const lang = computed(() => currentLang.value)

export default function useLangSettings () {
  return {
    lang,
    setLang
  }
}