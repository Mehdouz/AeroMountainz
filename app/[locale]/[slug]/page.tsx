import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionRenderer from '@/components/section-renderer'
import { getPage, getAllPageSlugs } from '@/lib/cms/page'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getDynamicFetchOptions, type DynamicFetchOptions } from '@/sanity/lib/live'
import { isValidLocale, LOCALES, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const RESERVED_SLUGS = new Set(['home', 'blog'])

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function generateStaticParams() {
  const all = await Promise.all(
    LOCALES.map(async (locale) => {
      const entries = await getAllPageSlugs(locale)
      return entries
        .filter((e) => !RESERVED_SLUGS.has(e.slug))
        .map((e) => ({ locale, slug: e.slug }))
    }),
  )
  return all.flat()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  'use cache'
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const [page, site] = await Promise.all([
    getPage(slug, locale, { perspective: 'published', stega: false }),
    getSiteSettings(locale, { perspective: 'published', stega: false }),
  ])
  if (!page) return {}
  return buildPageMetadata({
    page,
    site,
    locale,
    path: `/${locale}/${slug}`,
  })
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale) || RESERVED_SLUGS.has(slug)) notFound()
  const { isDraftMode } = await getDynamicFetchOptions()

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicView locale={locale as Locale} slug={slug} />
      </Suspense>
    )
  }
  return (
    <CachedView
      locale={locale as Locale}
      slug={slug}
      perspective="published"
      stega={false}
    />
  )
}

async function DynamicView({ locale, slug }: { locale: Locale; slug: string }) {
  const { perspective, stega } = await getDynamicFetchOptions()
  return (
    <CachedView locale={locale} slug={slug} perspective={perspective} stega={stega} />
  )
}

async function getCachedSlugData(
  slug: string,
  locale: Locale,
  { perspective, stega }: FetchOpts,
) {
  'use cache'
  const [page, site] = await Promise.all([
    getPage(slug, locale, { perspective, stega }),
    getSiteSettings(locale, { perspective, stega }),
  ])
  return { page, site }
}

async function CachedView({
  locale,
  slug,
  perspective,
  stega,
}: { locale: Locale; slug: string } & FetchOpts) {
  const { page, site } = await getCachedSlugData(slug, locale, { perspective, stega })

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

      <SectionRenderer
        sections={page.sections}
        siteSettings={site}
        locale={locale}
      />

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
