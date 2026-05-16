import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { NavLink } from '@/lib/types/content'

const COPYRIGHT_YEAR = new Date().getFullYear()

type Props = {
  logo: string
  logoAlt: string
  siteName: string
  brandDescription: string
  navLinks: NavLink[]
  legalLinks: NavLink[]
  phone: string
  phoneDisplay: string
  email: string
  addressLine1: string
  addressLine2: string
  locale: Locale
  navHeading?: string
  contactHeading?: string
  rightsLabel?: string
}

export default function Footer({
  logo,
  logoAlt,
  siteName,
  brandDescription,
  navLinks,
  legalLinks,
  phone,
  phoneDisplay,
  email,
  addressLine1,
  addressLine2,
  locale,
  navHeading = 'Navigation',
  contactHeading = 'Contact',
  rightsLabel = 'Tous droits réservés',
}: Props) {
  return (
    <footer className="section-midnight border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <Image
              src={logo}
              alt={logoAlt}
              width={72}
              height={72}
              className="h-18 w-auto mb-5"
            />
            <p className="text-sm text-text-secondary leading-relaxed font-sans max-w-xs">
              {brandDescription}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-text-muted uppercase mb-5">
              {navHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={localizeHref(link.href, locale)}
                    className="text-sm text-text-secondary hover:text-gold transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.3em] text-text-muted uppercase mb-5">
              {contactHeading}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-gold transition-colors font-sans"
                >
                  <Phone size={14} className="text-gold shrink-0" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-sm text-text-secondary hover:text-gold transition-colors font-sans"
                >
                  <Mail size={14} className="text-gold shrink-0" />
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-text-secondary font-sans">
                <MapPin size={14} className="text-gold shrink-0 mt-0.5" />
                <span>
                  {addressLine1}
                  <br />
                  {addressLine2}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {COPYRIGHT_YEAR} {siteName} — {rightsLabel}
          </p>
          <div className="flex gap-6">
            {legalLinks?.map((link, i) => (
              <Link
                key={`${link.label}-${i}`}
                href={localizeHref(link.href, locale)}
                className="text-xs text-text-muted hover:text-gold transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
