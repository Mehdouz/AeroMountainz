import { Phone, Mail, MapPin } from 'lucide-react'
import type { NavLink } from '@/lib/types/content'

type Props = {
  brandName: string
  brandTagline: string
  brandDescription: string
  navLinks: NavLink[]
  legalLinks: NavLink[]
  phone: string
  phoneDisplay: string
  email: string
  addressLine1: string
  addressLine2: string
}

export default function Footer({
  brandName,
  brandTagline,
  brandDescription,
  navLinks,
  legalLinks,
  phone,
  phoneDisplay,
  email,
  addressLine1,
  addressLine2,
}: Props) {
  return (
    <footer className="section-midnight border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <div className="flex flex-col leading-none mb-5">
              <span className="font-serif text-2xl font-semibold tracking-wider text-[var(--text-primary)]">
                {brandName}
              </span>
              <span className="font-serif text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
                {brandTagline}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans max-w-xs">
              {brandDescription}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
                >
                  <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
                >
                  <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-sans">
                <MapPin size={14} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span>
                  {addressLine1}
                  <br />
                  {addressLine2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} {brandName} {brandTagline} — Tous droits réservés
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors font-sans"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
