import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { getPosts } from '@/lib/cms/posts'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { isValidLocale, localizeHref, type Locale } from '@/lib/i18n'

const STRINGS: Record<Locale, { title: string; description: string; readMore: string }> = {
  fr: {
    title: 'Le blog d\'Aero Mountains',
    description:
      'Histoires, conseils et coulisses du vol en montgolfière au-dessus du lac d\'Annecy.',
    readMore: 'Lire l\'article',
  },
  en: {
    title: 'The Aero Mountains Blog',
    description:
      'Stories, tips and behind-the-scenes from hot-air ballooning over Lake Annecy.',
    readMore: 'Read article',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const t = STRINGS[locale]
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: `/${locale}/blog` },
  }
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()

  const [posts, site] = await Promise.all([
    getPosts(locale as Locale),
    getSiteSettings(locale as Locale),
  ])

  const t = STRINGS[locale as Locale]

  return (
    <main className="bg-bone min-h-screen">
      <Navbar
        navLinks={site.navLinks}
        brandName={site.brand.name}
        brandTagline={site.brand.tagline}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        locale={locale as Locale}
      />

      <section className="pt-32 lg:pt-40 pb-20 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center mb-16">
          <p className="font-mono text-xs tracking-[0.4em] text-[var(--gold)] uppercase mb-4">
            Blog
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight mb-6">
            {t.title}
          </h1>
          <p className="text-base text-[var(--text-secondary)] font-sans max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {posts.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] font-sans">
              Aucun article pour le moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={localizeHref(`/blog/${post.slug}`, locale as Locale)}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-mono text-xs text-[var(--text-muted)] mb-2">
                    {new Date(post.publishedAt).toLocaleDateString(
                      locale === 'fr' ? 'fr-FR' : 'en-US',
                      { year: 'numeric', month: 'long', day: 'numeric' },
                    )}
                    {post.author?.name && <> · {post.author.name}</>}
                  </p>
                  <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)] group-hover:text-[var(--gold)] transition-colors leading-tight mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer
        brandName={site.brand.name}
        brandTagline={site.brand.tagline}
        brandDescription={site.brand.description}
        navLinks={site.navLinks}
        legalLinks={site.legalLinks}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        email={site.contact.email}
        addressLine1={site.location.addressLine1}
        addressLine2={site.location.addressLine2}
        locale={locale as Locale}
      />
    </main>
  )
}
