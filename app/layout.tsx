import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import LenisProvider from '@/components/lenis-provider'
import { site } from '@/lib/data/site'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

const ogImage = `${site.url}/images/hero-balloon.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Aero Mountains — Vol en Montgolfière à Annecy',
    template: '%s · Aero Mountains',
  },
  description:
    'Décollage à l\'aube, lac d\'Annecy sous vos pieds, sommets alpins à perte de vue. Vivez un vol en montgolfière hors du commun avec Yannick Dacheux, pilote breveté DGAC.',
  keywords: [
    'montgolfière Annecy',
    'vol en montgolfière',
    'lac Annecy',
    'Alpes',
    'Yannick Dacheux',
    'Aero Mountains',
    'baptême montgolfière',
    'Doussard',
    'Haute-Savoie',
  ],
  authors: [{ name: 'Aero Mountains' }],
  creator: 'Aero Mountains',
  publisher: 'Aero Mountains',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aero Mountains — Vol en Montgolfière à Annecy',
    description: 'Au-dessus du lac et des Alpes, au lever du soleil.',
    url: site.url,
    siteName: 'Aero Mountains',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Vol en montgolfière au-dessus du lac d\'Annecy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aero Mountains — Vol en Montgolfière à Annecy',
    description: 'Au-dessus du lac et des Alpes, au lever du soleil.',
    images: [ogImage],
  },
  robots: {
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
  category: 'travel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} bg-bone`}>
      <body className="font-sans antialiased">
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  )
}
