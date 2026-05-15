import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import Reveal from '../reveal'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { BonCadeauFinalCta } from '@/lib/types/content'

export default function BonCadeauFinalCtaSection({
  data,
  locale,
}: {
  data: BonCadeauFinalCta
  locale: Locale
}) {
  const hasBackground = Boolean(data.backgroundImage)

  return (
    <section className="relative overflow-hidden py-32 lg:py-40 bg-[var(--bone)] border-t border-[var(--ink-line)]">
      {hasBackground && data.backgroundImage && (
        <>
          <Image
            src={data.backgroundImage}
            alt={data.backgroundAlt ?? ''}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--bone)]/80 backdrop-blur-[2px]" />
        </>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
        <Reveal threshold={0.1} y={24}>
          {data.eyebrow && (
            <span className="inline-flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-[var(--champagne)]/85 font-sans">
              <span className="w-8 h-px bg-[var(--champagne)]/85" />
              {data.eyebrow}
              <span className="w-8 h-px bg-[var(--champagne)]/85" />
            </span>
          )}

          <h2 className="mt-8 mb-8 font-serif italic font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[var(--champagne)] leading-[1.05] tracking-tight">
            {data.headingLine1}
            {data.headingLine2 && (
              <>
                <br />
                {data.headingLine2}
              </>
            )}
          </h2>

          {data.subtext && (
            <p className="text-base text-[var(--ink-65)] max-w-lg mx-auto mb-12 font-sans leading-relaxed">
              {data.subtext}
            </p>
          )}

          {(data.primaryCta || data.secondaryCta) && (
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              {data.primaryCta && (
                <a
                  href={localizeHref(data.primaryCta.href, locale)}
                  className="inline-flex items-center gap-3 px-9 py-4 bg-[var(--midnight)] hover:bg-[var(--midnight-2)] text-[var(--bone)] font-sans text-sm font-semibold tracking-wider rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                >
                  {data.primaryCta.label}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
              {data.secondaryCta && (
                <a
                  href={localizeHref(data.secondaryCta.href, locale)}
                  className="inline-flex items-center gap-2 px-9 py-4 border border-[var(--ink)]/20 text-[var(--text-primary)] font-sans text-sm font-medium tracking-wider rounded-full hover:border-[var(--ink)] transition-colors duration-300"
                >
                  {data.secondaryCta.label}
                </a>
              )}
            </div>
          )}

          {data.reassuranceItems && data.reassuranceItems.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-[var(--champagne)]/85 font-sans tracking-wider">
              {data.reassuranceItems.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <Check size={14} className="text-[var(--champagne)] flex-shrink-0" />
                  {item.label}
                </span>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
