'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function CloudParallax() {
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
    <div ref={bgRef} className="absolute inset-0 scale-110 parallax-bg">
      <Image
        src="/images/clouds-layer.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bone)] via-transparent to-[var(--bone)]" />
    </div>
  )
}
