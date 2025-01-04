import { Ref, ref, watch } from 'vue'
import langs, { LandPageAwaited, LangKeys, LangPageKeys } from '@/langs'
import useLangSettings from '@/composables/useLangSettings.ts'

interface UseLangReturn<Page extends LangPageKeys> {
  lang: Ref<LangKeys>,
  setLang: ReturnType<typeof useLangSettings>['setLang'],
  page: Ref<LandPageAwaited<Page>['default'] | void>,
}

export default function useLang<Page extends LangPageKeys> (pageName: Page): UseLangReturn<Page> {
  const page = ref<LandPageAwaited<Page>['default']>()

  const {
    lang,
    setLang
  } = useLangSettings()

  async function updatePage () {
    if (langs[lang.value][pageName]) {
      page.value = (await langs[lang.value][pageName]()).default
    }
  }

  void updatePage()

  watch(lang, updatePage)

  return {
    page,
    lang,
    setLang
  }
}
