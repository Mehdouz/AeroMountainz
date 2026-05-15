# yaya — Aero Mountains

Site Next.js 16 (App Router) + Sanity CMS + i18n FR/EN.

## Stack

- Next.js 16.2.4 App Router, React 19, TypeScript strict
- Sanity 5 via `next-sanity` (cache-components), Live mode + Visual editing
- Tailwind v4 (config vide, tokens en CSS dans `app/globals.css`)
- shadcn/ui configuré (style new-york, `@/components/ui`, icônes lucide) — non installé par défaut
- Fonts : `Inter` (`--font-inter`), `Cormorant_Garamond` (`--font-cormorant`)
- npm (pas pnpm/yarn)

## Arborescence

```
app/[locale]/         pages — layout.tsx, page.tsx (home), [slug]/page.tsx, blog/...
app/sitemap.ts, robots.ts
components/           PascalCase, plat (pas de dossier ui/ tant que shadcn n'est pas utilisé)
lib/
  i18n.ts             LOCALES, isValidLocale, localizeHref
  seo.ts              buildPageMetadata
  cms/                getPage, getSiteSettings, getPosts...
  types/content.ts    Page, Section, SiteSettings, etc.
sanity/
  lib/client.ts       client direct (build-time uniquement)
  lib/live.ts         sanityFetch + getDynamicFetchOptions
  lib/queries.ts      GROQ queries
  schemaTypes/        documents/, sections/, objects/
```

## Créer une nouvelle page

Pattern complet — copie ce squelette pour toute page sous `app/[locale]/<route>/page.tsx` :

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SectionRenderer from '@/components/section-renderer'
import { getPage } from '@/lib/cms/page'
import { getSiteSettings } from '@/lib/cms/siteSettings'
import { getDynamicFetchOptions, type DynamicFetchOptions } from '@/sanity/lib/live'
import { isValidLocale, type Locale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

type FetchOpts = Pick<DynamicFetchOptions, 'perspective' | 'stega'>
const SLUG = 'about' // ← le slug Sanity de la page

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  'use cache'
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  const [page, site] = await Promise.all([
    getPage(SLUG, locale, { perspective: 'published', stega: false }),
    getSiteSettings(locale, { perspective: 'published', stega: false }),
  ])
  return buildPageMetadata({ page, site, locale, path: `/${locale}/${SLUG}` })
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isValidLocale(locale)) notFound()
  const { isDraftMode } = await getDynamicFetchOptions()
  if (isDraftMode) return <Suspense><Dynamic locale={locale as Locale} /></Suspense>
  return <Cached locale={locale as Locale} perspective="published" stega={false} />
}

async function Dynamic({ locale }: { locale: Locale }) {
  const { perspective, stega } = await getDynamicFetchOptions()
  return <Cached locale={locale} perspective={perspective} stega={stega} />
}

async function getData(locale: Locale, opts: FetchOpts) {
  'use cache'
  const [page, site] = await Promise.all([getPage(SLUG, locale, opts), getSiteSettings(locale, opts)])
  return { page, site }
}

async function Cached({ locale, perspective, stega }: { locale: Locale } & FetchOpts) {
  const { page, site } = await getData(locale, { perspective, stega })
  if (!page) notFound()
  return (
    <main className="bg-bone min-h-screen">
      <Navbar {...navbarProps(site, locale)} />
      <SectionRenderer sections={page.sections} siteSettings={site} locale={locale} />
      <Footer {...footerProps(site, locale)} />
    </main>
  )
}
```

Règles :
- `params` est **toujours** une `Promise` en Next.js 16 — `await params` avant de lire `locale`.
- `'use cache'` sur `generateMetadata` ET sur la fonction de fetch interne.
- Branche `isDraftMode` obligatoire pour que le Visual Editing Sanity marche.
- Pour pages dynamiques : ajouter `generateStaticParams` qui fetch via `client` direct, **pas** `sanityFetch` (voir règle ci-dessous).

## Fetch Sanity — quel helper ?

| Contexte | Helper | Raison |
|---|---|---|
| Page, layout, generateMetadata | `sanityFetch` (`sanity/lib/live.ts`) | gère draftMode + perspective + stega |
| `generateStaticParams`, `sitemap.ts`, `robots.ts` | `client.fetch` (`sanity/lib/client.ts`) | `sanityFetch` appelle `draftMode()` qui plante en contexte build statique |

Wrappers existants dans `lib/cms/` — réutilise-les avant d'écrire une nouvelle requête : `getPage`, `getAllPageSlugs`, `getSiteSettings`, `getPosts`, `getPost`, `getCategories`.

## i18n

- Locales : `['fr', 'en']`, défaut `'fr'`. Toujours valider avec `isValidLocale(locale)`.
- Liens internes : utiliser `localizeHref(href, locale)` de `lib/i18n.ts`. Préserve `http(s)://`, `mailto:`, `tel:`, `#`.
- Schémas Sanity : champ `language` sur chaque doc traduisible. Queries filtrent toujours par `&& language == $locale`.
- `siteSettings` est singleton **par locale** (un doc FR + un doc EN).

