import { sanityFetch, type DynamicFetchOptions } from '@/sanity/lib/live'
import { bonCadeauPageQuery } from '@/sanity/lib/queries'
import type { BonCadeauPage } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function getBonCadeauPage(
  locale: Locale,
  opts: FetchOpts,
): Promise<BonCadeauPage | null> {
  const { data } = await sanityFetch({
    query: bonCadeauPageQuery,
    params: { locale },
    perspective: opts.perspective,
    stega: opts.stega,
  })
  return (data as BonCadeauPage | null) ?? null
}
