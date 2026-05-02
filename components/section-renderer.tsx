import Hero from './hero'
import Stats from './stats'
import Formulas from './formulas'
import CloudBreak from './cloud-break'
import Journey from './journey'
import Pilot from './pilot'
import Gallery from './gallery'
import Reviews from './reviews'
import Faq from './faq'
import CtaSection from './cta-section'
import RichText from './rich-text'
import StyledHeading from './styled-heading'

import type { Section, SiteSettings } from '@/lib/types/content'
import type { Locale } from '@/lib/i18n'

export default function SectionRenderer({
  sections,
  siteSettings,
  locale,
}: {
  sections: Section[]
  siteSettings: SiteSettings
  locale: Locale
}) {
  const phone = siteSettings.contact.phone
  const phoneDisplay = siteSettings.contact.phoneDisplay
  const email = siteSettings.contact.email

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return <Hero key={section._key} data={section} locale={locale} />

          case 'statsSection':
            return (
              <Stats
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                items={section.stats}
              />
            )

          case 'formulasSection':
            return (
              <Formulas
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                subtext={section.subtext}
                items={section.formulas}
                phone={phone}
              />
            )

          case 'cloudBreakQuoteSection':
            return (
              <CloudBreak
                key={section._key}
                quote={section.quote}
                author={section.author}
              />
            )

          case 'journeySection':
            return (
              <Journey
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                footer={section.footer}
                items={section.steps}
              />
            )

          case 'pilotSection':
            return (
              <Pilot
                key={section._key}
                eyebrow={section.eyebrow}
                data={section.pilot}
                phone={phone}
              />
            )

          case 'gallerySection':
            return (
              <Gallery
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                items={section.items}
              />
            )

          case 'reviewsSection':
            return (
              <Reviews
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                items={section.reviews}
                aggregate={
                  section.aggregateRating &&
                  section.aggregateCountLabel &&
                  section.aggregateSource
                    ? {
                        rating: section.aggregateRating,
                        countLabel: section.aggregateCountLabel,
                        source: section.aggregateSource,
                      }
                    : undefined
                }
              />
            )

          case 'faqSection':
            return (
              <Faq
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                items={section.faqs}
              />
            )

          case 'ctaSection':
            return (
              <CtaSection
                key={section._key}
                data={section}
                phone={phone}
                phoneDisplay={phoneDisplay}
                email={email}
              />
            )

          case 'richTextSection':
            return (
              <section
                key={section._key}
                className="py-16 lg:py-24"
              >
                <div className="max-w-3xl mx-auto px-6 lg:px-10">
                  {section.eyebrow && (
                    <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
                      {section.eyebrow}
                    </p>
                  )}
                  {section.heading && (
                    <StyledHeading
                      heading={section.heading}
                      className="font-serif text-3xl lg:text-5xl font-light text-[var(--text-primary)] mb-8 leading-tight"
                    />
                  )}
                  <RichText value={section.body} />
                </div>
              </section>
            )

          default:
            // Section type non géré — silencieux en prod, lisible en dev.
            if (process.env.NODE_ENV !== 'production') {
              const unhandled = section as { _type?: string }
              console.warn(
                `[SectionRenderer] Type de section inconnu : ${unhandled._type}`,
              )
            }
            return null
        }
      })}
    </>
  )
}
