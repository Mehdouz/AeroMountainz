import ParallaxBalloon from './parallax-balloon'
import Reveal from './reveal'

const steps = [
  {
    number: '01',
    time: '05h30',
    title: 'Rendez-vous à l\'aube',
    description:
      'Retrouvez-nous sur le site de décollage à Doussard, au bord du lac. Le soleil commence à peine à poindre sur les Alpes.',
  },
  {
    number: '02',
    time: '05h45',
    title: 'Briefing & préparation',
    description:
      'Yannick vous accueille et vous explique les consignes de sécurité. L\'équipe commence à déballer l\'enveloppe.',
  },
  {
    number: '03',
    time: '06h15',
    title: 'Gonflage du ballon',
    description:
      'Un spectacle en soi : regardez la montgolfière prendre vie sous l\'effet du brûleur. La nacelle se redresse doucement.',
  },
  {
    number: '04',
    time: '06h30',
    title: '~1h de vol',
    description:
      'Vous vous élevez silencieusement au-dessus du lac d\'Annecy. Vues panoramiques sur les Aravis, la Tournette, et l\'eau turquoise.',
  },
  {
    number: '05',
    time: '07h30',
    title: 'Atterrissage',
    description:
      'L\'équipe au sol vous accompagne jusqu\'à la zone d\'atterrissage. Un moment de grâce et d\'adrénaline douce.',
  },
  {
    number: '06',
    time: '08h00',
    title: 'Toast champenois',
    description:
      'Tradition aéronautique : on célèbre le vol autour d\'un toast avec le pilote, dans l\'esprit des premiers aéronautes.',
  },
]

function Step({ step, index, isLast }: { step: (typeof steps)[0]; index: number; isLast: boolean }) {
  return (
    <Reveal
      delay={index * 100}
      threshold={0.2}
      x={-32}
      y={0}
      className="relative flex gap-6 lg:gap-10"
    >
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 rounded-full border border-[var(--border-gold)] bg-[var(--surface)] flex items-center justify-center">
          <span className="font-mono text-xs text-[var(--gold)]">{step.number}</span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 mt-3 bg-gradient-to-b from-[var(--border-gold)] to-[var(--border-subtle)] min-h-[48px]" />
        )}
      </div>

      <div className="pb-10 lg:pb-14">
        <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest mb-2 block">
          {step.time}
        </span>
        <h3 className="font-serif text-xl lg:text-2xl font-medium text-[var(--text-primary)] mb-3">
          {step.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans max-w-lg">
          {step.description}
        </p>
      </div>
    </Reveal>
  )
}

export default function Journey() {
  return (
    <section id="journey" className="py-24 lg:py-32 relative overflow-hidden">
      <ParallaxBalloon />

      <div className="absolute right-0 top-1/3 w-96 h-96 bg-[var(--sky-blue)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 self-start">
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              Le déroulé
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight mb-6">
              Comment se passe
              <br />
              <span className="italic text-[var(--gold-light)]">un vol</span>
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans max-w-xs">
              De l&apos;arrivée dans la fraîcheur de l&apos;aube au toast final — voici ce qui vous attend lors d&apos;une matinée avec Aero Mountains.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 border border-[var(--border-gold)] rounded-full px-5 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span className="text-sm font-sans text-[var(--text-secondary)]">
                Durée totale :{' '}
                <strong className="text-[var(--gold)]">environ 3 heures</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, i) => (
              <Step key={step.number} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
