export const LANGUAGES = [
  { id: 'fr', title: 'Français' },
  { id: 'en', title: 'English' },
] as const

export const DEFAULT_LANGUAGE = 'fr'

export type Language = (typeof LANGUAGES)[number]['id']

/**
 * Schemas à traduire par document — pour @sanity/document-internationalization.
 * `author` est volontairement omis (un auteur est le même dans toutes les langues).
 */
export const TRANSLATABLE_TYPES = [
  'siteSettings',
  'page',
  'bonCadeauPage',
  'post',
  'category',
  'pilot',
  'formula',
  'faq',
  'review',
  'journeyStep',
  'stat',
  'galleryItem',
] as const
