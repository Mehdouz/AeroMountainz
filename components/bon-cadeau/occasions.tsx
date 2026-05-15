import { Fragment } from 'react'
import Reveal from '../reveal'
import BonCadeauIcon from './icon'
import SplitHeading from './split-heading'
import type { BonCadeauOccasionsSection } from '@/lib/types/content'

export default function BonCadeauOccasionsSectionView({ data }: { data: BonCadeauOccasionsSection }) {
  return (
    <section className="py-20 lg:py-28 border-y border-[var(--ink-line)] bg-[var(--bone)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <Reveal threshold={0.1}>
          <div className="text-center mb-12 lg:mb-16">
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
              className="font-serif font-light text-[clamp(1.75rem,3vw,2.25rem)] text-[var(--text-primary)] leading-tight"
            />
          </div>
        </Reveal>

        <Reveal threshold={0.1} delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
            {data.items.map((item, i) => {
              const lines = item.label.split('\n')
              return (
                <div
                  key={i}
                  className="flex flex-col items-center text-center px-2 py-5 rounded transition-colors hover:bg-[var(--champagne)]/[0.07]"
                >
                  <BonCadeauIcon
                    iconKey={item.iconKey}
                    className="w-8 h-8 text-[var(--champagne)]/75 mb-3"
                  />
                  <span className="text-xs text-[var(--text-primary)] font-sans leading-snug">
                    {lines.map((line, j) => (
                      <Fragment key={j}>
                        {line}
                        {j < lines.length - 1 && <br />}
                      </Fragment>
                    ))}
                  </span>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
