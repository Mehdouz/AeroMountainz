import type { Metadata } from 'next'
import type { Page, SiteSettings } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

type PageLike = Pick<Page, 'title' | 'seo'> & { sections?: Page['sections'] }

/**
 * Construit l'objet `Metadata` pour Next.js à partir d'une page Sanity et des
 * paramètres globaux. Choisit l'image OG dans cet ordre : seo.ogImage → première
 * heroSection.backgroundImage / bonCadeauHeroSection.backgroundImage.
 */
export function buildPageMetadata({
  page,
  site,
  locale,
  path,
}: {
  page: PageLike | null
  site: SiteSettings
  locale: Locale
  path: string
}): Metadata {
  if (!page) return {}

  const title = page.seo?.title || page.title
  const description = page.seo?.description ?? undefined

  const heroLike = page.sections?.find(
    (s) => s._type === 'heroSection' || s._type === 'bonCadeauHeroSection',
  )
  const ogImage =
    page.seo?.ogImage ||
    (heroLike && 'backgroundImage' in heroLike ? heroLike.backgroundImage : undefined)

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `${site.url}${path}`,
      siteName: site.brand.siteName,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: page.seo?.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      ],
      apple: '/apple-icon.png',
    },
  }
}
