import Reveal from '../reveal'
import RichText from '../rich-text'
import SplitHeading from './split-heading'
import type { BonCadeauHowtoSection } from '@/lib/types/content'

export default function BonCadeauHowtoSectionView({ data }: { data: BonCadeauHowtoSection }) {
  return (
    <section id="comment-ca-marche" className="py-24 lg:py-32 bg-bone text-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal threshold={0.1}>
          <div className="mb-16 lg:mb-20">
            {data.eyebrow && (
              <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-(--champagne)/80 mb-3">
                {data.eyebrow}
              </p>
            )}
            <SplitHeading
              start={data.headingStart}
              emphasized={data.headingEmphasized}
              end={data.headingEnd}
              breakLines={false}
              className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.25rem] text-text-primary leading-tight"
            />
            {data.subtitle && (
              <p className="mt-4 font-serif italic text-xl lg:text-2xl text-(--champagne)/85 font-light">
                {data.subtitle}
              </p>
            )}
          </div>
        </Reveal>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-12">
          <div className="hidden lg:block absolute top-[40px] left-[16.66%] right-[16.66%] h-px bg-champagne-line" />

          {data.steps.map((step, i) => (
            <Reveal key={i} threshold={0.1} delay={i * 120}>
              <div className="relative z-[1] text-center">
                <span className="inline-block px-5 bg-bone font-serif italic font-light text-5xl lg:text-6xl text-champagne leading-none mb-6">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl lg:text-2xl text-text-primary mb-3 font-normal">
                  {step.title}
                </h3>
                <div className="max-w-[280px] mx-auto text-sm text-(--ink-65) leading-[1.65] font-sans [&_strong]:text-text-primary [&_strong]:font-medium [&_p]:m-0">
                  <RichText value={step.description} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
