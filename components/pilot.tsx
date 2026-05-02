import Image from 'next/image'
import { Award, Wind, Trophy, type LucideIcon } from 'lucide-react'
import Reveal from './reveal'

const badges: { icon: LucideIcon; label: string }[] = [
  { icon: Award, label: 'Pilote DGAC' },
  { icon: Wind, label: '400h de vol' },
  { icon: Trophy, label: 'Champion de France' },
]

export default function Pilot() {
  return (
    <section id="pilote" className="section-midnight py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--gold)]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal duration={1000} threshold={0.1} x={-48} y={0} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src="/images/pilote-yannick-dacheux.jpg"
                alt="Yannick Dacheux, pilote montgolfière Annecy"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[var(--surface)] border border-[var(--border-gold)] rounded-2xl px-6 py-4">
              <span className="font-serif text-3xl font-semibold text-[var(--gold)]">10 ans</span>
              <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">d&apos;expérience</p>
            </div>
          </Reveal>

          <Reveal duration={1000} delay={200} threshold={0.1} x={48} y={0}>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              Le pilote
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-[var(--text-primary)] leading-tight mb-6">
              Yannick Dacheux,
              <br />
              <span className="italic text-[var(--gold-light)]">votre pilote</span>
            </h2>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-6">
              Passionné de montgolfière depuis plus de 10 ans, Yannick est pilote professionnel
              breveté DGAC. Avec plus de 400 heures de vol à son actif, il est également{' '}
              <strong className="text-[var(--text-primary)]">Champion de France équipier</strong>.
            </p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans mb-8">
              Il connaît le lac d&apos;Annecy comme sa poche, ses courants d&apos;air, ses fenêtres météo,
              ses atterrissages secrets. Vous êtes entre les meilleures mains.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 border border-[var(--border-gold)] rounded-full px-4 py-2"
                >
                  <Icon size={13} className="text-[var(--gold)]" />
                  <span className="text-xs font-sans text-[var(--text-secondary)] tracking-wider">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="tel:+33673940721"
              className="inline-flex items-center gap-2 text-sm font-sans text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors underline underline-offset-4"
            >
              Contacter Yannick directement
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
