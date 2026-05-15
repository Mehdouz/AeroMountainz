'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import LangSwitcher from './lang-switcher'
import { localizeHref, type Locale } from '@/lib/i18n'
import type { NavLink } from '@/lib/types/content'

type Props = {
  navLinks: NavLink[]
  logo: string
  logoAlt: string
  phone: string
  phoneDisplay: string
  locale: Locale
  reserveLabel?: string
  reserveHref?: string
  lightSurface?: boolean
}

export default function Navbar({
  navLinks,
  logo,
  logoAlt,
  phone,
  phoneDisplay,
  locale,
  reserveLabel = 'Réserver',
  reserveHref = '/#formules',
  lightSurface = false,
}: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const phoneHref = `tel:${phone}`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,background-image,backdrop-filter] duration-700 after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-champagne-line after:transition-opacity after:duration-700 ${
        scrolled
          ? `backdrop-blur-md after:opacity-100 ${
              lightSurface ? 'bg-(--bone)/85' : 'bg-black/50'
            }`
          : `after:opacity-0 ${
              lightSurface
                ? 'bg-transparent'
                : 'bg-gradient-to-b from-black/45 via-black/15 to-transparent'
            }`
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link href={`/${locale}`} className="flex items-center leading-none group">
          <Image
            src={logo}
            alt={logoAlt}
            width={240}
            height={56}
            className="h-16 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={localizeHref(link.href, locale)}
              className={`relative text-sm tracking-widest uppercase font-sans transition-colors duration-500 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                lightSurface
                  ? 'text-text-secondary hover:text-text-primary'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher currentLocale={locale} tone={lightSurface ? 'dark' : 'light'} />
          <a
            href={phoneHref}
            className={`flex items-center gap-2 text-sm transition-colors duration-500 ${
              lightSurface
                ? 'text-text-secondary hover:text-text-primary'
                : 'text-white/90 hover:text-white'
            }`}
          >
            <Phone size={14} />
            <span className="font-mono tracking-wider">{phoneDisplay}</span>
          </a>
          <Link
            href={localizeHref(reserveHref, locale)}
            className="relative px-6 py-2.5 text-sm font-sans tracking-widest uppercase font-medium text-midnight bg-champagne hover:bg-(--champagne)/85 transition-all duration-300 rounded-full overflow-hidden group"
          >
            {reserveLabel}
          </Link>
        </div>

        <button
          className={`md:hidden p-2 transition-colors duration-500 ${
            lightSurface ? 'text-text-primary' : 'text-white'
          }`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } bg-(--bone)/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 pb-8 pt-4 gap-6">
          {navLinks.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={localizeHref(link.href, locale)}
              onClick={() => setOpen(false)}
              className="text-base tracking-widest uppercase text-text-secondary hover:text-gold transition-colors font-sans"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-4">
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <Phone size={14} />
              <span className="font-mono">{phoneDisplay}</span>
            </a>
            <LangSwitcher currentLocale={locale} />
          </div>
          <Link
            href={localizeHref(reserveHref, locale)}
            onClick={() => setOpen(false)}
            className="w-full text-center px-6 py-3 text-sm font-sans tracking-widest uppercase font-medium text-midnight bg-champagne rounded-full"
          >
            {reserveLabel}
          </Link>
        </nav>
      </div>
    </header>
  )
}
