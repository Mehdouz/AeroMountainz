import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/cms/siteSettings'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSettings('fr')
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
