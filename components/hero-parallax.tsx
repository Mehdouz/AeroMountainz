'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

type Props = {
  backgroundImage: string
  backgroundAlt: string
  cloudsImage: string
}

export default function HeroParallax({ backgroundImage, backgroundAlt, cloudsImage }: Props) {
  const bgRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`
      }
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translateY(${scrollY * 0.15}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 parallax-bg"
        style={{ top: '-10%', height: '120%' }}
      >
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--midnight)] via-[var(--midnight)]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--midnight)]/60 via-transparent to-transparent" />
      </div>

      <div
        ref={cloudsRef}
        className="absolute inset-0 pointer-events-none parallax-bg"
        style={{ top: '-5%' }}
      >
        <Image
          src={cloudsImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-10 mix-blend-screen"
        />
      </div>
    </>
  )
}
