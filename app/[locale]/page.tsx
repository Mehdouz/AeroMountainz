import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionRenderer from '@/components/section-renderer'
import { getPage } from '@/lib/cms/page'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const [page, site] = await Promise.all([
    getPage('home', locale),
    getSiteSettings(locale),
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

  const [page, site] = await Promise.all([
    getPage('home', locale as Locale),
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
