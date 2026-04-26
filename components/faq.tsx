'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'Quelle est la meilleure saison pour voler ?',
    answer:
      'Les vols ont lieu d\'avril à octobre. Les plus belles conditions sont souvent en mai-juin et septembre-octobre, avec des matins stables et des couleurs magnifiques. En été, les vols ont lieu très tôt le matin pour profiter des vents calmes du lever du jour.',
  },
  {
    question: 'Que se passe-t-il en cas de mauvaise météo ?',
    answer:
      'La sécurité prime. En cas de conditions défavorables (vent fort, orage, brouillard bas), Yannick décide d\'annuler le vol la veille au soir ou le matin même. Votre vol est alors reporté sans pénalité à une date qui vous convient.',
  },
  {
    question: 'Combien de temps dure un vol au-dessus d\'Annecy ?',
    answer:
      'Le vol en lui-même dure environ 1 heure. En comptant le gonflage, le briefing, le transport et le toast champenois, prévoyez une matinée complète d\'environ 3 heures.',
  },
  {
    question: 'Y a-t-il des contre-indications médicales ?',
    answer:
      'La pratique est déconseillée aux femmes enceintes de plus de 3 mois, aux personnes souffrant de problèmes cardiaques sérieux ou d\'acrophobie sévère. En cas de doute, consultez votre médecin. Il n\'y a pas de limite d\'âge supérieure — nous avons déjà embarqué des passagers de 85 ans.',
  },
  {
    question: 'Combien coûte un vol en montgolfière à Annecy ?',
    answer:
      'Le baptême découverte est à partir de 250€ par personne. Un vol privatif duo est à 650€ pour 2 personnes. Des formules sur mesure pour groupes sont disponibles sur devis. Des bons cadeaux sont disponibles toute l\'année.',
  },
  {
    question: 'Puis-je offrir un vol en bon cadeau ?',
    answer:
      'Absolument ! Les bons cadeaux sont disponibles sans date limite de validité. Ils peuvent être offerts pour n\'importe quelle formule et la date de vol est choisie librement par le bénéficiaire, selon les disponibilités de Yannick.',
  },
]

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="border-b border-[var(--border-subtle)] last:border-0"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-sans font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-relaxed">
          {faq.question}
        </span>
        <span className="flex-shrink-0 mt-0.5">
          {open ? (
            <Minus size={16} className="text-[var(--gold)]" />
          ) : (
            <Plus size={16} className="text-[var(--text-muted)] group-hover:text-[var(--gold)] transition-colors" />
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans pb-6 pr-8">
          {faq.answer}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
            FAQ
          </p>
          <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)]">
            Questions
            <br />
            <span className="italic text-[var(--gold-light)]">fréquentes</span>
          </h2>
        </div>

        <div className="bg-[var(--surface)] rounded-3xl px-6 lg:px-10">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
