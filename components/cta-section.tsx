import { Phone, ArrowRight } from 'lucide-react'
import CtaParallax from './cta-parallax'
import Reveal from './reveal'
import type { CtaSectionContent } from '@/lib/types/content'

export default function CtaSection({
  data,
  phone,
  phoneDisplay,
  email,
}: {
  data: CtaSectionContent
  phone: string
  phoneDisplay: string
  email: string
}) {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      <CtaParallax src={data.backgroundImage} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Reveal threshold={0.1} y={16}>
          <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-6">
            {data.eyebrow}
          </p>
        </Reveal>

        <Reveal threshold={0.1} delay={100} y={24}>
          <h2 className="font-serif text-5xl lg:text-7xl font-light text-bone leading-tight mb-6">
            {data.titleStart}
            <br />
            <span className="italic text-champagne">{data.titleEmphasized}</span>
          </h2>
        </Reveal>

        <Reveal threshold={0.1} delay={200} y={16}>
          <p className="text-sm lg:text-base text-(--bone)/75 max-w-lg mx-auto leading-relaxed font-sans mb-10">
            {data.description}
          </p>
        </Reveal>

        <Reveal threshold={0.1} delay={300} y={16}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-champagne text-midnight font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-(--champagne)/85 transition-all duration-300 hover:scale-[1.02]"
            >
              <Phone size={15} />
              {phoneDisplay}
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border-gold text-gold font-sans text-sm font-medium tracking-widest uppercase rounded-full hover:bg-gold-dim transition-all duration-300"
            >
              {data.secondaryCtaLabel} <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal threshold={0.1} delay={500} y={0}>
          <p className="mt-10 text-xs text-(--bone)/50 font-mono tracking-widest">
            {data.locationLabel}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
