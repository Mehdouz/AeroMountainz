import type { PortableTextBlock } from '@portabletext/react'

// ============================================================
// Reusable content types (matchent les projections GROQ)
// ============================================================

export type StatIconKey = 'clock' | 'users' | 'mapPin' | 'star' | 'award' | 'calendar'

export type Stat = {
  iconKey: StatIconKey
  value: string
  label: string
  sub: string
}

export type Formula = {
  tag: string
  title: string
  price: string
  priceDetail: string
  description: string
  features: string[]
  highlight: boolean
}

export type JourneyStep = {
  number: string
  time: string
  title: string
  description: string
}

export type Review = {
  stars: number
  text: string
  author: string
  date: string
}

export type Faq = {
  question: string
  answer: string
}

export type GalleryItem = {
  src: string
  alt: string
  span: string
}

export type PilotBadgeIconKey = 'award' | 'wind' | 'trophy'

export type PilotBadge = {
  iconKey: PilotBadgeIconKey
  label: string
}

export type Pilot = {
  name: string
  imageSrc: string
  imageAlt: string
  yearsExperience: string
  bioParagraphs: PortableTextBlock[]
  badges: PilotBadge[]
  ctaLabel: string
}

export type NavLink = {
  label: string
  href: string
}

export type CtaButton = {
  label: string
  href: string
}

export type ReviewsAggregate = {
  rating: string
  countLabel: string
  source: string
}

export type SiteSettings = {
  url: string
  brand: { name: string; tagline: string; description: string }
  contact: { phone: string; phoneDisplay: string; email: string }
  location: { addressLine1: string; addressLine2: string; short: string }
  navLinks: NavLink[]
  legalLinks: NavLink[]
}

// ============================================================
// SEO
// ============================================================

export type Seo = {
  title?: string
  description?: string
  ogImage?: string
  noIndex?: boolean
}

// ============================================================
// Sections (composent les pages)
// ============================================================

export type HeroSection = {
  _type: 'heroSection'
  _key: string
  eyebrow?: string
  titleStart: string
  titleEmphasized: string
  titleEnd?: string
  subtitle?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
  backgroundImage: string
  backgroundAlt: string
  cloudsImage?: string
  scrollLabel?: string
}

export type StatsSection = {
  _type: 'statsSection'
  _key: string
  eyebrow?: string
  heading: string
  stats: Stat[]
}

export type FormulasSection = {
  _type: 'formulasSection'
  _key: string
  eyebrow?: string
  heading: string
  subtext?: string
  formulas: Formula[]
}

export type CloudBreakQuoteSection = {
  _type: 'cloudBreakQuoteSection'
  _key: string
  quote: string
  author?: string
}

export type JourneySection = {
  _type: 'journeySection'
  _key: string
  eyebrow?: string
  heading: string
  footer?: string
  steps: JourneyStep[]
}

export type PilotSection = {
  _type: 'pilotSection'
  _key: string
  eyebrow?: string
  pilot: Pilot
}

export type GallerySection = {
  _type: 'gallerySection'
  _key: string
  eyebrow?: string
  heading: string
  items: GalleryItem[]
}

export type ReviewsSection = {
  _type: 'reviewsSection'
  _key: string
  eyebrow?: string
  heading: string
  reviews: Review[]
  aggregateRating?: string
  aggregateCountLabel?: string
  aggregateSource?: string
}

export type FaqSection = {
  _type: 'faqSection'
  _key: string
  eyebrow?: string
  heading: string
  faqs: Faq[]
}

export type CtaSectionContent = {
  _type: 'ctaSection'
  _key: string
  eyebrow?: string
  titleStart: string
  titleEmphasized: string
  description?: string
  backgroundImage: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  locationLabel?: string
}

export type RichTextSection = {
  _type: 'richTextSection'
  _key: string
  eyebrow?: string
  heading?: string
  body: PortableTextBlock[]
}

export type Section =
  | HeroSection
  | StatsSection
  | FormulasSection
  | CloudBreakQuoteSection
  | JourneySection
  | PilotSection
  | GallerySection
  | ReviewsSection
  | FaqSection
  | CtaSectionContent
  | RichTextSection

// ============================================================
// Documents
// ============================================================

export type Page = {
  _id: string
  title: string
  slug: string
  language: string
  sections: Section[]
  seo?: Seo
}

export type Author = {
  name: string
  slug: string
  avatar?: string
  bio?: PortableTextBlock[]
}

export type Category = {
  title: string
  slug: string
  description?: string
}

export type Post = {
  _id: string
  title: string
  slug: string
  language: string
  excerpt: string
  coverImage: string
  coverImageAlt: string
  publishedAt: string
  author: Author
  categories?: Category[]
  body: PortableTextBlock[]
  seo?: Seo
}

export type PostListItem = Pick<
  Post,
  | '_id'
  | 'title'
  | 'slug'
  | 'language'
  | 'excerpt'
  | 'coverImage'
  | 'coverImageAlt'
  | 'publishedAt'
> & { author: Pick<Author, 'name' | 'slug'> }
