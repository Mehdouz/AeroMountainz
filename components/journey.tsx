import ParallaxBalloon from './parallax-balloon'
import Reveal from './reveal'
import StyledHeading from './styled-heading'
import type { JourneyStep } from '@/lib/types/content'

function Step({ step, index, isLast }: { step: JourneyStep; index: number; isLast: boolean }) {
  return (
    <Reveal
      delay={index * 100}
      threshold={0.2}
      x={-32}
      y={0}
      className="relative flex gap-6 lg:gap-10"
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-10 h-10 rounded-full border border-border-gold bg-surface flex items-center justify-center">
          <span className="font-mono text-xs text-gold">{step.number}</span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-border-gold to-border-subtle min-h-[48px]" />
        )}
      </div>

      <div className="pb-10 lg:pb-14">
        <span className="font-mono text-xs text-text-muted tracking-widest mb-2 block">
          {step.time}
        </span>
        <h3 className="font-serif text-xl lg:text-2xl font-medium text-text-primary mb-3">
          {step.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed font-sans max-w-lg">
          {step.description}
        </p>
      </div>
    </Reveal>
  )
}

export default function Journey({
  items,
  eyebrow,
  heading,
  footer,
}: {
  items: JourneyStep[]
  eyebrow?: string
  heading: string
  footer?: string
}) {
  return (
    <section id="journey" className="py-24 lg:py-32 relative overflow-hidden">
      <ParallaxBalloon />

      <div className="absolute right-0 top-1/3 w-96 h-96 bg-(--sky-blue)/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 self-start">
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">
                {eyebrow}
              </p>
            )}
            <StyledHeading
              heading={heading}
              className="font-serif text-4xl lg:text-6xl font-light text-text-primary leading-tight mb-6"
            />

            {footer && (
              <div className="mt-8 inline-flex items-center gap-3 border border-border-gold rounded-full px-5 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-sm font-sans text-text-secondary">{footer}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            {items.map((step, i) => (
              <Step key={step.number} step={step} index={i} isLast={i === items.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
