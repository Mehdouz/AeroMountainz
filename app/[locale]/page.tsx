import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionRenderer from '@/components/section-renderer'
import { getPage } from '@/lib/cms/page'
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
    getPage('home', locale, { perspective: 'published', stega: false }),
    getSiteSettings(locale, { perspective: 'published', stega: false }),
  ])
  return buildPageMetadata({ page, site, locale, path: `/${locale}` })
}

export default async function HomePage({
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
        <DynamicHome locale={locale as Locale} />
      </Suspense>
    )
  }
  return (
    <CachedHome
      locale={locale as Locale}
      perspective="published"
      stega={false}
    />
  )
}

async function DynamicHome({ locale }: { locale: Locale }) {
  const { perspective, stega } = await getDynamicFetchOptions()
  return <CachedHome locale={locale} perspective={perspective} stega={stega} />
}

async function getCachedHomeData(
  locale: Locale,
  { perspective, stega }: FetchOpts,
) {
  'use cache'
  const [page, site] = await Promise.all([
    getPage('home', locale, { perspective, stega }),
    getSiteSettings(locale, { perspective, stega }),
  ])
  return { page, site }
}

async function CachedHome({
  locale,
  perspective,
  stega,
}: { locale: Locale } & FetchOpts) {
  const { page, site } = await getCachedHomeData(locale, { perspective, stega })

  if (!page) notFound()

  return (
    <>
      <Navbar
        navLinks={site.navLinks}
        logo={site.brand.logo}
        logoAlt={site.brand.logoAlt}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        locale={locale}
      />

      <main className="bg-bone min-h-screen">
        <SectionRenderer
          sections={page.sections}
          siteSettings={site}
          locale={locale}
        />
      </main>

      <Footer
        logo={site.brand.logo}
        logoAlt={site.brand.logoAlt}
        siteName={site.brand.siteName}
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
    </>
  )
}
