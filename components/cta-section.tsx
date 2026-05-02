import { Phone, ArrowRight } from 'lucide-react'
import CtaParallax from './cta-parallax'
import Reveal from './reveal'

export default function CtaSection() {
  return (
    <section className="relative py-24 lg:py-40 overflow-hidden">
      <CtaParallax />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Reveal threshold={0.1} y={16}>
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-6">
            Prêt à décoller ?
          </p>
        </Reveal>

        <Reveal threshold={0.1} delay={100} y={24}>
          <h2 className="font-serif text-5xl lg:text-7xl font-light text-[var(--bone)] leading-tight mb-6">
            Réservez votre vol
            <br />
            <span className="italic text-[var(--champagne)]">au-dessus d&apos;Annecy</span>
          </h2>
        </Reveal>

        <Reveal threshold={0.1} delay={200} y={16}>
          <p className="text-sm lg:text-base text-[var(--bone)]/75 max-w-lg mx-auto leading-relaxed font-sans mb-10">
            Confirmation par téléphone le matin du vol selon la météo. Vol reporté sans frais en cas de conditions défavorables.
          </p>
        </Reveal>

        <Reveal threshold={0.1} delay={300} y={16}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+33673940721"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--champagne)] text-[var(--midnight)] font-sans text-sm font-semibold tracking-widest uppercase rounded-full hover:bg-[var(--champagne)]/85 transition-all duration-300 hover:scale-[1.02]"
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
        </Reveal>

        <Reveal threshold={0.1} delay={500} y={0}>
          <p className="mt-10 text-xs text-[var(--bone)]/50 font-mono tracking-widest">
            Décollage : Doussard, 74210 — Lac d&apos;Annecy
          </p>
        </Reveal>
      </div>
    </section>
  )
}
