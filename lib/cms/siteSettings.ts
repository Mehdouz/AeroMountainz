import { sanityFetch } from '@/sanity/lib/live'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const { data } = await sanityFetch({
    query: siteSettingsQuery,
    params: { locale },
  })
  if (!data) {
    throw new Error(
      `Aucun document siteSettings trouvé pour la locale "${locale}". Lance \`pnpm seed\` ou crée-le dans le Studio.`,
    )
  }
  return data as SiteSettings
}
