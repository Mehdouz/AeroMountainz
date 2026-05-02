import { Fragment } from 'react'

/**
 * Rend un titre H2 avec mise en italic des parties marquées **...**.
 * Insère un <br/> avant chaque segment en italic — pour matcher le style du site.
 *
 * Exemple : `<StyledHeading heading="Choisissez votre **expérience**" />`
 *   → "Choisissez votre <br/><em>expérience</em>"
 */
export default function StyledHeading({
  heading,
  className,
}: {
  heading: string
  className?: string
}) {
  const parts = heading.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <h2 className={className}>
      {parts.map((part, i) => {
        const isEmphasis = part.startsWith('**') && part.endsWith('**')
        const text = isEmphasis ? part.slice(2, -2) : part
        return (
          <Fragment key={i}>
            {i > 0 && isEmphasis && <br />}
            {isEmphasis ? (
              <span className="italic text-[var(--gold-light)]">{text}</span>
            ) : (
              text
            )}
          </Fragment>
        )
      })}
    </h2>
  )
}
