import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getAllPageSlugs } from '@/lib/cms/page'
import { getAllPostSlugs } from '@/lib/cms/posts'
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n'
import type { SlugEntry } from '@/lib/types/sitemap'

const RESERVED_PAGE_SLUGS = new Set(['home', 'blog', 'bon-cadeau'])

const PRIORITY = {
  page: 0.6,
  post: 0.7,
} as const

const CHANGE_FREQUENCY = {
  page: 'monthly',
  post: 'monthly',
} as const satisfies Record<'page' | 'post', MetadataRoute.Sitemap[number]['changeFrequency']>

function buildLanguagesMap(
  baseUrl: string,
  segment: (locale: Locale, slug: string) => string,
  primaryLocale: Locale,
  primarySlug: string,
  translations: SlugEntry['translations'],
): Record<string, string> {
  const map: Record<string, string> = {
    [primaryLocale]: `${baseUrl}${segment(primaryLocale, primarySlug)}`,
  }
  for (const t of translations ?? []) {
    if (!t.slug || t.lang === primaryLocale) continue
    map[t.lang] = `${baseUrl}${segment(t.lang, t.slug)}`
  }
  return map
}

function hasTranslationFor(entry: SlugEntry, lang: Locale): boolean {
  return Boolean(entry.translations?.some((t) => t.lang === lang && t.slug))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  'use cache'
  const site = await getSiteSettings(DEFAULT_LOCALE, { perspective: 'published', stega: false })
  const baseUrl = site.url.replace(/\/$/, '')

  const entries: MetadataRoute.Sitemap = []
  const now = new Date()

  // Home + blog index + bon-cadeau (singleton) — entrée canonique sur DEFAULT_LOCALE,
  // alternates pour les autres locales.
  const homeLanguages = Object.fromEntries(
    LOCALES.map((l) => [l, `${baseUrl}/${l}`]),
  )
  const blogLanguages = Object.fromEntries(
    LOCALES.map((l) => [l, `${baseUrl}/${l}/blog`]),
  )
  const bonCadeauLanguages = Object.fromEntries(
    LOCALES.map((l) => [l, `${baseUrl}/${l}/bon-cadeau`]),
  )
  entries.push(
    {
      url: `${baseUrl}/${DEFAULT_LOCALE}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: `${baseUrl}/${DEFAULT_LOCALE}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: { languages: blogLanguages },
    },
    {
      url: `${baseUrl}/${DEFAULT_LOCALE}/bon-cadeau`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: bonCadeauLanguages },
    },
  )

  // Pages dynamiques
  const pagePath = (locale: Locale, slug: string) => `/${locale}/${slug}`
  const primaryPages = await getAllPageSlugs(DEFAULT_LOCALE)
  for (const entry of primaryPages) {
    if (RESERVED_PAGE_SLUGS.has(entry.slug)) continue
    entries.push({
      url: `${baseUrl}${pagePath(DEFAULT_LOCALE, entry.slug)}`,
      lastModified: new Date(entry._updatedAt),
      changeFrequency: CHANGE_FREQUENCY.page,
      priority: PRIORITY.page,
      alternates: {
        languages: buildLanguagesMap(
          baseUrl,
          pagePath,
          DEFAULT_LOCALE,
          entry.slug,
          entry.translations,
        ),
      },
    })
  }
  // Orphelins : docs présents dans les autres locales mais sans jumeau dans DEFAULT_LOCALE.
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const localized = await getAllPageSlugs(locale)
    for (const entry of localized) {
      if (RESERVED_PAGE_SLUGS.has(entry.slug)) continue
      if (hasTranslationFor(entry, DEFAULT_LOCALE)) continue
      entries.push({
        url: `${baseUrl}${pagePath(locale, entry.slug)}`,
        lastModified: new Date(entry._updatedAt),
        changeFrequency: CHANGE_FREQUENCY.page,
        priority: PRIORITY.page,
        alternates: {
          languages: buildLanguagesMap(
            baseUrl,
            pagePath,
            locale,
            entry.slug,
            entry.translations,
          ),
        },
      })
    }
  }

  // Articles blog
  const postPath = (locale: Locale, slug: string) => `/${locale}/blog/${slug}`
  const primaryPosts = await getAllPostSlugs(DEFAULT_LOCALE)
  for (const entry of primaryPosts) {
    entries.push({
      url: `${baseUrl}${postPath(DEFAULT_LOCALE, entry.slug)}`,
      lastModified: new Date(entry._updatedAt),
      changeFrequency: CHANGE_FREQUENCY.post,
      priority: PRIORITY.post,
      alternates: {
        languages: buildLanguagesMap(
          baseUrl,
          postPath,
          DEFAULT_LOCALE,
          entry.slug,
          entry.translations,
        ),
      },
    })
  }
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const localized = await getAllPostSlugs(locale)
    for (const entry of localized) {
      if (hasTranslationFor(entry, DEFAULT_LOCALE)) continue
      entries.push({
        url: `${baseUrl}${postPath(locale, entry.slug)}`,
        lastModified: new Date(entry._updatedAt),
        changeFrequency: CHANGE_FREQUENCY.post,
        priority: PRIORITY.post,
        alternates: {
          languages: buildLanguagesMap(
            baseUrl,
            postPath,
            locale,
            entry.slug,
            entry.translations,
          ),
        },
      })
    }
  }

  return entries
}
