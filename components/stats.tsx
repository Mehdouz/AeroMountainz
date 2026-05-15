import { Clock, Users, MapPin, Star, Award, Calendar, type LucideIcon } from 'lucide-react'
import Reveal from './reveal'
import StyledHeading from './styled-heading'
import type { Stat, StatIconKey } from '@/lib/types/content'

const iconMap: Record<StatIconKey, LucideIcon> = {
  clock: Clock,
  users: Users,
  mapPin: MapPin,
  star: Star,
  award: Award,
  calendar: Calendar,
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const Icon = iconMap[stat.iconKey]
  return (
    <Reveal
      delay={delay}
      className="flex flex-col items-center text-center p-6 border border-border-subtle rounded-2xl bg-(--surface)/50 backdrop-blur-xs transition-colors duration-500 hover:border-border-gold hover:bg-surface group"
    >
      <div className="w-10 h-10 rounded-full bg-gold-dim flex items-center justify-center mb-4 group-hover:bg-(--gold)/20 transition-colors">
        <Icon size={18} className="text-gold" />
      </div>
      <span className="font-serif text-2xl lg:text-3xl font-semibold text-text-primary mb-1">
        {stat.value}
      </span>
      <span className="text-xs font-sans tracking-widest uppercase text-text-secondary mb-1">
        {stat.label}
      </span>
      <span className="text-xs text-text-muted font-sans">{stat.sub}</span>
    </Reveal>
  )
}

export default function Stats({
  items,
  eyebrow,
  heading,
}: {
  items: Stat[]
  eyebrow?: string
  heading: string
}) {
  return (
    <section className="section-midnight relative z-10 -mt-2 py-20 lg:py-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          {eyebrow && (
            <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">
              {eyebrow}
            </p>
          )}
          <StyledHeading
            heading={heading}
            className="font-serif text-4xl lg:text-5xl font-light text-text-primary"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((stat, i) => (
            <StatCard key={`${stat.label}-${i}`} stat={stat} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
