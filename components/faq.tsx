'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { Faq } from '@/lib/types/content'

function FaqItem({ faq, index }: { faq: Faq; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-[var(--border-subtle)] last:border-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-relaxed">
          {faq.question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? (
            <Minus size={16} className="text-[var(--gold)]" />
          ) : (
            <Plus size={16} className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors" />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans pb-6 pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function FaqSection({ items }: { items: Faq[] }) {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)]">
            Questions
            <br />
            <span className="italic text-[var(--gold-light)]">fréquentes</span>
          </h2>
        </div>

        <div className="bg-[var(--surface)] rounded-3xl px-6 lg:px-10">
          {items.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
