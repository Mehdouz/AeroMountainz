'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Phase = 'idle' | 'entering' | 'peak' | 'leaving'

const ENTER_KEYFRAMES: Keyframe[] = [
  { transform: 'translateY(-100%)' },
  { transform: 'translateY(0%)' },
]
const LEAVE_KEYFRAMES: Keyframe[] = [
  { transform: 'translateY(0%)' },
  { transform: 'translateY(100%)' },
]
const ENTER_OPTS: KeyframeAnimationOptions = {
  duration: 350,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  fill: 'forwards',
}
const LEAVE_OPTS: KeyframeAnimationOptions = {
  duration: 450,
  easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
  fill: 'forwards',
}

export default function PageTransition() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const [embedded] = useState(() => {
    if (typeof window === 'undefined') return false
    try {
      return window.self !== window.top
    } catch {
      return true
    }
  })
  const lastPathRef = useRef(pathname)
  const pendingLeaveRef = useRef(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (embedded || reduced) return

    const startEntering = () => {
      setPhase((p) => (p === 'idle' ? 'entering' : p))
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const target = e.target as Element | null
      const anchor = target?.closest('a')
      if (!anchor) return
      if (anchor.target === '_blank') return
      const href = anchor.getAttribute('href')
      if (!href) return
      if (/^(mailto:|tel:|#)/.test(href)) return
      let url: URL
      try {
        url = new URL(href, window.location.origin)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === pathname) return
      startEntering()
    }

    document.addEventListener('click', onClick, true)
    window.addEventListener('aero:nav-start', startEntering)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('aero:nav-start', startEntering)
    }
  }, [pathname, embedded, reduced])

  useEffect(() => {
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname
    setPhase((p) => {
      if (p === 'entering') {
        pendingLeaveRef.current = true
        return p
      }
      if (p === 'peak') return 'leaving'
      return p
    })
  }, [pathname])

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return
    if (phase === 'entering') {
      const anim = el.animate(ENTER_KEYFRAMES, ENTER_OPTS)
      anim.onfinish = () => {
        if (pendingLeaveRef.current) {
          pendingLeaveRef.current = false
          setPhase('leaving')
        } else {
          setPhase('peak')
        }
      }
      return () => anim.cancel()
    }
    if (phase === 'leaving') {
      const anim = el.animate(LEAVE_KEYFRAMES, LEAVE_OPTS)
      anim.onfinish = () => setPhase('idle')
      return () => anim.cancel()
    }
  }, [phase])

  if (embedded) return null

  const style: React.CSSProperties =
    phase === 'peak'
      ? { transform: 'translateY(0%)' }
      : { transform: 'translateY(-100%)' }

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="fixed inset-0 z-100 bg-bone pointer-events-none will-change-transform"
      style={style}
    />
  )
}
