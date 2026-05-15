import Reveal from '../reveal'
import SplitHeading from './split-heading'
import type { BonCadeauTestimonialsSection } from '@/lib/types/content'

function Stars({ count }: { count: number }) {
  const safe = Math.max(0, Math.min(5, Math.round(count)))
  return (
    <span
      className="text-champagne tracking-[4px] font-sans"
      aria-label={`${safe} étoile${safe > 1 ? 's' : ''} sur 5`}
    >
      {'★'.repeat(safe)}
      <span className="opacity-30">{'★'.repeat(5 - safe)}</span>
    </span>
  )
}

export default function BonCadeauTestimonialsSectionView({
  data,
}: {
  data: BonCadeauTestimonialsSection
}) {
  return (
    <section className="section-midnight py-24 lg:py-32" style={{ backgroundColor: '#0a1226' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal threshold={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
            <div>
              {data.eyebrow && (
                <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-champagne mb-3">
                  {data.eyebrow}
                </p>
              )}
              <SplitHeading
                start={data.headingStart}
                emphasized={data.headingEmphasized}
                end={data.headingEnd}
                breakLines={false}
                className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.25rem] text-bone leading-tight"
              />
            </div>

            {(data.googleRatingStars || data.googleRatingLabel) && (
              <div className="inline-flex items-center gap-4 px-5 py-3 border border-(--champagne)/25 rounded-sm">
                {data.googleRatingStars && (
                  <span className="font-serif text-2xl text-champagne">
                    {data.googleRatingStars} ★
                  </span>
                )}
                {data.googleRatingLabel && (
                  <span className="text-[11px] tracking-[0.15em] uppercase text-bone font-sans leading-tight whitespace-pre-line">
                    {data.googleRatingLabel}
                  </span>
                )}
              </div>
            )}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <Reveal key={i} threshold={0.1} delay={i * 120}>
              <article className="h-full p-8 rounded-sm border border-(--champagne)/15 bg-white/[0.025] hover:bg-white/[0.04] hover:border-(--champagne)/30 transition-colors">
                <Stars count={item.stars} />
                <p className="mt-5 mb-6 text-[15px] text-(--bone)/90 leading-[1.65] font-sans min-h-[100px]">
                  {item.quote}
                </p>
                <div className="pt-4 border-t border-(--champagne)/15 flex justify-between items-baseline gap-3">
                  <span className="text-sm text-bone font-medium font-sans tracking-wider">
                    {item.name}
                  </span>
                  {item.occasion && (
                    <span className="font-serif italic text-sm text-(--champagne)/75">
                      {item.occasion}
                    </span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
