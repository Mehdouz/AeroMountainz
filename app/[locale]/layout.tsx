import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { VisualEditing } from 'next-sanity/visual-editing'
import LenisProvider from '@/components/lenis-provider'
import HtmlLang from '@/components/html-lang'
import PageTransition from '@/components/page-transition'
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

  return (
    <>
      <HtmlLang locale={locale as Locale} />
      <PageTransition />
      <LenisProvider>{children}</LenisProvider>
      <SanityLive />
      <Suspense>
        <DraftModeVisualEditing />
      </Suspense>
      <Analytics />
    </>
  )
}

async function DraftModeVisualEditing() {
  const { isEnabled } = await draftMode()
  return isEnabled ? <VisualEditing /> : null
}
