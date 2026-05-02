'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  duration?: number
  threshold?: number
  /** Initial Y offset in px (positive = starts below, animates up). Default 32. */
  y?: number
  /** Initial X offset in px (positive = starts right, animates to 0). Default 0. */
  x?: number
  className?: string
  style?: CSSProperties
}

export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  threshold = 0.15,
  y = 32,
  x = 0,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate3d(0,0,0)' : `translate3d(${x}px, ${y}px, 0)`,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
