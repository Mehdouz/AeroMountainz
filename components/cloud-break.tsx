'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface CloudBreakProps {
  quote: string
  author?: string
}

export default function CloudBreak({ quote, author }: CloudBreakProps) {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      const rect = bgRef.current.getBoundingClientRect()
      const offset = rect.top * 0.3
      bgRef.current.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative h-64 lg:h-80 overflow-hidden my-0">
      {/* Parallax cloud image */}
      <div ref={bgRef} className="absolute inset-0 scale-110 parallax-bg">
        <Image
          src="/images/clouds-layer.jpg"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10] via-transparent to-[#0a0c10]" />
      </div>

      {/* Quote */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="font-serif text-2xl lg:text-4xl font-light italic text-[var(--text-primary)] max-w-2xl text-pretty leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {author && (
          <span className="mt-4 font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase">
            — {author}
          </span>
        )}
      </div>
    </div>
  )
}
