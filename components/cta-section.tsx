'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'

export default function CtaSection() {
  const bgRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)

    const handleScroll = () => {
      if (!bgRef.current) return
      const rect = bgRef.current.getBoundingClientRect()
      const offset = rect.top * 0.25
      bgRef.current.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 scale-110 parallax-bg">
        <Image
          src="/images/cta-bg.jpg"
          alt="Montgolfières au-dessus du lac d'Annecy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0c10]/75" />
      </div>

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p
          className={`font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Prêt à décoller ?
        </p>

        <h2
          className={`font-serif text-5xl lg:text-7xl font-light text-[var(--text-primary)] leading-tight mb-6 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Réservez votre vol
          <br />
          <span className="italic text-[var(--gold-light)]">au-dessus d&apos;Annecy</span>
        </h2>

        <p
          className={`text-sm lg:text-base text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed font-sans mb-10 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Confirmation par téléphone le matin du vol selon la météo. Vol reporté sans frais en cas de conditions défavorables.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="tel:+33673940721"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--gold)] text-[#0a0c10] font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[var(--gold-light)] transition-all duration-300 hover:scale-[1.02]"
          >
            <Phone size={15} />
            06 73 94 07 21
          </a>
          <a
            href="mailto:contact@aero-mountains.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--border-gold)] text-[var(--gold)] font-sans text-sm font-medium tracking-widest uppercase rounded-full hover:bg-[var(--gold-dim)] transition-all duration-300"
          >
            Envoyer un message <ArrowRight size={14} />
          </a>
        </div>

        {/* Location */}
        <p
          className={`mt-10 text-xs text-[var(--text-muted)] font-mono tracking-widest transition-all duration-700 delay-500 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Décollage : Doussard, 74210 — Lac d&apos;Annecy
        </p>
      </div>
    </section>
  )
}
