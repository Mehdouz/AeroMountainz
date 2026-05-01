'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
      }
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translateY(${scrollY * 0.15}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-end">
      {/* Background image with parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 parallax-bg"
        style={{ top: '-10%', height: '120%' }}
      >
        <Image
          src="/images/hero-balloon.jpg"
          alt="Vol en montgolfière au-dessus du lac d'Annecy"
          fill
          priority
          className="object-cover"
          onLoad={() => setLoaded(true)}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)] via-[var(--midnight)]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight)]/60 via-transparent to-transparent" />
      </div>

      {/* Clouds parallax layer */}
      <div
        ref={cloudsRef}
        className="absolute inset-0 pointer-events-none parallax-bg"
        style={{ top: '-5%' }}
      >
        <Image
          src="/images/clouds-layer.jpg"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-screen"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        {/* Eyebrow */}
        <p
          className={`font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-6 transition-all duration-1000 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Doussard · Lac d&apos;Annecy · Alpes
        </p>

        {/* Main heading */}
        <h1
          className={`font-serif text-5xl sm:text-6xl lg:text-8xl font-light leading-none text-[var(--bone)] mb-6 transition-all duration-1000 delay-500 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Vol en
          <br />
          <span className="italic text-[var(--champagne)]">montgolfière</span>
          <br />
          à Annecy
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg text-[var(--bone)]/75 max-w-md leading-relaxed mb-10 font-sans transition-all duration-1000 delay-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Au-dessus du lac et des Alpes, au lever du soleil.
          <br />
          Une heure de silence, de lumière et de vertige.
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-wrap gap-4 transition-all duration-1000 delay-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <a
            href="#formules"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--champagne)] text-[var(--midnight)] font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[var(--champagne)]/85 transition-all duration-300 hover:scale-[1.02]"
          >
            Réserver mon vol
          </a>
          <a
            href="#formules"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border-gold)] text-[var(--gold)] font-sans text-sm font-medium tracking-widest uppercase rounded-full hover:bg-[var(--gold-dim)] transition-all duration-300"
          >
            Offrir un bon cadeau
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[var(--bone)]/50 text-xs tracking-[0.3em] uppercase font-mono">
          Défiler
        </span>
        <ChevronDown className="text-[var(--gold)] animate-bounce" size={18} />
      </div>
    </section>
  )
}
