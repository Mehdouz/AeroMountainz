import Reveal from './reveal'
import type { Review, ReviewsAggregate } from '@/lib/types/content'

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-colors group"
    >
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: review.stars }).map((_, i) => (
          <svg key={i} viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[var(--gold)]">
            <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2.1.7-4.2-3-3 4.2-.6z" />
          </svg>
        ))}
      </div>

      <blockquote className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-6 flex-1 italic">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--text-primary)] font-sans">{review.author}</span>
        <span className="text-xs text-[var(--text-muted)] font-mono">{review.date}</span>
      </div>
    </Reveal>
  )
}

export default function Reviews({
  items,
  aggregate,
}: {
  items: Review[]
  aggregate: ReviewsAggregate
}) {
  return (
    <section className="section-midnight py-24 lg:py-32 relative">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              Témoignages
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight">
              Ils ont volé
              <br />
              <span className="italic text-[var(--gold-light)]">avec nous</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 border border-[var(--border-gold)] rounded-2xl px-6 py-4">
            <div>
              <span className="font-serif text-4xl font-semibold text-[var(--gold)]">
                {aggregate.rating}
              </span>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 16 16" className="w-3 h-3 fill-[var(--gold)]">
                    <path d="M8 1l1.9 3.8 4.2.6-3 3 .7 4.2L8 10.5l-3.8 2.1.7-4.2-3-3 4.2-.6z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-[var(--border-gold)]" />
            <div>
              <span className="text-sm font-medium text-[var(--text-primary)] block font-sans">
                {aggregate.countLabel}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-sans">{aggregate.source}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(0, 3).map((r, i) => (
            <ReviewCard key={r.author} review={r} delay={i * 100} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-3xl mx-auto">
          {items.slice(3).map((r, i) => (
            <ReviewCard key={r.author} review={r} delay={i * 100 + 300} />
          ))}
        </div>
      </div>
    </section>
  )
}
