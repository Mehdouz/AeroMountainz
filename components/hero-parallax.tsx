'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {
  backgroundImage: string
  backgroundAlt: string
  cloudsImage: string
  videoWebm?: string
  videoMp4?: string
}

export default function HeroParallax({
  backgroundImage,
  backgroundAlt,
  cloudsImage,
  videoWebm,
  videoMp4,
}: Props) {
  const bgRef = useRef<HTMLDivElement>(null)
  const cloudsRef = useRef<HTMLDivElement>(null)
  const [mountVideo, setMountVideo] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

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

  useEffect(() => {
    if (!videoWebm && !videoMp4) return

    const start = () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const conn = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }).connection
      if (conn?.saveData) return
      if (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return
      setMountVideo(true)
    }

    if (document.readyState === 'complete') {
      start()
      return
    }
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [videoWebm, videoMp4])

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
        {mountVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ease-out ${videoReady ? 'opacity-100' : 'opacity-0'}`}
          >
            {videoWebm && <source src={videoWebm} type="video/webm" />}
            {videoMp4 && <source src={videoMp4} type="video/mp4" />}
          </video>
        )}
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
