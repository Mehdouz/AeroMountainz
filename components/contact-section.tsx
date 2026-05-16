'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Reveal from './reveal'
import type { ContactSection as ContactSectionData } from '@/lib/types/content'

export default function ContactSection({ data }: { data: ContactSectionData }) {
  return (
    <>
      <ContactHero data={data} />
      <ContactCoord data={data} />
      <ContactForm data={data} />
      <ContactLieu data={data} />
    </>
  )
}

/* ============================================================
 * Hero — fond midnight + ballon (bob + parallax)
 * ============================================================ */
function ContactHero({ data }: { data: ContactSectionData }) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLDivElement>(null)
  const mountainsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(0, ${y * 0.15}px, 0)`
      }
      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`
      }
      if (mountainsRef.current) {
        mountainsRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden pt-24 lg:pt-32 pb-16 lg:pb-20 flex items-end"
      style={{
        minHeight: '78vh',
        background:
          'radial-gradient(ellipse at 70% 30%, #2a3a6e 0%, transparent 50%), linear-gradient(180deg, #1a2a55 0%, var(--midnight) 60%, var(--midnight-2) 100%)',
      }}
    >
      {/* Sky / atmosphere (parallax) */}
      <div
        ref={skyRef}
        aria-hidden
        className="absolute inset-0 will-change-transform pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 80%, rgba(201,169,97,.08), transparent 70%), radial-gradient(ellipse 80% 50% at 80% 20%, rgba(120,150,220,.18), transparent 70%)',
        }}
      />

      {/* Balloon — outer = parallax, inner = bob */}
      <div
        ref={parallaxRef}
        aria-hidden
        className="absolute top-[18%] right-[8%] z-[2] pointer-events-none will-change-transform"
        style={{ width: 110, filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.35))' }}
      >
        <div className="animate-balloon-bob">
          <BalloonSvg />
        </div>
      </div>

      {/* Mountains silhouette (parallax) */}
      <div
        ref={mountainsRef}
        aria-hidden
        className="absolute left-0 right-0 bottom-0 will-change-transform pointer-events-none"
        style={{
          height: '30%',
          background:
            'linear-gradient(180deg,transparent 0%,rgba(11,22,50,.4) 60%, var(--midnight-2) 100%)',
        }}
      >
        <svg
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-full"
        >
          <polygon
            points="0,400 0,260 180,180 320,240 480,160 640,220 820,140 980,210 1180,150 1340,220 1500,170 1600,200 1600,400"
            fill="#0B1632"
            opacity=".95"
          />
          <polygon
            points="0,400 0,310 140,260 320,300 520,240 720,290 920,250 1120,300 1320,260 1500,290 1600,280 1600,400"
            fill="#08112a"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-[5] w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-end">
        <div className="max-w-[680px]">
          {data.eyebrow && (
            <Reveal threshold={0.01} duration={1000} y={16}>
              <span className="inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase text-champagne mb-6 before:content-[''] before:w-9 before:h-px before:bg-champagne">
                {data.eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal threshold={0.01} delay={80} duration={1000} y={24}>
            <h1
              className="font-serif font-light leading-[0.98] tracking-[-0.02em] text-bone text-balance"
              style={{ fontSize: 'clamp(44px,7vw,104px)' }}
            >
              {data.titleStart}{' '}
              <span className="italic font-normal text-champagne">
                {data.titleEmphasized}
              </span>
              .
            </h1>
          </Reveal>
          {data.subtitle && (
            <Reveal threshold={0.01} delay={160} duration={1000} y={16}>
              <p className="mt-7 max-w-[46ch] text-base leading-[1.7] text-(--bone)/75">
                {data.subtitle}
              </p>
            </Reveal>
          )}
        </div>

        {data.infoLines && data.infoLines.length > 0 && (
          <Reveal threshold={0.01} delay={240} duration={1000} y={16}>
            <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-(--bone)/62 pb-2 flex flex-col gap-5">
              {data.infoLines.map((line, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <span>{line.label}</span>
                  <b className="text-bone font-normal text-[13px] tracking-[0.08em] font-serif italic normal-case">
                    {line.value}
                  </b>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  )
}

function BalloonSvg() {
  return (
    <svg viewBox="0 0 100 140" className="block w-full h-auto" aria-hidden>
      <ellipse cx="50" cy="55" rx="40" ry="48" fill="var(--champagne)" />
      <ellipse cx="50" cy="55" rx="40" ry="48" fill="url(#balloonShade)" opacity=".4" />
      <defs>
        <linearGradient id="balloonShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".4" />
          <stop offset="1" stopColor="#000" stopOpacity=".5" />
        </linearGradient>
      </defs>
      <line x1="22" y1="92" x2="42" y2="115" stroke="var(--midnight)" strokeWidth="1.4" />
      <line x1="78" y1="92" x2="58" y2="115" stroke="var(--midnight)" strokeWidth="1.4" />
      <line x1="50" y1="103" x2="50" y2="115" stroke="var(--midnight)" strokeWidth="1.4" />
      <rect x="38" y="115" width="24" height="16" fill="#3a2a14" rx="1" />
    </svg>
  )
}

/* ============================================================
 * Coord — bandeau 3 colonnes
 * ============================================================ */
function ContactCoord({ data }: { data: ContactSectionData }) {
  if (!data.infoColumns?.length) return null
  return (
    <div
      className="border-t border-b border-(--bone)/10"
      style={{ background: 'var(--midnight-2)' }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3">
        {data.infoColumns.map((col, i) => (
          <Reveal key={i} delay={i * 80} duration={800} y={20}>
            <div
              className="flex flex-col gap-3.5 px-9 py-11 md:border-r border-(--bone)/10 last:border-r-0 transition-colors hover:bg-[rgba(201,169,97,0.04)] h-full"
            >
              <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-champagne">
                {col.num}
              </span>
              {col.label && (
                <span className="font-serif italic text-sm text-(--bone)/62">
                  {col.label}
                </span>
              )}
              <span className="font-serif text-[26px] font-normal text-bone leading-tight tracking-[-0.01em]">
                {col.link ? (
                  <a
                    href={col.link}
                    className="transition-colors hover:text-champagne"
                  >
                    {col.value}
                    {col.valueLine2 && (
                      <>
                        <br />
                        {col.valueLine2}
                      </>
                    )}
                  </a>
                ) : (
                  <>
                    {col.value}
                    {col.valueLine2 && (
                      <>
                        <br />
                        {col.valueLine2}
                      </>
                    )}
                  </>
                )}
              </span>
              {col.hint && (
                <span className="text-xs text-(--bone)/62 leading-relaxed whitespace-pre-line">
                  {col.hint}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
 * Form — Resend via /api/contact
 * ============================================================ */
type FormState = {
  subject: string
  name: string
  phone: string
  email: string
  date: string
  pax: string
  message: string
  consent: boolean
  website: string // honeypot
}

function ContactForm({ data }: { data: ContactSectionData }) {
  const defaultSubject = data.subjects[0]?.value ?? ''
  const defaultPax = data.paxOptions?.[1] ?? data.paxOptions?.[0] ?? ''

  const [form, setForm] = useState<FormState>({
    subject: defaultSubject,
    name: '',
    phone: '',
    email: '',
    date: '',
    pax: defaultPax,
    message: '',
    consent: false,
    website: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Une erreur est survenue')
      }
      setStatus('success')
      // Reset après succès
      setForm({
        subject: defaultSubject,
        name: '',
        phone: '',
        email: '',
        date: '',
        pax: defaultPax,
        message: '',
        consent: false,
        website: '',
      })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erreur inconnue')
    }
  }

  return (
    <section id="form" className="px-6 lg:px-12 py-24 lg:py-36 relative bg-bone">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-24 items-start">
        {/* Left col */}
        <div>
          {data.formEyebrow && (
            <Reveal y={14}>
              <span className="inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase text-champagne mb-6 before:content-[''] before:w-8 before:h-px before:bg-champagne">
                {data.formEyebrow}
              </span>
            </Reveal>
          )}
          {(data.formTitleStart || data.formTitleEmphasized) && (
            <Reveal delay={80} y={20}>
              <h2
                className="font-serif font-light leading-[1.05] tracking-[-0.015em] text-ink text-balance"
                style={{ fontSize: 'clamp(36px,4.5vw,56px)' }}
              >
                {data.formTitleStart}{' '}
                {data.formTitleEmphasized && (
                  <span className="italic text-champagne">
                    {data.formTitleEmphasized}
                  </span>
                )}
              </h2>
            </Reveal>
          )}
          {data.formLede && (
            <Reveal delay={160} y={14}>
              <p className="mt-5 text-ink/70 text-[15px] leading-[1.75] max-w-[42ch]">
                {data.formLede}
              </p>
            </Reveal>
          )}
          {data.formMeta && data.formMeta.length > 0 && (
            <Reveal delay={240} y={14}>
              <div className="mt-10 pt-7 border-t border-ink/10 flex flex-col gap-4">
                {data.formMeta.map((row, i) => (
                  <div key={i} className="flex gap-3.5 items-baseline">
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink/62 min-w-[90px]">
                      {row.key}
                    </span>
                    <span className="text-sm text-ink leading-snug">{row.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Form */}
        <Reveal delay={120} y={20}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-md p-7 lg:p-12 border border-ink/10"
            style={{ background: 'var(--bone-2)' }}
          >
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 1,
                height: 1,
                opacity: 0,
              }}
            />

            {/* Subjects */}
            {data.subjects.length > 0 && (
              <FieldBlock label="Sujet" required>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {data.subjects.map((s) => (
                    <label key={s.value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="subject"
                        value={s.value}
                        checked={form.subject === s.value}
                        onChange={() => update('subject', s.value)}
                        className="sr-only peer"
                      />
                      <span className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-ink/28 rounded-xs font-mono text-[10px] tracking-[0.22em] uppercase text-ink transition-colors hover:border-(--champagne)/50 peer-checked:bg-champagne peer-checked:text-midnight peer-checked:border-champagne">
                        {s.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FieldBlock>
            )}

            <div className="grid md:grid-cols-2 gap-7 mt-7">
              <FieldBlock label="Prénom & nom" required htmlFor="f-name">
                <Input
                  id="f-name"
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  placeholder="Camille Dubois"
                  required
                />
              </FieldBlock>
              <FieldBlock label="Téléphone" htmlFor="f-phone">
                <Input
                  id="f-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update('phone', v)}
                  placeholder="06 ··· ·· ·· ··"
                />
              </FieldBlock>
            </div>

            <div className="mt-7">
              <FieldBlock label="Email" required htmlFor="f-email">
                <Input
                  id="f-email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  placeholder="camille@email.com"
                  required
                />
              </FieldBlock>
            </div>

            <div className="grid md:grid-cols-2 gap-7 mt-7">
              <FieldBlock label="Date envisagée" htmlFor="f-date">
                <Input
                  id="f-date"
                  value={form.date}
                  onChange={(v) => update('date', v)}
                  placeholder="Mi-juin, un samedi"
                />
              </FieldBlock>
              {data.paxOptions && data.paxOptions.length > 0 && (
                <FieldBlock label="Passagers" htmlFor="f-pax">
                  <Select
                    id="f-pax"
                    value={form.pax}
                    onChange={(v) => update('pax', v)}
                    options={data.paxOptions}
                  />
                </FieldBlock>
              )}
            </div>

            <div className="mt-7">
              <FieldBlock label="Votre message" htmlFor="f-msg">
                <textarea
                  id="f-msg"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Dites-nous l'occasion, ce qui vous fait rêver, ou simplement bonjour."
                  className="bg-transparent border-0 border-b border-ink/28 pt-3.5 pb-3 text-ink font-sans text-base font-light leading-[1.65] min-h-[120px] resize-y w-full outline-hidden transition-colors focus:border-champagne placeholder:text-ink/30 placeholder:italic"
                />
              </FieldBlock>
            </div>

            {/* Consent */}
            <label className="mt-8 text-[11.5px] text-ink/62 leading-relaxed flex gap-3 items-start cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update('consent', e.target.checked)}
                required
                className="appearance-none w-3.5 h-3.5 border border-ink/28 rounded-xs mt-0.5 cursor-pointer shrink-0 relative transition-colors checked:bg-champagne checked:border-champagne after:content-[''] checked:after:absolute checked:after:left-[3px] checked:after:top-0 checked:after:w-1 checked:after:h-2 checked:after:border-solid checked:after:border-r-2 checked:after:border-b-2 checked:after:border-midnight checked:after:rotate-45"
              />
              <span>
                {data.consentText ||
                  "J'accepte que mes informations soient utilisées pour me répondre. Aucune newsletter, aucun partage avec des tiers."}
              </span>
            </label>

            {/* Submit */}
            <div className="mt-8 flex items-center gap-5 flex-wrap">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-[18px] rounded-xs font-sans text-[12px] tracking-[0.18em] uppercase font-medium cursor-pointer transition-all duration-300 bg-champagne text-midnight hover:bg-(--champagne)/85 hover:-translate-y-px disabled:opacity-60 disabled:cursor-wait shadow-[0_8px_24px_-10px_rgba(201,169,97,0.6)] hover:shadow-[0_14px_28px_-12px_rgba(201,169,97,0.7)]"
              >
                {status === 'submitting'
                  ? 'Envoi…'
                  : status === 'success'
                    ? data.successMessage || 'Message envoyé ✓'
                    : `${data.submitLabel || 'Envoyer le message'} →`}
              </button>
              {data.submitHint && status !== 'success' && status !== 'error' && (
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink/62">
                  {data.submitHint}
                </span>
              )}
              {status === 'error' && (
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-terracotta">
                  {data.errorMessage || errorMsg || 'Erreur — réessayez ou appelez.'}
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function FieldBlock({
  label,
  required,
  htmlFor,
  children,
}: {
  label: string
  required?: boolean
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[10px] tracking-[0.28em] uppercase text-ink/62 font-normal"
      >
        {label} {required && <span className="text-champagne ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

function Input({
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="bg-transparent border-0 border-b border-ink/28 py-2.5 text-ink font-serif text-xl font-normal tracking-[-0.005em] outline-hidden w-full transition-colors focus:border-champagne placeholder:text-ink/30 placeholder:italic placeholder:font-serif"
    />
  )
}

function Select({
  id,
  value,
  onChange,
  options,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: string[]
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent border-0 border-b border-ink/28 py-2.5 pr-7 text-ink font-serif text-xl font-normal tracking-[-0.005em] outline-hidden w-full transition-colors focus:border-champagne cursor-pointer appearance-none"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 7'><path d='M1 1l5 5 5-5' fill='none' stroke='%23C9A961' stroke-width='1.2'/></svg>\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 4px center',
        backgroundSize: '12px',
      }}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-bone text-ink">
          {opt}
        </option>
      ))}
    </select>
  )
}

/* ============================================================
 * Lieu — grid texte + iframe Google Maps
 * ============================================================ */
function ContactLieu({ data }: { data: ContactSectionData }) {
  return (
    <div
      className="relative border-t border-(--bone)/10"
      style={{ background: 'var(--midnight-2)' }}
    >
      <div className="max-w-[1480px] mx-auto grid lg:grid-cols-[1fr_1.1fr] min-h-[520px]">
        {/* Text */}
        <div className="px-6 lg:px-16 py-20 lg:py-24 flex flex-col justify-center max-w-[640px]">
          {data.lieuEyebrow && (
            <Reveal y={14}>
              <span className="inline-flex items-center gap-3.5 font-mono text-[11px] tracking-[0.32em] uppercase text-champagne mb-6 before:content-[''] before:w-8 before:h-px before:bg-champagne">
                {data.lieuEyebrow}
              </span>
            </Reveal>
          )}
          {(data.lieuTitleStart || data.lieuTitleEmphasized) && (
            <Reveal delay={80} y={20}>
              <h2
                className="font-serif font-light leading-[1.05] tracking-[-0.015em] text-bone"
                style={{ fontSize: 'clamp(34px,4vw,52px)' }}
              >
                {data.lieuTitleStart}{' '}
                {data.lieuTitleEmphasized && (
                  <span className="italic text-champagne">
                    {data.lieuTitleEmphasized}
                  </span>
                )}
              </h2>
            </Reveal>
          )}
          {data.lieuLede && (
            <Reveal delay={160} y={14}>
              <p className="mt-5 text-(--bone)/62 text-[15px] leading-[1.75] max-w-[42ch]">
                {data.lieuLede}
              </p>
            </Reveal>
          )}
          {data.lieuList && data.lieuList.length > 0 && (
            <Reveal delay={240} y={14}>
              <ul className="mt-8 flex flex-col gap-3.5">
                {data.lieuList.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3.5 items-start text-sm text-(--bone)/92 leading-snug"
                  >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-champagne shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        {/* Map */}
        <div className="py-20 lg:py-24  flex items-center justify-center">
          <iframe
            src={data.mapEmbedUrl}
            title="Carte du lieu de rendez-vous"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-[380px] border-0"
          />
        </div>
      </div>
    </div>
  )
}
