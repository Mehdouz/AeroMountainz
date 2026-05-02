import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery, allPageSlugsQuery } from '@/sanity/lib/queries'
import type { Page } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

export async function getPage(slug: string, locale: Locale): Promise<Page | null> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug, locale },
  })
  return (data as Page | null) ?? null
}

/**
 * Utilisé uniquement par `generateStaticParams` au build → on n'utilise PAS sanityFetch
 * (qui appelle `draftMode()` et plante en contexte de build statique).
 */
export async function getAllPageSlugs(locale: Locale): Promise<string[]> {
  const data = await client.fetch(allPageSlugsQuery, { locale })
  return ((data ?? []) as { slug: string }[]).map((d) => d.slug).filter(Boolean)
}
