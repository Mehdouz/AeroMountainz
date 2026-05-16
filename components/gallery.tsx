'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Reveal from './reveal'
import StyledHeading from './styled-heading'
import type { GalleryItem } from '@/lib/types/content'

type Props = {
  items: GalleryItem[]
  eyebrow?: string
  heading: string
}

const pad2 = (n: number) => String(n + 1).padStart(2, '0')

// Hydration-safe "am I on the client?" — false during SSR, true after.
// Lets us defer createPortal until document.body exists.
const subscribeNoop = () => () => {}
function useIsClient() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}

export default function Gallery({ items, eyebrow, heading }: Props) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const [currentIdx, setCurrentIdx] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const isClient = useIsClient()

  const total = items.length
  const current = items[currentIdx]
  const captionTitle = current?.caption ?? current?.alt ?? ''
  const captionDesc = current?.description

  const open = useCallback((idx: number) => {
    setCurrentIdx(idx)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const navigate = useCallback((delta: number) => {
    if (total < 2) return
    setCurrentIdx((cur) => (((cur + delta) % total) + total) % total)
  }, [total])

  // Body scroll lock — guaranteed cleanup on close or unmount
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Keyboard: ESC / ← / →
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') navigate(-1)
      else if (e.key === 'ArrowRight') navigate(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close, navigate])

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0]
    if (!t) return
    touchStartRef.current = { x: t.screenX, y: t.screenY }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current
    const t = e.changedTouches[0]
    if (!start || !t) return
    const dx = t.screenX - start.x
    const dy = t.screenY - start.y
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) navigate(dx > 0 ? -1 : 1)
    else if (dy < -80 || dy > 80) close()
    touchStartRef.current = null
  }

  // Click on the container closes — children (image, nav buttons) stop propagation
  // so only the empty backdrop area triggers a close. ESC and the cross still work.
  const onContainerClick = () => close()
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  const lightbox = isOpen && current ? (
    <div
      className="fixed inset-0 z-[1000]"
      role="dialog"
      aria-modal="true"
      onClick={onContainerClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="absolute inset-0 backdrop-blur-2xl"
        style={{ background: 'rgba(12, 11, 10, 0.94)' }}
      />

      <div className="absolute top-8 left-9 text-[10px] tracking-[0.35em] uppercase font-medium text-white/50">
        ESC pour fermer
      </div>
      <div className="absolute top-8 right-9 text-[10px] tracking-[0.35em] uppercase font-medium text-white/50">
        <span className="text-champagne">{pad2(currentIdx)}</span>
        &nbsp;/&nbsp;{pad2(total - 1)}
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={currentIdx}
        src={current.src}
        alt={current.alt}
        onClick={stop}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[86vw] max-h-[72vh] rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.45)] animate-in fade-in zoom-in-95 duration-500 ease-out"
        style={{ marginTop: '-40px' }}
      />

      <div className="absolute top-1/2 left-6 -translate-y-1/2">
        <button
          type="button"
          aria-label="Image précédente"
          onClick={(e) => {
            e.stopPropagation()
            navigate(-1)
          }}
          className="w-14 h-14 flex items-center justify-center text-white/35 hover:text-white hover:-translate-x-1 transition-[color,transform] duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} className="w-6 h-6">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-6 -translate-y-1/2">
        <button
          type="button"
          aria-label="Image suivante"
          onClick={(e) => {
            e.stopPropagation()
            navigate(1)
          }}
          className="w-14 h-14 flex items-center justify-center text-white/35 hover:text-white hover:translate-x-1 transition-[color,transform] duration-300"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} className="w-6 h-6">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white max-w-140 w-[calc(100%-6rem)] pointer-events-none">
        <div className="text-[10px] tracking-[0.42em] uppercase font-medium text-champagne mb-3">
          Moment {pad2(currentIdx)}
        </div>
        <h3 className="font-serif text-[clamp(26px,3.6vw,36px)] font-light leading-tight tracking-tight">
          {captionTitle}
        </h3>
        {captionDesc && (
          <p className="font-serif italic font-light text-white/60 mt-2 text-[17px]">
            {captionDesc}
          </p>
        )}
      </div>
    </div>
  ) : null

  return (
    <section id="galerie" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">
                {eyebrow}
              </p>
            )}
            <StyledHeading
              heading={heading}
              className="font-serif text-4xl lg:text-6xl font-light text-text-primary leading-tight"
            />
          </div>
        </div>

        <Reveal
          duration={1000}
          threshold={0.1}
          className="grid grid-cols-3 grid-rows-3 gap-3 lg:gap-4"
          style={{ height: 'clamp(400px, 70vw, 700px)' }}
        >
          {items.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => open(i)}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer focus-visible:outline-2 focus-visible:outline-champagne focus-visible:outline-offset-2 bg-bone-2 ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
              {(img.caption || img.description) && (
                <span className="sr-only">
                  {img.caption && <span>{`. ${img.caption}`}</span>}
                  {img.description && <span>{`. ${img.description}`}</span>}
                </span>
              )}
            </button>
          ))}
        </Reveal>
      </div>

      {isClient && createPortal(lightbox, document.body)}
    </section>
  )
}
