'use client'

import { useState } from 'react'
import Reveal from '../reveal'
import RichText from '../rich-text'
import SplitHeading from './split-heading'
import type { BonCadeauFaqItem, BonCadeauFaqSection } from '@/lib/types/content'

function FaqItem({ item }: { item: BonCadeauFaqItem }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[var(--champagne-line)] first:border-t">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left transition-colors group"
      >
        <span className="font-serif text-lg lg:text-[19px] text-[var(--text-primary)] group-hover:text-[var(--champagne)]/85 transition-colors">
          {item.question}
        </span>
        <span
          className={`relative flex-shrink-0 w-6 h-6 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden
        >
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[var(--champagne)]/85" />
          <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-[var(--champagne)]/85" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-7 pr-8 max-w-[90%] text-[15px] text-[var(--ink-65)] leading-[1.7] font-sans [&_p]:m-0 [&_strong]:text-[var(--text-primary)]">
          <RichText value={item.answer} />
        </div>
      </div>
    </div>
  )
}

export default function BonCadeauFaqSectionView({ data }: { data: BonCadeauFaqSection }) {
  return (
    <section className="py-24 lg:py-32 bg-[var(--bone)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal threshold={0.1}>
          <div className="text-center mb-14 lg:mb-16">
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
              className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.25rem] text-[var(--text-primary)] leading-tight"
            />
          </div>
        </Reveal>

        <div className="max-w-[780px] mx-auto">
          {data.items.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
