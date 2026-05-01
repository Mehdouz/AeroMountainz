import { Phone, Mail, MapPin } from 'lucide-react'

const links = [
  { label: 'Vols & formules', href: '#formules' },
  { label: 'Le déroulé du vol', href: '#journey' },
  { label: 'Le pilote', href: '#pilote' },
  { label: 'Galerie photos', href: '#galerie' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="section-midnight border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none mb-5">
              <span className="font-serif text-2xl font-semibold tracking-wider text-[var(--text-primary)]">
                AERO
              </span>
              <span className="font-serif text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
                Mountains
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-sans max-w-xs">
              Vol en montgolfière privé et partagé au-dessus du lac d&apos;Annecy. Pilote Yannick Dacheux, breveté DGAC.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
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

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-[var(--text-muted)] uppercase mb-5">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+33673940721"
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
                >
                  <Phone size={14} className="text-[var(--gold)] flex-shrink-0" />
                  06 73 94 07 21
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@aero-mountains.com"
                  className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
                >
                  <Mail size={14} className="text-[var(--gold)] flex-shrink-0" />
                  contact@aero-mountains.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-sans">
                <MapPin size={14} className="text-[var(--gold)] flex-shrink-0 mt-0.5" />
                <span>
                  Site de décollage de Doussard
                  <br />
                  74210 Doussard — Haute-Savoie
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)] font-mono">
            © {new Date().getFullYear()} Aero Mountains — Tous droits réservés
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors font-sans">
              Mentions légales
            </a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors font-sans">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
