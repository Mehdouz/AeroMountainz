'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Vols', href: '#formules' },
  { label: 'Le déroulé', href: '#journey' },
  { label: 'Le pilote', href: '#pilote' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-[var(--bone)]/85 backdrop-blur-md border-b border-[var(--champagne-line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-serif text-xl font-semibold tracking-wider text-[var(--text-primary)]">
            AERO
          </span>
          <span className="font-serif text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
            Mountains
          </span>
        </Link>

        {/* Desktop nav */}
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

        {/* CTA + phone */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+33673940721"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--gold)] transition-colors"
          >
            <Phone size={14} />
            <span className="font-mono tracking-wider">06 73 94 07 21</span>
          </a>
          <a
            href="#formules"
            className="relative px-6 py-2.5 text-sm font-sans tracking-widest uppercase font-medium text-[var(--midnight)] bg-[var(--champagne)] hover:bg-[var(--champagne)]/85 transition-all duration-300 rounded-full overflow-hidden group"
          >
            Réserver
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-[var(--text-primary)] p-2"
          onClick={() => setOpen((p) => !p)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
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
            href="tel:+33673940721"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            <Phone size={14} />
            <span className="font-mono">06 73 94 07 21</span>
          </a>
          <a
            href="#formules"
            onClick={() => setOpen(false)}
            className="w-full text-center px-6 py-3 text-sm font-sans tracking-widest uppercase font-medium text-[var(--midnight)] bg-[var(--champagne)] rounded-full"
          >
            Réserver
          </a>
        </nav>
      </div>
    </header>
  )
}
