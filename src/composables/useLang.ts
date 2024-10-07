import { computed, onUnmounted, Ref, ref, watch } from 'vue'
import langs, { LandPageAwaited, LangKeys, LangPageKeys } from '@/langs'

const lang = ref(getLang())
const updatePages: Array<() => Promise<void>> = []

watch(lang, () => {
  for (const updatePage of updatePages) {
    void updatePage()
  }
})

const readonlyLang = computed(() => lang.value)

function setLang (newLang: LangKeys) {
  setTimeout(() => {
    localStorage.setItem('lang', lang.value = newLang)
  })
}

function getLang (): LangKeys {
  const localStorageLang = localStorage.getItem('lang')
  const langKeys = Object.keys(langs)

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

const useLangBase = {
  lang: readonlyLang,
  setLang
}

function useLang<Page extends LangPageKeys | void> (pageName?: Page): Page extends LangPageKeys ? {
  lang: Ref<LangKeys>,
  setLang: typeof setLang,
  page: Ref<LandPageAwaited[Page]>,
  promise: Ref<Promise<void>>
} : {
  lang: Ref<LangKeys>,
  setLang: typeof setLang
} {
  if (pageName) {
    const page = ref<LandPageAwaited[Page]>()

    function updatePage () {
      return new Promise<void>((resolve) => {
        langs[lang.value][pageName]()
          .then((result) => {
            page.value = result.default
          })
          .finally(resolve)
      })
    }

    const promise = ref(updatePage())

    updatePages.push(updatePage)

    onUnmounted(() => updatePages.filter(updater => updatePage !== updater))

    return {
      ...useLangBase,
      setLang: (newLang: LangKeys) => {
        setLang(newLang)
        promise.value = new Promise<void>((resolve) => {
          langs[lang.value][pageName]()
            .then((result) => {
              page.value = result.default
            })
            .finally(resolve)
        })
      },
      page,
      promise
    }
  }

  return useLangBase
}

export default useLang
