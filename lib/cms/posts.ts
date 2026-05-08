import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import {
  postsListQuery,
  postBySlugQuery,
  allPostSlugsQuery,
} from '@/sanity/lib/queries'
import type { Post, PostListItem } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'
import type { SlugEntry } from '@/lib/types/sitemap'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function getPosts(
  locale: Locale,
  opts: FetchOpts,
): Promise<PostListItem[]> {
  const { data } = await sanityFetch({
    query: postsListQuery,
    params: { locale },
    perspective: opts.perspective,
    stega: opts.stega,
  })
  return (data ?? []) as PostListItem[]
}

export async function getPost(
  slug: string,
  locale: Locale,
  opts: FetchOpts,
): Promise<Post | null> {
  const { data } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug, locale },
    perspective: opts.perspective,
    stega: opts.stega,
  })
  return (data as Post | null) ?? null
}

/** Utilisé par `generateStaticParams` et `app/sitemap.ts` (cf. note dans lib/cms/page.ts). */
export async function getAllPostSlugs(locale: Locale): Promise<SlugEntry[]> {
  const data = await client.fetch(allPostSlugsQuery, { locale })
  return ((data ?? []) as SlugEntry[]).filter((d) => d.slug)
}
