import Image from 'next/image'
import Reveal from './reveal'
import StyledHeading from './styled-heading'
import type { GalleryItem } from '@/lib/types/content'

export default function Gallery({
  items,
  eyebrow,
  heading,
}: {
  items: GalleryItem[]
  eyebrow?: string
  heading: string
}) {
  return (
    <section id="galerie" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            {eyebrow && (
              <p className="font-mono text-xs tracking-[0.4em] text-gold uppercase mb-4">
                {eyebrow}
              </p>
            )}
            <StyledHeading
              heading={heading}
              className="font-serif text-4xl lg:text-6xl font-light text-text-primary leading-tight"
            />
          </div>
        </div>

        <Reveal
          duration={1000}
          threshold={0.1}
          className="grid grid-cols-3 grid-rows-3 gap-3 lg:gap-4"
          style={{ height: 'clamp(400px, 70vw, 700px)' }}
        >
          {items.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
