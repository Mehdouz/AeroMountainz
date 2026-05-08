import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/cms/siteSettings'

export default async function robots(): Promise<MetadataRoute.Robots> {
  'use cache'
  const site = await getSiteSettings('fr', { perspective: 'published', stega: false })
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/api/'] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
