import { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'
import HeroParallax from './hero-parallax'
import Reveal from './reveal'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { HeroSection } from '@/lib/types/content'

export default function Hero({
  data,
  locale,
}: {
  data: HeroSection
  locale: Locale
}) {
  const subtitleLines = (data.subtitle ?? '').split('\n')

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-end">
      <HeroParallax
        backgroundImage={data.backgroundImage}
        backgroundAlt={data.backgroundAlt}
        cloudsImage={data.cloudsImage ?? data.backgroundImage}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        {data.eyebrow && (
          <Reveal threshold={0.01} delay={300} duration={1000} y={16}>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-6">
              {data.eyebrow}
            </p>
          </Reveal>
        )}

        <Reveal threshold={0.01} delay={500} duration={1000} y={24}>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-light leading-none text-[var(--bone)] mb-6">
            {data.titleStart}
            <br />
            <span className="italic text-[var(--champagne)]">{data.titleEmphasized}</span>
            {data.titleEnd && (
              <>
                <br />
                {data.titleEnd}
              </>
            )}
          </h1>
        </Reveal>

        {data.subtitle && (
          <Reveal threshold={0.01} delay={700} duration={1000} y={16}>
            <p className="text-base sm:text-lg text-[var(--bone)]/75 max-w-md leading-relaxed mb-10 font-sans">
              {subtitleLines.map((line, i) => (
                <Fragment key={i}>
                  {line}
                  {i < subtitleLines.length - 1 && <br />}
                </Fragment>
              ))}
            </p>
          </Reveal>
        )}

        {(data.primaryCta || data.secondaryCta) && (
          <Reveal threshold={0.01} delay={1000} duration={1000} y={16}>
            <div className="flex flex-wrap gap-4">
              {data.primaryCta && (
                <a
                  href={localizeHref(data.primaryCta.href, locale)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--champagne)] text-[var(--midnight)] font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[var(--champagne)]/85 transition-all duration-300 hover:scale-[1.02]"
                >
                  {data.primaryCta.label}
                </a>
              )}
              {data.secondaryCta && (
                <a
                  href={localizeHref(data.secondaryCta.href, locale)}
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border-gold)] text-[var(--gold)] font-sans text-sm font-medium tracking-widest uppercase rounded-full hover:bg-[var(--gold-dim)] transition-all duration-300"
                >
                  {data.secondaryCta.label}
                </a>
              )}
            </div>
          </Reveal>
        )}
      </div>

      {data.scrollLabel && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[var(--bone)]/50 text-xs tracking-[0.3em] uppercase font-mono">
            {data.scrollLabel}
          </span>
          <ChevronDown className="text-[var(--gold)] animate-bounce" size={18} />
        </div>
      )}
    </section>
  )
}
