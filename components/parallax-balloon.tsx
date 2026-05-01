'use client'

import { useEffect, useRef } from 'react'

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
      <svg
        viewBox="0 0 66.4 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        className="block w-full h-auto text-champagne opacity-[0.12]"
      >
        <path
          fill="currentColor"
          d="M33.2,0C14.9,0,0,14.9,0,33.2c0,7.4,2.5,14.4,6.8,20.1c5.5,7.2,14.4,17.3,16.2,25.9l0.7,3.4c-1,0.5-1.8,1.6-1.8,2.8 c0,1.3,0.8,2.4,1.9,2.9v8.3c0,1.9,1.6,3.5,3.5,3.5h11.7c1.9,0,3.5-1.6,3.5-3.5v-8.3c1.1-0.5,1.9-1.6,1.9-2.9c0-1.2-0.7-2.3-1.8-2.8 l0.7-3.4c1.8-8.5,10.7-18.7,16.2-25.9c4.3-5.7,6.8-12.7,6.8-20.1C66.4,14.9,51.5,0,33.2,0L33.2,0z M32.4,1.6L32.4,1.6l0,66.3h-5.8 c-1-2.1-5.5-12.3-7.9-24.7C16,29.3,16,12.9,26.5,2.3C28.4,1.9,30.4,1.6,32.4,1.6L32.4,1.6z M34,1.6c2,0.1,4,0.3,5.9,0.7 c10.5,10.7,10.6,27,7.8,40.9c-2.4,12.4-7,22.7-7.9,24.7H34L34,1.6z M23.7,3c-9.4,11.2-9.2,27.1-6.6,40.5c2.2,11.5,6.3,21.2,7.8,24.4 h-5.2c-3.6-5.7-8.3-11.2-11.6-15.6c-4.1-5.4-6.5-12.1-6.5-19.1C1.6,19,10.9,7,23.7,3L23.7,3z M42.7,3c12.8,4,22.2,16,22.2,30.2 c0,7.1-2.4,13.8-6.5,19.1c-3.3,4.4-8,9.9-11.6,15.6h-5.2c1.4-3.2,5.5-12.9,7.8-24.4C51.9,30.1,52.1,14.2,42.7,3L42.7,3z M20.6,69.4 h5.5h0h0h14.1h0h5.5c-1.8,3.1-3.3,6.3-3.9,9.4l-0.7,3.4H25.3l-0.7-3.4C23.9,75.7,22.4,72.6,20.6,69.4L20.6,69.4z M25.1,83.8h16.2 c0.9,0,1.6,0.7,1.6,1.5c0,0.9-0.7,1.6-1.6,1.6H25.1c-0.9,0-1.6-0.7-1.6-1.6C23.6,84.5,24.2,83.8,25.1,83.8z M25.4,88.5H41v8 c0,1.1-0.9,1.9-1.9,1.9H27.4c-1.1,0-1.9-0.9-1.9-1.9L25.4,88.5z"
        />
      </svg>
      </div>
    </div>
  )
}
