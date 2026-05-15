'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import StyledHeading from './styled-heading'
import type { Faq } from '@/lib/types/content'

function FaqItem({ faq, index, dark }: { faq: Faq; index: number; dark?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-[var(--border-subtle)] last:border-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-start justify-between gap-6 ${
          dark ? 'py-7' : 'py-6'
        } text-left group`}
        aria-expanded={open}
      >
        <span
          className={
            dark
              ? 'font-serif font-normal text-[var(--bone)] group-hover:text-[var(--champagne)] transition-colors leading-snug text-xl lg:text-[22px]'
              : 'text-base font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-relaxed'
          }
        >
          {faq.question}
        </span>
        <span
          className={
            dark
              ? 'flex-shrink-0 mt-1 w-8 h-8 rounded-full border border-[var(--bone)]/28 flex items-center justify-center text-[var(--champagne)] transition-all duration-300 group-hover:border-[var(--champagne)]'
              : 'flex-shrink-0 mt-0.5'
          }
        >
          {open ? (
            <Minus size={dark ? 14 : 16} className={dark ? 'text-[var(--champagne)]' : 'text-[var(--gold)]'} />
          ) : (
            <Plus
              size={dark ? 14 : 16}
              className={
                dark
                  ? 'text-[var(--champagne)]'
                  : 'text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors'
              }
            />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p
          className={
            dark
              ? 'text-[15px] text-[var(--bone)]/78 leading-[1.75] font-sans pb-7 max-w-[62ch]'
              : 'text-sm text-[var(--text-secondary)] leading-relaxed font-sans pb-6 pr-8'
          }
        >
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqSection({
  items,
  eyebrow,
  heading,
  lede,
  dark,
}: {
  items: Faq[]
  eyebrow?: string
  heading: string
  lede?: string
  dark?: boolean
}) {
  if (dark) {
    return (
      <section id="faq" className="section-midnight py-24 lg:py-36 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            {eyebrow && (
              <span className="inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--champagne)] mb-5 before:content-[''] before:w-8 before:h-px before:bg-[var(--champagne)]">
                {eyebrow}
              </span>
            )}
            <StyledHeading
              heading={heading}
              className="font-serif font-light leading-[1.05] tracking-[-0.015em] text-[var(--bone)] text-4xl sm:text-5xl lg:text-[56px]"
            />
            {lede && (
              <p className="mt-4 text-[15px] leading-[1.7] text-[var(--bone)]/62 max-w-xl mx-auto">
                {lede}
              </p>
            )}
          </div>

          <div className="border-t border-[var(--bone)]/10">
            {items.map((faq, i) => (
              <FaqItem key={`${faq.question}-${i}`} faq={faq} index={i} dark />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          {eyebrow && (
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              {eyebrow}
            </p>
          )}
          <StyledHeading
            heading={heading}
            className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)]"
          />
          {lede && (
            <p className="mt-4 text-base text-[var(--text-secondary)] max-w-xl mx-auto">
              {lede}
            </p>
          )}
        </div>

        <div className="bg-[var(--surface)] rounded-3xl px-6 lg:px-10">
          {items.map((faq, i) => (
            <FaqItem key={`${faq.question}-${i}`} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
