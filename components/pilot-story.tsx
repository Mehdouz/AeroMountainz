import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Reveal from './reveal'
import type { PilotStoryItem, PilotStorySection } from '@/lib/types/content'

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[15px] leading-[1.75] text-[var(--ink-65)] font-sans">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-medium text-[var(--ink)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
}

function TimelineItem({ item, index }: { item: PilotStoryItem; index: number }) {
  const isOdd = index % 2 === 0

  return (
    <Reveal threshold={0.15} y={30} duration={800} className="relative mb-14 last:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 items-start pl-14 md:pl-0">
        {/* Dot */}
        <span
          aria-hidden
          className="absolute top-3 left-6 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[var(--champagne)] ring-[6px] ring-[var(--champagne)]/15"
        />

        {/* Content */}
        <div
          className={
            isOdd
              ? 'md:col-start-1 md:text-right md:pr-10'
              : 'md:col-start-2 md:text-left md:pl-10'
          }
        >
          <time
            dateTime={item.dateTime || undefined}
            className="block font-serif italic font-normal text-[26px] md:text-[32px] leading-none text-[var(--champagne)] mb-3.5"
          >
            {item.date}
          </time>

          <h3 className="font-serif font-normal text-[clamp(20px,2.2vw,26px)] leading-[1.25] tracking-tight text-[var(--ink)] mb-4">
            {item.title}
            {item.titleEmphasized && (
              <>
                {' '}
                <em className="italic text-[var(--ink-65)]">{item.titleEmphasized}</em>
              </>
            )}
          </h3>

          <div>
            <PortableText value={item.body} components={bodyComponents} />
          </div>

          {item.tags && item.tags.length > 0 && (
            <div
              className={`mt-3.5 flex flex-wrap gap-2 ${isOdd ? 'md:justify-end' : 'md:justify-start'}`}
            >
              {item.tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="text-[10px] tracking-[0.18em] uppercase text-[var(--ink-65)] border border-[var(--champagne)]/25 bg-[var(--champagne)]/[0.05] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export default function PilotStory({ data }: { data: PilotStorySection }) {
  return (
    <section
      id="mon-histoire"
      aria-labelledby="story-title"
      className="bg-bone py-20 md:py-28 lg:py-36"
    >
      <Reveal threshold={0.15} y={24} className="text-center max-w-[760px] mx-auto px-8 mb-16 md:mb-24">
        {data.eyebrow && (
          <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-[var(--ink-65)] mb-6">
            {data.eyebrow}
          </span>
        )}
        <h2
          id="story-title"
          className="font-serif font-light leading-[1.1] text-[clamp(38px,4.5vw,56px)] text-[var(--ink)]"
        >
          {data.headingStart}
          <br />
          <em className="italic text-[var(--ink-65)]">{data.headingEmphasized}</em>
          {data.headingEnd}
        </h2>
        {data.lede && (
          <p className="font-serif italic font-light text-[clamp(18px,2vw,22px)] leading-[1.5] text-[var(--ink-65)] mt-6">
            {data.lede}
          </p>
        )}
      </Reveal>

      <div className="relative max-w-[980px] mx-auto px-8">
        {/* Vertical line */}
        <span
          aria-hidden
          className="absolute top-3 bottom-20 left-6 md:left-1/2 md:-translate-x-px w-px bg-gradient-to-b from-transparent via-[var(--champagne)] to-transparent opacity-60"
        />

        {data.items.map((item, i) => (
          <TimelineItem key={i} item={item} index={i} />
        ))}
      </div>

      {(data.footerCta || data.signature) && (
        <Reveal
          threshold={0.15}
          y={24}
          className="text-center max-w-[600px] mx-auto px-8 mt-20 pt-14 border-t border-[var(--champagne)]/25"
        >
          {data.footerCta && (
            <p className="font-serif italic font-light text-[22px] leading-[1.5] text-[var(--ink)] mb-7 whitespace-pre-line">
              {data.footerCta}
            </p>
          )}
          {data.footerLinkLabel && data.footerLinkHref && (
            <a
              href={data.footerLinkHref}
              className="inline-flex items-center gap-3 text-[13px] tracking-[0.15em] uppercase text-[var(--ink-65)] border-b border-[var(--champagne)]/25 pb-1.5 hover:text-[var(--champagne)] hover:border-[var(--champagne)] transition-colors"
            >
              {data.footerLinkLabel}
              <span aria-hidden>→</span>
            </a>
          )}
          {data.signature && (
            <div className="font-serif italic text-[28px] text-[var(--ink)] mt-10">
              {data.signature}
            </div>
          )}
          {data.signatureRole && (
            <div className="text-[11px] tracking-[0.25em] uppercase text-[var(--ink-65)] mt-3">
              {data.signatureRole}
            </div>
          )}
        </Reveal>
      )}
    </section>
  )
}
