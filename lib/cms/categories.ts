import { sanityFetch } from '@/sanity/lib/live'
import { categoriesQuery } from '@/sanity/lib/queries'
import type { Category } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

export async function getCategories(locale: Locale): Promise<Category[]> {
  const { data } = await sanityFetch({
    query: categoriesQuery,
    params: { locale },
  })
  return (data ?? []) as Category[]
}
