import Image from 'next/image'
import Link from 'next/link'
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base text-text-secondary leading-relaxed font-sans mb-4">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl lg:text-4xl font-light text-text-primary mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl font-medium text-text-primary mt-8 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gold pl-6 my-6 italic text-text-secondary">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 my-4 text-base text-text-secondary font-sans space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 my-4 text-base text-text-secondary font-sans space-y-2">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href ?? '#'
      const isExternal = /^https?:\/\//.test(href)
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-4 hover:text-gold-light"
          >
            {children}
          </a>
        )
      }
      return (
        <Link
          href={href}
          className="text-gold underline underline-offset-4 hover:text-gold-light"
        >
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      const url = value.asset?.url || (value as unknown as { src?: string }).src
      if (!url) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={url}
              alt={value.alt || ''}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-xs text-text-muted font-sans text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

export default function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />
}
