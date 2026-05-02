import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Stats from '@/components/stats'
import Formulas from '@/components/formulas'
import CloudBreak from '@/components/cloud-break'
import Journey from '@/components/journey'
import Pilot from '@/components/pilot'
import Gallery from '@/components/gallery'
import Reviews from '@/components/reviews'
import Faq from '@/components/faq'
import CtaSection from '@/components/cta-section'
import Footer from '@/components/footer'

import { site } from '@/lib/data/site'
import { stats } from '@/lib/data/stats'
import { formulas } from '@/lib/data/formulas'
import { journey } from '@/lib/data/journey'
import { pilot } from '@/lib/data/pilot'
import { gallery } from '@/lib/data/gallery'
import { reviews } from '@/lib/data/reviews'
import { faqs } from '@/lib/data/faqs'

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': site.url,
  name: `${site.brand.name} ${site.brand.tagline}`,
  description: site.brand.description,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  image: `${site.url}/images/hero-balloon.jpg`,
  priceRange: '€€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.location.addressLine1,
    addressLocality: 'Doussard',
    postalCode: '74210',
    addressRegion: 'Haute-Savoie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.7886,
    longitude: 6.2257,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.reviewsAggregate.rating,
    reviewCount: '120',
    bestRating: '5',
    worstRating: '1',
  },
  founder: {
    '@type': 'Person',
    name: pilot.name,
  },
  makesOffer: formulas.map((f) => ({
    '@type': 'Offer',
    name: f.title.replace(/\n/g, ' '),
    description: f.description,
    price: f.price.match(/\d+/)?.[0] ?? null,
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  })),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="bg-bone min-h-screen">
        <Navbar
          navLinks={site.navLinks}
          brandName={site.brand.name}
          brandTagline={site.brand.tagline}
          phone={site.contact.phone}
          phoneDisplay={site.contact.phoneDisplay}
        />

        <Hero data={site.hero} />

        <Stats items={stats} />

        <Formulas items={formulas} phone={site.contact.phone} />

        <CloudBreak
          quote={site.cloudBreakQuote.quote}
          author={site.cloudBreakQuote.author}
        />

        <Journey items={journey} />

        <Pilot data={pilot} phone={site.contact.phone} />

        <Gallery items={gallery} />

        <Reviews items={reviews} aggregate={site.reviewsAggregate} />

        <Faq items={faqs} />

        <CtaSection
          data={site.cta}
          phone={site.contact.phone}
          phoneDisplay={site.contact.phoneDisplay}
          email={site.contact.email}
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
        />
      </main>
    </>
  )
}
