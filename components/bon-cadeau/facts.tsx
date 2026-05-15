import Reveal from '../reveal'
import BonCadeauIcon from './icon'
import SplitHeading from './split-heading'
import type { BonCadeauFacts } from '@/lib/types/content'

export default function BonCadeauFactsSection({ data }: { data: BonCadeauFacts }) {
  return (
    <section className="section-midnight py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal threshold={0.1}>
          <div className="text-center mb-16 lg:mb-20">
            {data.eyebrow && (
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-[var(--champagne)] mb-3">
                {data.eyebrow}
              </p>
            )}
            <SplitHeading
              start={data.headingStart}
              emphasized={data.headingEmphasized}
              end={data.headingEnd}
              breakLines={false}
              className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.25rem] text-[var(--bone)] leading-tight"
            />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--champagne)]/15">
          {data.items.map((item, i) => (
            <Reveal
              key={i}
              threshold={0.1}
              delay={(i % 3) * 80}
              className="border-r border-b border-[var(--champagne)]/15"
            >
              <div className="px-8 py-9 lg:px-9 lg:py-10 h-full transition-colors hover:bg-[var(--champagne)]/[0.04]">
                <BonCadeauIcon
                  iconKey={item.iconKey}
                  className="w-7 h-7 text-[var(--champagne)] mb-5"
                />
                <h3 className="font-serif text-xl text-[var(--bone)] mb-2 font-normal">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[var(--bone)]/65 leading-[1.55] font-sans">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
