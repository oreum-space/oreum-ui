import { LandingLang } from './types/landing'

export type LangPages = {
  landing: () => Promise<{ default: LandingLang }>
}

export type LangKeys = 'en' | 'ru'

const langs: Record<LangKeys, LangPages> = {
  en: {
    landing: () => import('../langs/en/landing')
  } as const,
  ru: {
    landing: () => import('../langs/ru/landing')
  } as const
} as const

export type LangPageKeys = keyof LangPages
export type LandPageAwaited<Page extends LangPageKeys> = Awaited<ReturnType<LangPages[Page]>>

export default langs