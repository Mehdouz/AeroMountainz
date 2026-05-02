import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getAllPageSlugs } from '@/lib/cms/page'
import { getAllPostSlugs } from '@/lib/cms/posts'
import { LOCALES } from '@/lib/i18n'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteSettings('fr')
  const baseUrl = site.url

  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    // home + blog index
    entries.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    )

    // pages dynamiques
    const pageSlugs = await getAllPageSlugs(locale)
    for (const slug of pageSlugs) {
      if (slug === 'home' || slug === 'blog') continue
      entries.push({
        url: `${baseUrl}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    // articles blog
    const postSlugs = await getAllPostSlugs(locale)
    for (const slug of postSlugs) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
