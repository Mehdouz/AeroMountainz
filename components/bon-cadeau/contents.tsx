import { Check } from 'lucide-react'
import Reveal from '../reveal'
import RichText from '../rich-text'
import SplitHeading from './split-heading'
import type { BonCadeauContentsSection } from '@/lib/types/content'

export default function BonCadeauContentsSectionView({ data }: { data: BonCadeauContentsSection }) {
  return (
    <section className="section-midnight py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:4px_4px]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal threshold={0.1}>
            <Mockup data={data} />
          </Reveal>

          <Reveal threshold={0.1} delay={150}>
            <div>
              {data.eyebrow && (
                <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-champagne mb-3">
                  {data.eyebrow}
                </p>
              )}
              <SplitHeading
                start={data.headingStart}
                emphasized={data.headingEmphasized}
                end={data.headingEnd}
                breakLines={false}
                className="font-serif font-light text-4xl sm:text-5xl lg:text-[3.25rem] text-bone leading-[1.1]"
              />

              <ul className="mt-9 list-none">
                {data.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 py-5 border-b border-(--champagne)/15 last:border-0 text-[15px] text-(--bone)/90 font-sans [&_strong]:text-bone [&_strong]:font-medium [&_em]:not-italic [&_em]:font-serif [&_em]:italic [&_em]:text-champagne [&_p]:m-0"
                  >
                    <Check
                      size={20}
                      className="text-champagne shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div className="leading-relaxed">
                      <RichText value={bullet.body} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Mockup({ data }: { data: BonCadeauContentsSection }) {
  return (
    <div className="relative flex items-center justify-center min-h-[420px] [perspective:1200px]">
      <div className="absolute w-[280px] sm:w-[320px] aspect-[3/4] rounded-md border border-(--champagne)/20 bg-gradient-to-br from-bone to-bone-2 shadow-2xl opacity-60 -z-10 translate-x-8 translate-y-6 rotate-[6deg]" />
      <div className="relative w-[280px] sm:w-[320px] aspect-[3/4] rounded-md border border-(--champagne)/40 bg-gradient-to-br from-[#2A3654] to-midnight-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)] -rotate-3 hover:rotate-0 hover:-translate-y-2 transition-transform duration-500 px-7 py-8 sm:px-9 sm:py-10 flex flex-col justify-between">
        <span className="absolute top-3.5 left-3.5 w-5 h-5 border-l border-t border-champagne" />
        <span className="absolute top-3.5 right-3.5 w-5 h-5 border-r border-t border-champagne" />
        <span className="absolute bottom-3.5 left-3.5 w-5 h-5 border-l border-b border-champagne" />
        <span className="absolute bottom-3.5 right-3.5 w-5 h-5 border-r border-b border-champagne" />

        <div className="text-center">
          {data.mockupEyebrow && (
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-champagne">
              {data.mockupEyebrow}
            </p>
          )}
          <span className="block w-8 h-px bg-champagne mx-auto my-4" />
          {(data.mockupTitleStart || data.mockupTitleEmphasized) && (
            <h3 className="font-serif font-light text-2xl sm:text-[28px] text-bone leading-tight">
              {data.mockupTitleStart && (
                <>
                  {data.mockupTitleStart}
                  <br />
                </>
              )}
              {data.mockupTitleEmphasized && (
                <em className="italic text-(--champagne)/85">
                  {data.mockupTitleEmphasized}
                </em>
              )}
              {data.mockupTitleEnd && (
                <>
                  <br />
                  {data.mockupTitleEnd}
                </>
              )}
            </h3>
          )}
          <span className="block w-8 h-px bg-champagne mx-auto my-4" />
          <svg viewBox="0 0 80 110" className="w-12 h-16 mx-auto opacity-70" aria-hidden>
            <ellipse cx="40" cy="42" rx="30" ry="36" fill="none" stroke="var(--champagne)" strokeWidth="0.8" />
            <path d="M 22 70 L 30 92 M 58 70 L 50 92" stroke="var(--champagne)" strokeWidth="0.5" fill="none" />
            <rect x="30" y="92" width="20" height="10" fill="none" stroke="var(--champagne)" strokeWidth="0.6" rx="1" />
          </svg>
          {data.mockupRecipient && (
            <p className="mt-3 font-serif italic text-base text-(--bone)/85 whitespace-pre-line">
              {data.mockupRecipient}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-(--champagne)/25 flex justify-between text-[9px] tracking-[0.2em] uppercase text-(--champagne)/65">
          <span>{data.mockupNumberLabel}</span>
          <span>{data.mockupValidityLabel}</span>
        </div>
      </div>
    </div>
  )
}
