import type { Locale } from '@/lib/i18n'

export type SlugTranslation = {
  lang: Locale
  slug: string | null
}

export type SlugEntry = {
  slug: string
  _updatedAt: string
  translations: SlugTranslation[] | null
}
