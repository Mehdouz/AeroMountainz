/**
 * Configuration i18n côté Next.js (parallèle à sanity/lib/i18n.ts).
 */

export const LOCALES = ['fr', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'fr'

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}

export function isValidLocale(locale: string): locale is Locale {
  return (LOCALES as readonly string[]).includes(locale)
}

/**
 * Préfixe une URL relative avec la locale.
 * `/bon-cadeau` + `'fr'` → `/fr/bon-cadeau`
 * `/`           + `'fr'` → `/fr`
 * Une URL externe (http://...) ou un mailto/tel reste inchangée.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (!href) return `/${locale}`
  if (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#')
  ) {
    return href
  }
  if (href === '/') return `/${locale}`
  if (href.startsWith('/')) return `/${locale}${href}`
  return `/${locale}/${href}`
}
