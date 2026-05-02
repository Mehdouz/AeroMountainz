import Image from 'next/image'
import { Award, Wind, Trophy, type LucideIcon } from 'lucide-react'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Reveal from './reveal'
import type { Pilot, PilotBadgeIconKey } from '@/lib/types/content'

const iconMap: Record<PilotBadgeIconKey, LucideIcon> = {
  award: Award,
  wind: Wind,
  trophy: Trophy,
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-[var(--text-primary)]">{children}</strong>
    ),
  },
}

export default function Pilot({
  data,
  phone,
  eyebrow = 'Le pilote',
  emphasizedTitle = 'votre pilote',
}: {
  data: Pilot
  phone: string
  eyebrow?: string
  emphasizedTitle?: string
}) {
  return (
    <section id="pilote" className="section-midnight py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--gold)]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal duration={1000} threshold={0.1} x={-48} y={0} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <Image
                src={data.imageSrc}
                alt={data.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)]/60 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-[var(--surface)] border border-[var(--border-gold)] rounded-2xl px-6 py-4">
              <span className="font-serif text-3xl font-semibold text-[var(--gold)]">
                {data.yearsExperience}
              </span>
              <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">d&apos;expérience</p>
            </div>
          </Reveal>

          <Reveal duration={1000} delay={200} threshold={0.1} x={48} y={0}>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              {eyebrow}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-light text-[var(--text-primary)] leading-tight mb-6">
              {data.name},
              <br />
              <span className="italic text-[var(--gold-light)]">{emphasizedTitle}</span>
            </h2>

            <div className="space-y-6 mb-8">
              <PortableText
                value={data.bioParagraphs}
                components={portableTextComponents}
              />
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {data.badges.map(({ iconKey, label }, i) => {
                const Icon = iconMap[iconKey]
                return (
                  <div
                    key={`${label}-${i}`}
                    className="flex items-center gap-2 border border-[var(--border-gold)] rounded-full px-4 py-2"
                  >
                    <Icon size={13} className="text-[var(--gold)]" />
                    <span className="text-xs font-sans text-[var(--text-secondary)] tracking-wider">
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>

            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 text-sm font-sans text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors underline underline-offset-4"
            >
              {data.ctaLabel}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
