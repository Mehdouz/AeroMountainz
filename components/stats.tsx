import { Clock, Users, MapPin, Star, Award, Calendar, type LucideIcon } from 'lucide-react'
import Reveal from './reveal'

const stats: { icon: LucideIcon; value: string; label: string; sub: string }[] = [
  { icon: Clock, value: '3h', label: 'Durée totale', sub: 'dont ~1h de vol' },
  { icon: Users, value: '1 à 5', label: 'Personnes', sub: 'par vol' },
  { icon: Calendar, value: 'Dès 14 ans', label: 'Âge minimum', sub: 'accessible à tous' },
  { icon: MapPin, value: 'Doussard', label: 'Décollage', sub: 'Lac d\'Annecy, 74210' },
  { icon: Star, value: '4.9★', label: 'Avis Google', sub: '+120 avis clients' },
  { icon: Award, value: 'DGAC', label: 'Pilote agréé', sub: '400h+ de vol' },
]

function StatCard({
  icon: Icon,
  value,
  label,
  sub,
  delay,
}: {
  icon: LucideIcon
  value: string
  label: string
  sub: string
  delay: number
}) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col items-center text-center p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--surface)]/50 backdrop-blur-sm transition-colors duration-500 hover:border-[var(--border-gold)] hover:bg-[var(--surface)] group"
    >
      <div className="w-10 h-10 rounded-full bg-[var(--gold-dim)] flex items-center justify-center mb-4 group-hover:bg-[var(--gold)]/20 transition-colors">
        <Icon size={18} className="text-[var(--gold)]" />
      </div>
      <span className="font-serif text-2xl lg:text-3xl font-semibold text-[var(--text-primary)] mb-1">
        {value}
      </span>
      <span className="text-xs font-sans tracking-widest uppercase text-[var(--text-secondary)] mb-1">
        {label}
      </span>
      <span className="text-xs text-[var(--text-muted)] font-sans">{sub}</span>
    </Reveal>
  )
}

export default function Stats() {
  return (
    <section className="section-midnight relative z-10 -mt-2 py-20 lg:py-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-[var(--gold)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
            L&apos;essentiel
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-light text-[var(--text-primary)]">
            Ce que vous <span className="italic text-[var(--gold-light)]">vivrez</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
