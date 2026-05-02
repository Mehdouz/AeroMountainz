'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function CtaParallax({ src }: { src: string }) {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      const rect = bgRef.current.getBoundingClientRect()
      const offset = rect.top * 0.25
      bgRef.current.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={bgRef} className="absolute inset-0 scale-110 parallax-bg">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--midnight)]/75" />
    </div>
  )
}
