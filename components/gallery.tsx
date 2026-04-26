'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const images = [
  { src: '/images/gallery-1.jpg', alt: 'Montgolfière au-dessus du lac d\'Annecy au lever du soleil', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery-2.jpg', alt: 'Vue depuis la nacelle du ballon', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-3.jpg', alt: 'Moment romantique en montgolfière', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-4.jpg', alt: 'Gonflage de la montgolfière à l\'aube', span: 'col-span-1 row-span-2' },
  { src: '/images/gallery-5.jpg', alt: 'Vue aérienne d\'Annecy', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery-6.jpg', alt: 'Toast champenois dans les airs', span: 'col-span-1 row-span-1' },
]

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="galerie" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
              Galerie
            </p>
            <h2 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight">
              Le lac d&apos;Annecy
              <br />
              <span className="italic text-[var(--gold-light)]">vu du ciel</span>
            </h2>
          </div>
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-3 grid-rows-3 gap-3 lg:gap-4 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ height: 'clamp(400px, 70vw, 700px)' }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
