import Image from 'next/image'
import Reveal from './reveal'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { PilotHeroSection } from '@/lib/types/content'

export default function PilotHero({
  data,
  locale,
}: {
  data: PilotHeroSection
  locale: Locale
}) {
  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] bg-[var(--midnight-2)] min-h-screen overflow-hidden">
      {/* LEFT — portrait */}
      <div className="relative min-h-[70vh] lg:min-h-screen overflow-hidden bg-gradient-to-b from-[var(--midnight)] via-[var(--midnight)] to-[var(--midnight-2)]">
        <Image
          src={data.portraitImage}
          alt={data.portraitAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[center_30%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[var(--midnight-2)]/40 via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(15,30,61,0.5)_100%)]"
        />

        {(data.badgeNumber || data.badgeLabel) && (
          <div className="absolute bottom-10 left-10 border border-[var(--champagne)]/40 bg-[var(--midnight-2)]/55 backdrop-blur-sm px-6 py-4 rounded-sm">
            {data.badgeNumber && (
              <div className="font-serif italic font-light text-[38px] leading-none text-[var(--champagne)]">
                {data.badgeNumber}
              </div>
            )}
            {data.badgeLabel && (
              <div className="mt-1.5 text-[10px] tracking-[0.22em] uppercase text-[var(--bone)]">
                {data.badgeLabel}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RIGHT — content */}
      <div className="relative flex flex-col justify-center bg-[var(--midnight)] px-8 sm:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,169,97,0.08)_0%,transparent_50%)]"
        />

        <div className="relative">
          {data.eyebrow && (
            <Reveal threshold={0.01} delay={300} duration={800} y={20}>
              <p className="flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-[var(--champagne)] mb-8">
                <span aria-hidden className="inline-block w-8 h-px bg-[var(--champagne)]" />
                {data.eyebrow}
              </p>
            </Reveal>
          )}

          <Reveal threshold={0.01} delay={500} duration={900} y={20}>
            <h1 className="font-serif font-light leading-[1.05] tracking-tight text-[var(--bone)] text-[clamp(40px,4.5vw,68px)]">
              {data.titleStart}
              <em className="block italic font-light text-[var(--champagne)] mt-1">
                {data.titleEmphasized}
              </em>
            </h1>
          </Reveal>

          {data.subtitle && (
            <Reveal threshold={0.01} delay={700} duration={900} y={20}>
              <p className="mt-8 font-serif italic font-light text-[clamp(18px,1.8vw,22px)] text-[var(--bone)] max-w-[460px] leading-[1.5]">
                {data.subtitle}
              </p>
            </Reveal>
          )}

          {data.stats && data.stats.length > 0 && (
            <Reveal threshold={0.01} delay={850} duration={900} y={20}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                {data.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-6">
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="w-px h-8 bg-[var(--champagne)]/30 hidden sm:block"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-serif italic font-light text-[28px] leading-none text-[var(--champagne)]">
                        {stat.value}
                      </span>
                      <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--bone)]/75">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {(data.primaryCta || data.secondaryCta) && (
            <Reveal threshold={0.01} delay={1000} duration={900} y={20}>
              <div className="mt-11 flex flex-wrap gap-3.5">
                {data.primaryCta && (
                  <a
                    href={localizeHref(data.primaryCta.href, locale)}
                    className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[var(--champagne)] text-[var(--midnight-2)] font-sans text-sm font-medium tracking-wider rounded-full hover:bg-[var(--champagne)]/85 transition-all duration-300 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(201,169,97,0.25)]"
                  >
                    {data.primaryCta.label}
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                )}
                {data.secondaryCta && (
                  <a
                    href={localizeHref(data.secondaryCta.href, locale)}
                    className="inline-flex items-center px-8 py-4 border border-[var(--bone)]/30 text-[var(--bone)] font-sans text-sm font-medium tracking-wider rounded-full hover:border-[var(--bone)] transition-all duration-300"
                  >
                    {data.secondaryCta.label}
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {data.scrollLabel && (
        <a
          href={data.scrollHref || '#mon-histoire'}
          aria-label={data.scrollLabel}
          className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2.5 group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--champagne)]">
            {data.scrollLabel}
          </span>
          <span aria-hidden className="block w-px h-8 bg-[var(--champagne)] animate-pulse" />
        </a>
      )}
    </section>
  )
}
