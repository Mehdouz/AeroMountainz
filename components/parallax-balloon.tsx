'use client'

import { useEffect, useRef } from 'react'
import BalloonSvg from './balloon-svg'

export default function ParallaxBalloon() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const section = ref.current.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      // Parallax : la montgolfière monte plus lentement que le scroll
      const offset = rect.top * 0.35
      ref.current.style.transform = `translate3d(0, ${offset}px, 0)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 z-0 hidden lg:block"
      style={{ width: '28vw', maxWidth: '360px' }}
    >
      <div ref={ref} className="parallax-bg">
        <BalloonSvg className="block w-full h-auto text-champagne opacity-[0.12]" />
      </div>
    </div>
  )
}
