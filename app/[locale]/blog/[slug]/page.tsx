import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import RichText from '@/components/rich-text'
import { getPost, getAllPostSlugs } from '@/lib/cms/posts'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getDynamicFetchOptions, type DynamicFetchOptions } from '@/sanity/lib/live'
import { isValidLocale, LOCALES, localizeHref, type Locale } from '@/lib/i18n'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>

export async function generateStaticParams() {
  const all = await Promise.all(
    LOCALES.map(async (locale) => {
      const entries = await getAllPostSlugs(locale)
      return entries.map((e) => ({ locale, slug: e.slug }))
    }),
  )
  return all.flat()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  'use cache'
  const { locale, slug } = await params
  if (!isValidLocale(locale)) return {}
  const post = await getPost(slug, locale, { perspective: 'published', stega: false })
  if (!post) return {}
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    alternates: { canonical: `/${locale}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.seo?.ogImage || post.coverImage
        ? [{ url: post.seo?.ogImage || post.coverImage, alt: post.coverImageAlt }]
        : undefined,
    },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!isValidLocale(locale)) notFound()
  const { isDraftMode } = await getDynamicFetchOptions()

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicPost locale={locale as Locale} slug={slug} />
      </Suspense>
    )
  }
  return (
    <CachedPost
      locale={locale as Locale}
      slug={slug}
      perspective="published"
      stega={false}
    />
  )
}

async function DynamicPost({ locale, slug }: { locale: Locale; slug: string }) {
  const { perspective, stega } = await getDynamicFetchOptions()
  return (
    <CachedPost locale={locale} slug={slug} perspective={perspective} stega={stega} />
  )
}

async function getCachedPostData(
  slug: string,
  locale: Locale,
  { perspective, stega }: FetchOpts,
) {
  'use cache'
  const [post, site] = await Promise.all([
    getPost(slug, locale, { perspective, stega }),
    getSiteSettings(locale, { perspective, stega }),
  ])
  return { post, site }
}

async function CachedPost({
  locale,
  slug,
  perspective,
  stega,
}: { locale: Locale; slug: string } & FetchOpts) {
  const { post, site } = await getCachedPostData(slug, locale, { perspective, stega })

  if (!post) notFound()

  const dateStr = new Date(post.publishedAt).toLocaleDateString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

  return (
    <main className="bg-bone min-h-screen">
      <Navbar
        navLinks={site.navLinks}
        logo={site.brand.logo}
        logoAlt={site.brand.logoAlt}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        locale={locale}
        lightSurface
      />

      <article className="pt-32 lg:pt-40 pb-20">
        <header className="max-w-3xl mx-auto px-6 lg:px-10 text-center mb-12">
          <Link
            href={localizeHref('/blog', locale)}
            className="font-mono text-xs tracking-[0.3em] text-[var(--gold)] uppercase hover:text-[var(--gold-light)] transition-colors"
          >
            ← {locale === 'fr' ? 'Tous les articles' : 'All articles'}
          </Link>
          <h1 className="font-serif text-4xl lg:text-6xl font-light text-[var(--text-primary)] leading-tight mt-6 mb-4">
            {post.title}
          </h1>
          <p className="font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
            {dateStr}
            {post.author?.name && <> · {post.author.name}</>}
          </p>
        </header>

        <div className="max-w-5xl mx-auto px-6 lg:px-10 mb-12">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <RichText value={post.body} />
        </div>
      </article>

      <Footer
        logo={site.brand.logo}
        logoAlt={site.brand.logoAlt}
        siteName={site.brand.siteName}
        brandDescription={site.brand.description}
        navLinks={site.navLinks}
        legalLinks={site.legalLinks}
        phone={site.contact.phone}
        phoneDisplay={site.contact.phoneDisplay}
        email={site.contact.email}
        addressLine1={site.location.addressLine1}
        addressLine2={site.location.addressLine2}
        locale={locale}
      />
    </main>
  )
}
