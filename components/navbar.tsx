'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'
import { useLenis } from 'lenis/react'
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
  const lenis = useLenis()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open, lenis])

  const phoneHref = `tel:${phone}`

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,background-image,backdrop-filter] duration-700 after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-champagne-line after:transition-opacity after:duration-700 ${
          scrolled
            ? `backdrop-blur-md after:opacity-100 ${
                lightSurface ? 'bg-(--bone)/85' : 'bg-(--midnight)/70'
              }`
            : `after:opacity-0 ${
                lightSurface
                  ? 'bg-transparent'
                  : 'bg-linear-to-b from-black/45 via-black/15 to-transparent'
              }`
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link
            href={`/${locale}`}
            className="flex items-center leading-none group shrink-0"
          >
            <Image
              src={logo}
              alt={logoAlt}
              width={64}
              height={64}
              className="h-14 xl:h-16 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={`${link.href}-${i}`}
                href={localizeHref(link.href, locale)}
                className={`relative text-sm tracking-widest uppercase font-sans whitespace-nowrap transition-colors duration-500 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-gold after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  lightSurface
                    ? 'text-text-secondary hover:text-text-primary'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <LangSwitcher currentLocale={locale} tone={lightSurface ? 'dark' : 'light'} />
            <a
              href={phoneHref}
              className={`flex items-center gap-2 text-sm whitespace-nowrap transition-colors duration-500 ${
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
              className="relative px-6 py-2.5 text-sm font-sans tracking-widest uppercase font-medium text-midnight bg-champagne hover:bg-(--champagne)/85 transition-all duration-300 rounded-full overflow-hidden group whitespace-nowrap"
            >
              {reserveLabel}
            </Link>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors duration-500 ${
              lightSurface ? 'text-text-primary' : 'text-white'
            }`}
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <div
        className={`lg:hidden fixed inset-0 z-55 section-midnight flex flex-col transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
      >
        <div className="max-w-7xl px-6 flex items-center justify-between h-20 shrink-0">
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            className="flex items-center leading-none"
          >
            <Image
              src={logo}
              alt={logoAlt}
              width={56}
              height={56}
              className="h-14 w-auto"
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer le menu"
            className="p-2 text-bone"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6 gap-7">
          {navLinks.map((link, i) => (
            <Link
              key={`${link.href}-${i}`}
              href={localizeHref(link.href, locale)}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
              className={`font-serif font-light text-4xl sm:text-5xl leading-none text-bone hover:text-champagne transition-all duration-700 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 px-6 pb-10 pt-6 border-t border-border-subtle flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-sm text-bone/80 hover:text-bone transition-colors whitespace-nowrap"
            >
              <Phone size={14} />
              <span className="font-mono tracking-wider">{phoneDisplay}</span>
            </a>
            <LangSwitcher currentLocale={locale} tone="light" />
          </div>
          <Link
            href={localizeHref(reserveHref, locale)}
            onClick={() => setOpen(false)}
            className="w-full text-center px-6 py-3.5 text-sm font-sans tracking-widest uppercase font-medium text-midnight bg-champagne hover:bg-(--champagne)/85 rounded-full transition-colors"
          >
            {reserveLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
