import { sanityFetch } from '@/sanity/lib/live'
import { client } from '@/sanity/lib/client'
import {
  postsListQuery,
  postBySlugQuery,
  allPostSlugsQuery,
} from '@/sanity/lib/queries'
import type { Post, PostListItem } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

export async function getPosts(locale: Locale): Promise<PostListItem[]> {
  const { data } = await sanityFetch({
    query: postsListQuery,
    params: { locale },
  })
  return (data ?? []) as PostListItem[]
}

export async function getPost(slug: string, locale: Locale): Promise<Post | null> {
  const { data } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug, locale },
  })
  return (data as Post | null) ?? null
}

/** Utilisé uniquement par `generateStaticParams` (cf. note dans lib/cms/page.ts). */
export async function getAllPostSlugs(locale: Locale): Promise<string[]> {
  const data = await client.fetch(allPostSlugsQuery, { locale })
  return ((data ?? []) as { slug: string }[]).map((d) => d.slug).filter(Boolean)
}
