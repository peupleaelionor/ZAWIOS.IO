import { copy } from '@/lib/i18n.copy'

export type Lang = 'en' | 'fr'

export const translations = copy

export type Translations = typeof translations
