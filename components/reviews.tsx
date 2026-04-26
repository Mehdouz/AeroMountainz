'use client'

import { useEffect, useRef, useState } from 'react'

const reviews = [
  {
    stars: 5,
    text: 'Un baptême à faire absolument. Yannick est un pilote exceptionnel, passionné et pédagogue. Le lac depuis les airs, c\'est une vision qui reste gravée à jamais.',
    author: 'Pierre C.',
    date: 'Octobre 2024',
  },
  {
    stars: 5,
    text: 'Le cadre est magnifique et le pilote au top ! On est monté juste avant le lever du soleil, la lumière était incroyable. On a même vu des chamois sur les flancs de la Tournette.',
    author: 'Lou V.',
    date: 'Août 2024',
  },
  {
    stars: 5,
    text: 'Wow! What an incredible experience. Yannick was professional, warm and really made us feel safe. The views over Lake Annecy at sunrise are simply breathtaking.',
    author: 'Tom G.',
    date: 'Juillet 2024',
  },
  {
    stars: 5,
    text: 'J\'ai offert ce vol à ma femme pour notre anniversaire. Les larmes d\'émotion au décollage... et le champagne au retour. Une formule parfaite, je recommande sans hésitation.',
    author: 'Mathieu L.',
    date: 'Juin 2024',
  },
  {
    stars: 5,
    text: 'Expérience hors du temps. Le silence, l\'air frais du matin, le lac qui se réveille... Yannick nous a raconté des anecdotes fascinantes tout au long du vol. Merci.',
    author: 'Camille D.',
    date: 'Mai 2024',
  },
]

function ReviewCard({ review, delay }: { review: (typeof reviews)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex flex-col p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-700 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Stars */}
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
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[var(--surface)]/30 pointer-events-none" />

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

          {/* Global rating */}
          <div className="flex items-center gap-4 border border-[var(--border-gold)] rounded-2xl px-6 py-4">
            <div>
              <span className="font-serif text-4xl font-semibold text-[var(--gold)]">4.9</span>
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
              <span className="text-sm font-medium text-[var(--text-primary)] block font-sans">+120 avis</span>
              <span className="text-xs text-[var(--text-muted)] font-sans">Google Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((r, i) => (
            <ReviewCard key={r.author} review={r} delay={i * 100} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 max-w-3xl mx-auto">
          {reviews.slice(3).map((r, i) => (
            <ReviewCard key={r.author} review={r} delay={i * 100 + 300} />
          ))}
        </div>
      </div>
    </section>
  )
}
