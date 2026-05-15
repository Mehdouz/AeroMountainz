import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// Rate limit naïf en mémoire (par IP) — réinitialisé au cold start.
// Suffisant pour bloquer un script basique ; pour Internet hostile, brancher Upstash/KV.
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60_000
const ipHits = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)
  if (!entry || entry.resetAt < now) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count += 1
  return true
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Payload = {
  subject?: string
  name?: string
  phone?: string
  email?: string
  date?: string
  pax?: string
  message?: string
  consent?: boolean
  website?: string // honeypot
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderHtml(p: Required<Omit<Payload, 'consent' | 'website'>>): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font:11px/1.4 'JetBrainsMono',monospace;color:#888;text-transform:uppercase;letter-spacing:0.12em;width:120px;vertical-align:top;">${label}</td><td style="padding:8px 12px;font:14px/1.5 -apple-system,sans-serif;color:#111;">${value || '—'}</td></tr>`

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#f5f0e6;font:14px -apple-system,sans-serif;color:#111;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e3dccc;border-radius:6px;overflow:hidden;">
      <div style="padding:24px 28px;background:#0F1B3D;color:#F5EFE6;">
        <div style="font:11px 'JetBrainsMono',monospace;letter-spacing:0.28em;text-transform:uppercase;color:#D4A957;margin-bottom:6px;">Aero · Nouveau message</div>
        <div style="font:300 26px 'Cormorant Garamond',serif;line-height:1.1;">${escapeHtml(p.name)}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row('Sujet', escapeHtml(p.subject))}
        ${row('Email', `<a href="mailto:${escapeHtml(p.email)}" style="color:#0F1B3D;">${escapeHtml(p.email)}</a>`)}
        ${row('Téléphone', p.phone ? `<a href="tel:${escapeHtml(p.phone)}" style="color:#0F1B3D;">${escapeHtml(p.phone)}</a>` : '—')}
        ${row('Date envisagée', escapeHtml(p.date))}
        ${row('Passagers', escapeHtml(p.pax))}
        <tr><td colspan="2" style="padding:16px 12px 8px;font:11px 'JetBrainsMono',monospace;color:#888;text-transform:uppercase;letter-spacing:0.12em;">Message</td></tr>
        <tr><td colspan="2" style="padding:0 12px 24px;font:14px/1.65 -apple-system,sans-serif;color:#111;white-space:pre-wrap;">${escapeHtml(p.message) || '<em style="color:#888;">(vide)</em>'}</td></tr>
      </table>
    </div>
  </body>
</html>`
}

function renderText(p: Required<Omit<Payload, 'consent' | 'website'>>): string {
  return [
    `Nouveau message via le formulaire contact Aero`,
    ``,
    `Sujet      : ${p.subject || '—'}`,
    `Nom        : ${p.name}`,
    `Email      : ${p.email}`,
    `Téléphone  : ${p.phone || '—'}`,
    `Date       : ${p.date || '—'}`,
    `Passagers  : ${p.pax || '—'}`,
    ``,
    `Message :`,
    p.message || '(vide)',
  ].join('\n')
}

export async function POST(req: Request) {
  // 1. Rate limit par IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json({ ok: false, error: 'Trop de requêtes' }, { status: 429 })
  }

  // 2. Parse JSON
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON invalide' }, { status: 400 })
  }

  // 3. Honeypot — réponse silencieuse 200 pour ne pas signaler aux bots
  if (body.website && body.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  // 4. Validation
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  if (!name || name.length > 200) {
    return NextResponse.json({ ok: false, error: 'Nom requis' }, { status: 400 })
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > 200) {
    return NextResponse.json({ ok: false, error: 'Email invalide' }, { status: 400 })
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, error: 'Consentement requis' },
      { status: 400 },
    )
  }

  // 5. Env vars
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  if (!apiKey || !to || !from) {
    console.error('Contact form: missing env vars', {
      apiKey: !!apiKey,
      to: !!to,
      from: !!from,
    })
    return NextResponse.json(
      { ok: false, error: 'Configuration serveur incomplète' },
      { status: 500 },
    )
  }

  // 6. Envoi via Resend
  const resend = new Resend(apiKey)
  const safe = {
    subject: (body.subject || 'info').slice(0, 60),
    name: name.slice(0, 200),
    phone: (body.phone || '').slice(0, 60),
    email: email.slice(0, 200),
    date: (body.date || '').slice(0, 120),
    pax: (body.pax || '').slice(0, 60),
    message: (body.message || '').slice(0, 5000),
  }

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: safe.email,
      subject: `[Contact Aero] ${safe.subject} — ${safe.name}`,
      html: renderHtml(safe),
      text: renderText(safe),
    })
    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        { ok: false, error: 'Envoi impossible — réessayez ou appelez.' },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form unexpected error:', err)
    return NextResponse.json(
      { ok: false, error: 'Erreur serveur' },
      { status: 500 },
    )
  }
}
