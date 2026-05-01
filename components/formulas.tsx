'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

const formulas = [
  {
    tag: 'Découverte',
    title: 'Baptême\ndécouverte',
    price: '250 €',
    priceDetail: 'par personne',
    description:
      'Rejoignez le vol partagé au lever du soleil. Idéal pour une première expérience magique au-dessus du lac d\'Annecy.',
    features: [
      '1 à 5 personnes',
      'Vol d\'environ 1 heure',
      'Départ à l\'aube',
      'Toast champenois',
    ],
    highlight: false,
  },
  {
    tag: 'Populaire',
    title: 'Vol privatif\nduo',
    price: '650 €',
    priceDetail: 'pour 2 personnes',
    description:
      'Un vol en exclusivité pour deux. Romantique, intime, inoubliable. Le cadre parfait pour une demande en mariage.',
    features: [
      '2 personnes uniquement',
      'Vol d\'1h en privatif',
      'Personnalisation possible',
      'Champagne & surprise',
    ],
    highlight: true,
  },
  {
    tag: 'Sur mesure',
    title: 'Vol privatif\nfamille',
    price: 'Sur devis',
    priceDetail: 'à partir de 5 pers.',
    description:
      'Offrez à vos proches une expérience hors du commun. Formule adaptée à vos envies, pour tout groupe jusqu\'à 5 personnes.',
    features: [
      'Jusqu\'à 5 personnes',
      'Itinéraire personnalisé',
      'Accompagnement dédié',
      'Possibilité bon cadeau',
    ],
    highlight: false,
  },
]

function FormulaCard({
  formula,
  index,
}: {
  formula: (typeof formulas)[0]
  index: number
}) {
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
      className={`relative flex flex-col p-8 rounded-3xl transition-all duration-700 ${
        formula.highlight
          ? 'bg-[var(--surface)] border border-[var(--border-gold)]'
          : 'bg-[var(--surface)]/50 border border-[var(--border-subtle)] hover:border-[var(--border-gold)]'
      } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {formula.highlight && (
        <div className="absolute -top-3 left-8">
          <span className="bg-[var(--champagne)] text-[var(--midnight)] text-xs font-sans font-semibold tracking-widest uppercase px-4 py-1 rounded-full">
            Le plus choisi
          </span>
        </div>
      )}

      <div className="mb-2">
        <span className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
          {formula.tag}
        </span>
      </div>

      <h3 className="font-serif text-3xl font-light text-[var(--text-primary)] mb-4 leading-tight whitespace-pre-line">
        {formula.title}
      </h3>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
        {formula.description}
      </p>

      <ul className="flex flex-col gap-2.5 mb-8">
        {formula.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm font-sans text-[var(--text-secondary)]">
            <Check size={14} className="text-[var(--gold)] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <div className="flex items-baseline gap-2 mb-5">
          <span className="font-serif text-4xl font-semibold text-[var(--text-primary)]">
            {formula.price}
          </span>
          <span className="text-xs text-[var(--text-muted)] font-sans">{formula.priceDetail}</span>
        </div>
        <a
          href="tel:+33673940721"
          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-sans font-medium tracking-widest uppercase transition-all duration-300 ${
            formula.highlight
              ? 'bg-[var(--champagne)] text-[var(--midnight)] hover:bg-[var(--champagne)]/85'
              : 'border border-[var(--border-gold)] text-[var(--gold)] hover:bg-[var(--gold-dim)]'
          }`}
        >
          Réserver <ArrowRight size={14} />
        </a>
      </div>
    </div>
  )
}

export default function Formulas() {
  return (
    <section id="formules" className="section-midnight py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              Nos formules
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight">
              Choisissez votre
              <br />
              <span className="italic text-[var(--gold-light)]">expérience</span>
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] font-sans max-w-xs leading-relaxed">
            Chaque vol est confirmé par téléphone la veille au soir, selon les conditions météo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formulas.map((formula, i) => (
            <FormulaCard key={formula.title} formula={formula} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
