import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Aero Mountains — Vol en Montgolfière à Annecy',
  description:
    'Décollage à l\'aube, lac d\'Annecy sous vos pieds, sommets alpins à perte de vue. Vivez un vol en montgolfière hors du commun avec Yannick Dacheux, pilote breveté DGAC.',
  keywords: 'montgolfière Annecy, vol en montgolfière, lac Annecy, Alpes, Yannick Dacheux, Aero Mountains',
  openGraph: {
    title: 'Aero Mountains — Vol en Montgolfière à Annecy',
    description: 'Au-dessus du lac et des Alpes, au lever du soleil.',
    url: 'https://www.aero-mountains.com',
    siteName: 'Aero Mountains',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable} bg-bone`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