## SEO

`buildPageMetadata({ page, site, locale, path })` retourne le `Metadata` complet : title, description, OG, Twitter, canonical, robots, icônes. Fallback OG image = `seo.ogImage` → première `heroSection.backgroundImage`. Ne jamais réécrire à la main.

## Styling

- Tailwind v4. Classes utilitaires direct.
- Tokens couleurs dans `app/globals.css` (`:root`) : `--bone`, `--ink`, `--midnight`, `--champagne`, `--lake` + sémantiques `--text-primary/secondary/muted`. Utilisables comme `bg-bone`, `text-ink`...
- Background page : `bg-bone min-h-screen` sur `<main>`.
- Si besoin d'un composant shadcn : `npx shadcn@latest add <name>` (atterrit dans `@/components/ui`).

## Schémas Sanity disponibles

**Documents** (`sanity/schemaTypes/documents/`) :
- `page` (slug, sections[], seo, language) — singletons logiques : slug `home`, `blog` (réservés dans sitemap)
- `post` (slug, excerpt, coverImage, publishedAt, author, categories[], body PortableText, seo)
- `siteSettings` (singleton/locale : url, brand, contact, location, navLinks[], legalLinks[])
- `author`, `category`, `pilot`, `formula`, `faq`, `review`, `journeyStep`, `stat`, `galleryItem`

**Sections** (`sanity/schemaTypes/sections/`, composent `page.sections`) :
`heroSection`, `statsSection`, `formulasSection`, `cloudBreakQuoteSection`, `journeySection`, `pilotSection`, `gallerySection`, `reviewsSection`, `faqSection`, `ctaSection`, `richTextSection`

**Objects** (`sanity/schemaTypes/objects/`, inline) :
`navLink`, `ctaButton`, `pilotBadge`, `brand`, `contact`, `location`, `seo`

Pour **ajouter une nouvelle section** :
1. Schéma dans `sanity/schemaTypes/sections/<nom>Section.ts`, enregistrer dans `sanity/schemaTypes/index.ts` ET dans le tableau `of: [...]` du champ `sections` de `documents/page.ts`.
2. Projection GROQ dans `sanity/lib/queries.ts` (bloc `pageSectionsProjection`).
3. Type TS dans `lib/types/content.ts` (ajouter à l'union `Section`).
4. Composant React + branche dans `components/section-renderer.tsx`.

## Conventions

- Composants : PascalCase, fichier kebab-case (`section-renderer.tsx` export `SectionRenderer`).
- Alias : `@/components`, `@/lib`, `@/sanity`, `@/hooks`, `@/lib/utils`.
- Types : `Locale`, `Page`, `Section`, `SiteSettings` depuis `@/lib/types/content` et `@/lib/i18n`.
- Server Components par défaut. `'use client'` seulement si interactivité/hooks browser.
- Pas de `Pages Router`, pas de `getServerSideProps`/`getStaticProps`.

## Commandes

```
npm run dev          # dev server
npm run build        # build prod
npm run typegen      # régénérer types Sanity (après modif de schéma)
npm run lint
```
