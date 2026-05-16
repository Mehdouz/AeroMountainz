import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../reveal'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { BonCadeauHeroSection } from '@/lib/types/content'

function formatPrice(amount: number, currency = '€') {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(amount) + ' ' + currency
}

export default function BonCadeauHeroSection({
  data,
  locale,
}: {
  data: BonCadeauHeroSection
  locale: Locale
}) {
  const subtitleLines = (data.subtitle ?? '').split('\n')

  return (
    <section className="relative min-h-screen overflow-hidden bg-midnight flex items-center">
      <div className="absolute inset-0">
        <Image
          src={data.backgroundImage}
          alt={data.backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-(--midnight)/60 to-(--midnight)/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-(--midnight)/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-32 lg:pt-40 pb-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal threshold={0.01} delay={400} duration={1000} y={24}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.05] text-bone tracking-tight">
                {data.titleStart}{' '}
                <em className="italic text-champagne font-light">
                  {data.titleEmphasized}
                </em>
                {data.titleEnd && (
                  <>
                    <br />
                    {data.titleEnd}
                  </>
                )}
              </h1>
            </Reveal>

            {data.subtitle && (
              <Reveal threshold={0.01} delay={600} duration={1000} y={16}>
                <p className="mt-8 font-serif italic text-lg sm:text-xl lg:text-2xl text-(--bone)/85 max-w-xl leading-relaxed font-light">
                  {subtitleLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < subtitleLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal threshold={0.01} delay={800} duration={1000} y={24}>
            <div className="border border-(--champagne)/30 bg-(--midnight)/40 backdrop-blur-xs rounded-xs px-7 py-8 lg:px-9 lg:py-10">
              {data.priceLabel && (
                <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-(--champagne)/70 mb-3">
                  {data.priceLabel}
                </p>
              )}
              <p className="font-serif text-5xl lg:text-6xl font-light leading-none text-bone">
                {formatPrice(data.priceAmount, data.priceCurrency)}
              </p>
              {data.priceSubtext && (
                <p className="mt-2 text-sm text-(--bone)/75 font-sans">
                  {data.priceSubtext}
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                {data.primaryCta && (
                  <a
                    href={localizeHref(data.primaryCta.href, locale)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-champagne text-midnight font-sans text-sm font-semibold tracking-wider rounded-full hover:bg-(--champagne)/85 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    {data.primaryCta.label}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                )}
                {data.secondaryCta && (
                  <a
                    href={localizeHref(data.secondaryCta.href, locale)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-(--bone)/30 text-bone font-sans text-sm font-medium tracking-wider rounded-full hover:border-bone transition-all duration-300"
                  >
                    {data.secondaryCta.label}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {data.reassuranceItems && data.reassuranceItems.length > 0 && (
        <div className="absolute bottom-0 inset-x-0 z-10 border-t border-(--champagne)/15 bg-(--midnight)/60 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-wrap justify-between gap-x-8 gap-y-3">
            {data.reassuranceItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] tracking-wider text-(--bone)/85 font-sans"
              >
                <Check size={14} className="text-champagne shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
