'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Lang } from '@/lib/i18n'
import { translations } from '@/lib/i18n'

type TranslationSet = typeof translations.en | typeof translations.fr

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationSet
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zawios_lang') as Lang | null
      if (stored === 'fr' || stored === 'en') setLangState(stored)
    } catch {}
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('zawios_lang', l) } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
