import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionRenderer from '@/components/section-renderer'
import { getPage, getAllPageSlugs } from '@/lib/cms/page'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { isValidLocale, LOCALES, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const RESERVED_SLUGS = new Set(['home', 'blog'])

export async function generateStaticParams() {
  const all = await Promise.all(
    LOCALES.map(async (locale) => {
      const slugs = await getAllPageSlugs(locale)
      return slugs
        .filter((s) => !RESERVED_SLUGS.has(s))
        .map((slug) => ({ locale, slug }))
    }),
  )
  return all.flat()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const [page, site] = await Promise.all([
    getPage(slug, locale),
    getSiteSettings(locale),
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

  const [page, site] = await Promise.all([
    getPage(slug, locale as Locale),
    getSiteSettings(locale as Locale),
  ])

  if (!page) notFound()

  return (
    <main className="bg-bone min-h-screen">
      <Navbar
        navLinks={site.navLinks}
        brandName={site.brand.name}
        brandTagline={site.brand.tagline}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        locale={locale as Locale}
      />

      <SectionRenderer
        sections={page.sections}
        siteSettings={site}
        locale={locale as Locale}
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
        locale={locale as Locale}
      />
    </main>
  )
}
