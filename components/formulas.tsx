import { ArrowRight, Check } from 'lucide-react'
import Reveal from './reveal'
import StyledHeading from './styled-heading'
import type { Formula } from '@/lib/types/content'

function FormulaCard({
  formula,
  index,
  phoneHref,
  ctaLabel,
}: {
  formula: Formula
  index: number
  phoneHref: string
  ctaLabel: string
}) {
  return (
    <Reveal
      delay={index * 150}
      y={48}
      className={`relative flex flex-col p-8 rounded-3xl ${
        formula.highlight
          ? 'bg-[var(--surface)] border border-[var(--border-gold)]'
          : 'bg-[var(--surface)]/50 border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors'
      }`}
    >
      {formula.highlight && (
        <div className="absolute -top-3 left-8">
          <span className="bg-[var(--champagne)] text-[var(--midnight)] text-xs font-sans font-semibold tracking-widest uppercase px-4 py-1 rounded-full">
            Le plus choisi
          </span>
        </div>
      )}

      <div className="mb-2">
        <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
          {formula.tag}
        </span>
      </div>

      <h3 className="font-serif text-3xl font-light text-[var(--text-primary)] mb-4 leading-tight whitespace-pre-line">
        {formula.title}
      </h3>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
        {formula.description}
      </p>

      <ul className="flex flex-col gap-2.5 mb-8">
        {formula.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm font-sans text-[var(--text-secondary)]">
            <Check size={14} className="text-[var(--gold)] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-5">
          <span className="font-serif text-4xl font-semibold text-[var(--text-primary)]">
            {formula.price}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-sans">{formula.priceDetail}</span>
        </div>
        <a
          href={phoneHref}
          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-sans font-medium tracking-widest uppercase transition-all duration-300 ${
            formula.highlight
              ? 'bg-[var(--champagne)] text-[var(--midnight)] hover:bg-[var(--champagne)]/85'
              : 'border border-[var(--border-gold)] text-[var(--gold)] hover:bg-[var(--gold-dim)]'
          }`}
        >
          {ctaLabel} <ArrowRight size={14} />
        </a>
      </div>
    </Reveal>
  )
}

export default function Formulas({
  items,
  phone,
  eyebrow,
  heading,
  subtext,
  ctaLabel = 'Réserver',
}: {
  items: Formula[]
  phone: string
  eyebrow?: string
  heading: string
  subtext?: string
  ctaLabel?: string
}) {
  const phoneHref = `tel:${phone}`
  return (
    <section id="formules" className="section-midnight py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
                {eyebrow}
              </p>
            )}
            <StyledHeading
              heading={heading}
              className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight"
            />
          </div>
          {subtext && (
            <p className="text-sm text-[var(--text-secondary)] font-sans max-w-xs leading-relaxed">
              {subtext}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((formula, i) => (
            <FormulaCard
              key={`${formula.title}-${i}`}
              formula={formula}
              index={i}
              phoneHref={phoneHref}
              ctaLabel={ctaLabel}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
