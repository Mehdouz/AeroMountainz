'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

function ScrollResetOnRouteChange() {
  const pathname = usePathname()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    const hash = window.location.hash
    const raf = requestAnimationFrame(() => {
      if (hash) {
        const target = document.querySelector(hash)
        if (target) {
          lenis.scrollTo(target, { immediate: true, force: true })
          return
        }
      }
      lenis.scrollTo(0, { immediate: true, force: true })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, lenis])

  return null
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        anchors: true,
      }}
    >
      <ScrollResetOnRouteChange />
      {children}
    </ReactLenis>
  )
}
