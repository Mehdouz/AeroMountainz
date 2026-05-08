import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import { pageBySlugQuery, allPageSlugsQuery } from '@/sanity/lib/queries'
import type { Page } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'
import type { SlugEntry } from '@/lib/types/sitemap'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function getPage(
  slug: string,
  locale: Locale,
  opts: FetchOpts,
): Promise<Page | null> {
  const { data } = await sanityFetch({
    query: pageBySlugQuery,
    params: { slug, locale },
    perspective: opts.perspective,
    stega: opts.stega,
  })
  return (data as Page | null) ?? null
}

/**
 * Utilisé uniquement par `generateStaticParams` au build et `app/sitemap.ts` → on n'utilise PAS
 * sanityFetch (qui appelle `draftMode()` et plante en contexte de build statique).
 */
export async function getAllPageSlugs(locale: Locale): Promise<SlugEntry[]> {
  const data = await client.fetch(allPageSlugsQuery, { locale })
  return ((data ?? []) as SlugEntry[]).filter((d) => d.slug)
}
