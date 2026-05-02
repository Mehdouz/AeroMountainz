import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { VisualEditing } from 'next-sanity/visual-editing'
import LenisProvider from '@/components/lenis-provider'
import HtmlLang from '@/components/html-lang'
import { SanityLive } from '@/sanity/lib/live'
import { LOCALES, isValidLocale, type Locale } from '@/lib/i18n'

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const isDraft = (await draftMode()).isEnabled

  return (
    <>
      <HtmlLang locale={locale as Locale} />
      <LenisProvider>{children}</LenisProvider>
      <SanityLive />
      {isDraft && <VisualEditing />}
      <Analytics />
    </>
  )
}
