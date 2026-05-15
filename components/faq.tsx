'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import StyledHeading from './styled-heading'
import type { Faq } from '@/lib/types/content'

function FaqItem({ faq, index, dark }: { faq: Faq; index: number; dark?: boolean }) {
  const [open, setOpen] = useState(false)

  const questionColor = dark
    ? 'text-[var(--bone)]'
    : 'text-[var(--text-primary)]'
  const toggleBorder = dark
    ? 'border-[var(--bone)]/28'
    : 'border-[var(--ink-65)]/30'
  const answerColor = dark
    ? 'text-[var(--bone)]/78'
    : 'text-[var(--ink-65)]'

  return (
    <div
      className={`border-b ${dark ? 'border-[var(--bone)]/10' : 'border-[var(--champagne-line)]'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-6 py-7 text-left group"
        aria-expanded={open}
      >
        <span
          className={`font-serif font-normal ${questionColor} group-hover:text-[var(--champagne)] transition-colors leading-snug text-xl lg:text-[22px]`}
        >
          {faq.question}
        </span>
        <span
          className={`flex-shrink-0 mt-1 w-8 h-8 rounded-full border ${toggleBorder} flex items-center justify-center text-[var(--champagne)] transition-all duration-300 group-hover:border-[var(--champagne)]`}
        >
          {open ? (
            <Minus size={14} className="text-[var(--champagne)]" />
          ) : (
            <Plus size={14} className="text-[var(--champagne)]" />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p
          className={`text-[15px] ${answerColor} leading-[1.75] font-sans pb-7 max-w-[62ch]`}
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
  const sectionBg = dark ? 'section-midnight' : 'bg-[var(--bone)]'
  const headingColor = dark ? 'text-[var(--bone)]' : 'text-[var(--text-primary)]'
  const ledeColor = dark ? 'text-[var(--bone)]/62' : 'text-[var(--ink-65)]'
  const listBorder = dark
    ? 'border-[var(--bone)]/10'
    : 'border-[var(--champagne-line)]'

  return (
    <section id="faq" className={`${sectionBg} py-24 lg:py-36 px-6 lg:px-12`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase text-[var(--champagne)] mb-5 before:content-[''] before:w-8 before:h-px before:bg-[var(--champagne)]">
              {eyebrow}
            </span>
          )}
          <StyledHeading
            heading={heading}
            className={`font-serif font-light leading-[1.05] tracking-[-0.015em] ${headingColor} text-4xl sm:text-5xl lg:text-[56px]`}
          />
          {lede && (
            <p className={`mt-4 text-[15px] leading-[1.7] ${ledeColor} max-w-xl mx-auto`}>
              {lede}
            </p>
          )}
        </div>

        <div className={`border-t ${listBorder}`}>
          {items.map((faq, i) => (
            <FaqItem key={`${faq.question}-${i}`} faq={faq} index={i} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  )
}
