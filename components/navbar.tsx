'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import type { NavLink } from '@/lib/types/content'

type Props = {
  navLinks: NavLink[]
  brandName: string
  brandTagline: string
  phone: string
  phoneDisplay: string
  reserveLabel?: string
  reserveHref?: string
}

export default function Navbar({
  navLinks,
  brandName,
  brandTagline,
  phone,
  phoneDisplay,
  reserveLabel = 'Réserver',
  reserveHref = '#formules',
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[var(--bone)]/85 backdrop-blur-md border-b border-[var(--champagne-line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-xl font-semibold tracking-wider text-[var(--text-primary)]">
            {brandName}
          </span>
          <span className="font-serif text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
            {brandTagline}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors duration-300 font-sans"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
          >
            <Phone size={14} />
            <span className="font-mono tracking-wider">{phoneDisplay}</span>
          </a>
          <a
            href={reserveHref}
            className="relative px-6 py-2.5 text-sm font-sans tracking-widest uppercase font-medium text-[var(--midnight)] bg-[var(--champagne)] hover:bg-[var(--champagne)]/85 transition-all duration-300 rounded-full overflow-hidden group"
          >
            {reserveLabel}
          </a>
        </div>

        <button
          className="md:hidden text-[var(--text-primary)] p-2"
          onClick={() => setOpen((p) => !p)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        } bg-[var(--bone)]/95 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 pb-8 pt-4 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base tracking-widest uppercase text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors font-sans"
            >
              {link.label}
            </a>
          ))}
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            <Phone size={14} />
            <span className="font-mono">{phoneDisplay}</span>
          </a>
          <a
            href={reserveHref}
            onClick={() => setOpen(false)}
            className="w-full text-center px-6 py-3 text-sm font-sans tracking-widest uppercase font-medium text-[var(--midnight)] bg-[var(--champagne)] rounded-full"
          >
            {reserveLabel}
          </a>
        </nav>
      </div>
    </header>
  )
}
