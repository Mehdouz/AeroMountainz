import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '../reveal'
import RichText from '../rich-text'
import SplitHeading from './split-heading'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { BonCadeauExperience } from '@/lib/types/content'

export default function BonCadeauExperienceSection({
  data,
  locale,
}: {
  data: BonCadeauExperience
  locale: Locale
}) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--bone)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <Reveal threshold={0.1}>
            <div>
              {data.eyebrow && (
                <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-[var(--champagne)]/80 mb-3">
                  {data.eyebrow}
                </p>
              )}
              <SplitHeading
                start={data.headingStart}
                emphasized={data.headingEmphasized}
                end={data.headingEnd}
                breakLines={false}
                className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl text-[var(--text-primary)] leading-[1.1]"
              />
              {data.subtitle && (
                <p className="mt-7 mb-8 font-serif italic text-xl lg:text-2xl text-[var(--champagne)]/85 font-light">
                  {data.subtitle}
                </p>
              )}
              {data.body && (
                <div className="space-y-4 text-base lg:text-[15px] text-[var(--ink-65)] leading-[1.75] font-sans [&_p]:mb-0">
                  <RichText value={data.body} />
                </div>
              )}
              {data.linkLabel && data.linkHref && (
                <Link
                  href={localizeHref(data.linkHref, locale)}
                  className="inline-flex items-center gap-2 mt-6 pb-1 font-serif italic text-lg text-[var(--champagne)] border-b border-[var(--champagne-line)] hover:border-[var(--champagne)] transition-colors group"
                >
                  {data.linkLabel}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </Reveal>

          <Reveal threshold={0.1} delay={150}>
            <div className="bc-experience-gallery grid grid-cols-2 gap-3 lg:gap-3.5 auto-rows-[180px] sm:auto-rows-[200px] lg:auto-rows-[200px]">
              {data.gallery.slice(0, 4).map((item, i) => (
                <div
                  key={i}
                  className={`bc-experience-gallery-item relative overflow-hidden rounded-xl bg-[var(--midnight)] group ${
                    i === 0 ? 'row-span-2' : ''
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  {item.caption && (
                    <span className="absolute left-4 bottom-4 right-4 text-[11px] tracking-[0.15em] uppercase text-white/85 font-sans">
                      {item.caption}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
