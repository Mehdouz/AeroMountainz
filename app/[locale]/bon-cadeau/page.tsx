import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BonCadeauPageView from '@/components/bon-cadeau'
import { getBonCadeauPage } from '@/lib/cms/bonCadeauPage'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getDynamicFetchOptions, type DynamicFetchOptions } from '@/sanity/lib/live'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  'use cache'
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const [page, site] = await Promise.all([
    getBonCadeauPage(locale, { perspective: 'published', stega: false }),
    getSiteSettings(locale, { perspective: 'published', stega: false }),
  ])
  return buildPageMetadata({
    page,
    site,
    locale,
    path: `/${locale}/bon-cadeau`,
    ogImageFallback: page?.hero.backgroundImage,
  })
}

export default async function BonCadeauPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const { isDraftMode } = await getDynamicFetchOptions()

  if (isDraftMode) {
    return (
      <Suspense>
        <Dynamic locale={locale as Locale} />
      </Suspense>
    )
  }
  return <Cached locale={locale as Locale} perspective="published" stega={false} />
}

async function Dynamic({ locale }: { locale: Locale }) {
  const { perspective, stega } = await getDynamicFetchOptions()
  return <Cached locale={locale} perspective={perspective} stega={stega} />
}

async function getCachedData(locale: Locale, { perspective, stega }: FetchOpts) {
  'use cache'
  const [page, site] = await Promise.all([
    getBonCadeauPage(locale, { perspective, stega }),
    getSiteSettings(locale, { perspective, stega }),
  ])
  return { page, site }
}

async function Cached({
  locale,
  perspective,
  stega,
}: { locale: Locale } & FetchOpts) {
  const { page, site } = await getCachedData(locale, { perspective, stega })
  if (!page) notFound()

  return (
    <main className="bg-bone min-h-screen">
      <Navbar
        navLinks={site.navLinks}
        brandName={site.brand.name}
        brandTagline={site.brand.tagline}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        locale={locale}
      />

      <BonCadeauPageView page={page} locale={locale} />

      <Footer
        brandName={site.brand.name}
        brandTagline={site.brand.tagline}
        brandDescription={site.brand.description}
        navLinks={site.navLinks}
        legalLinks={site.legalLinks}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        email={site.contact.email}
        addressLine1={site.location.addressLine1}
        addressLine2={site.location.addressLine2}
        locale={locale}
      />
    </main>
  )
}
