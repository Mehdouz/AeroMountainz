import CloudParallax from './cloud-parallax'

interface CloudBreakProps {
  quote: string
  author?: string
}

export default function CloudBreak({ quote, author }: CloudBreakProps) {
  return (
    <div className="relative h-64 lg:h-80 overflow-hidden my-0">
      <CloudParallax />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-2xl lg:text-4xl font-light italic text-[var(--text-primary)] max-w-2xl text-pretty leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {author && (
          <span className="mt-4 font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
            — {author}
          </span>
        )}
      </div>
    </div>
  )
}
