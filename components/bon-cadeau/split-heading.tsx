import { Fragment } from 'react'

type Props = {
  start: string
  emphasized: string
  end?: string
  className?: string
  emphasizedClassName?: string
  /** If true, insert <br/> between segments. Default true. */
  breakLines?: boolean
}

export default function SplitHeading({
  start,
  emphasized,
  end,
  className,
  emphasizedClassName = 'italic text-[var(--champagne)] font-light',
  breakLines = true,
}: Props) {
  return (
    <h2 className={className}>
      <Fragment>{start}</Fragment>
      {breakLines ? <br /> : ' '}
      <em className={emphasizedClassName}>{emphasized}</em>
      {end && (
        <>
          {breakLines ? <br /> : ' '}
          {end}
        </>
      )}
    </h2>
  )
}
