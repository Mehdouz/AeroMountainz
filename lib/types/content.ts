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
  lede?: string
  dark?: boolean
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

export type ContactInfoLine = {
  label: string
  value: string
}

export type ContactInfoColumn = {
  num: string
  label?: string
  value: string
  valueLine2?: string
  link?: string
  hint?: string
}

export type ContactSubject = {
  value: string
  label: string
}

export type ContactFormMeta = {
  key: string
  value: string
}

export type ContactSection = {
  _type: 'contactSection'
  _key: string
  // Hero
  eyebrow?: string
  titleStart: string
  titleEmphasized: string
  subtitle?: string
  infoLines?: ContactInfoLine[]
  // Coordonnées
  infoColumns?: ContactInfoColumn[]
  // Formulaire
  formEyebrow?: string
  formTitleStart?: string
  formTitleEmphasized?: string
  formLede?: string
  formMeta?: ContactFormMeta[]
  subjects: ContactSubject[]
  paxOptions?: string[]
  consentText?: string
  submitLabel?: string
  submitHint?: string
  successMessage?: string
  errorMessage?: string
  // Lieu / Carte
  lieuEyebrow?: string
  lieuTitleStart?: string
  lieuTitleEmphasized?: string
  lieuLede?: string
  lieuList?: string[]
  mapEmbedUrl: string
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
  | ContactSection
  | RichTextSection
  | BonCadeauHeroSection
  | BonCadeauOccasionsSection
  | BonCadeauExperienceSection
  | BonCadeauContentsSection
  | BonCadeauHowtoSection
  | BonCadeauFactsSection
  | BonCadeauTestimonialsSection
  | BonCadeauFaqSection
  | BonCadeauFinalCtaSection

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

// ============================================================
// Bon Cadeau — sections (utilisables dans page.sections[])
// ============================================================

export type BonCadeauIconKey =
  | 'heart'
  | 'gift'
  | 'cake'
  | 'cup'
  | 'tree'
  | 'users'
  | 'clock'
  | 'star'
  | 'calendar'
  | 'pin'
  | 'cloud'
  | 'medal'

export type BonCadeauReassuranceItem = { label: string }

export type BonCadeauHeroSection = {
  _type: 'bonCadeauHeroSection'
  _key: string
  backgroundImage: string
  backgroundAlt: string
  titleStart: string
  titleEmphasized: string
  titleEnd?: string
  subtitle?: string
  priceLabel?: string
  priceAmount: number
  priceCurrency?: string
  priceSubtext?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
  reassuranceItems?: BonCadeauReassuranceItem[]
}

export type BonCadeauOccasionItem = { iconKey: BonCadeauIconKey; label: string }

export type BonCadeauOccasionsSection = {
  _type: 'bonCadeauOccasionsSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  items: BonCadeauOccasionItem[]
}

export type BonCadeauGalleryItem = {
  src: string
  alt: string
  caption?: string
}

export type BonCadeauExperienceSection = {
  _type: 'bonCadeauExperienceSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  subtitle?: string
  body?: PortableTextBlock[]
  linkLabel?: string
  linkHref?: string
  gallery: BonCadeauGalleryItem[]
}

export type BonCadeauContentBullet = { body: PortableTextBlock[] }

export type BonCadeauContentsSection = {
  _type: 'bonCadeauContentsSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  mockupEyebrow?: string
  mockupTitleStart?: string
  mockupTitleEmphasized?: string
  mockupTitleEnd?: string
  mockupRecipient?: string
  mockupNumberLabel?: string
  mockupValidityLabel?: string
  bullets: BonCadeauContentBullet[]
}

export type BonCadeauStep = {
  number: string
  title: string
  description: PortableTextBlock[]
}

export type BonCadeauHowtoSection = {
  _type: 'bonCadeauHowtoSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  subtitle?: string
  steps: BonCadeauStep[]
}

export type BonCadeauFactItem = {
  iconKey: BonCadeauIconKey
  title: string
  description: string
}

export type BonCadeauFactsSection = {
  _type: 'bonCadeauFactsSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  items: BonCadeauFactItem[]
}

export type BonCadeauTestimonialItem = {
  quote: string
  name: string
  occasion?: string
  stars: number
}

export type BonCadeauTestimonialsSection = {
  _type: 'bonCadeauTestimonialsSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  googleRatingStars?: string
  googleRatingLabel?: string
  items: BonCadeauTestimonialItem[]
}

export type BonCadeauFaqItem = {
  question: string
  answer: PortableTextBlock[]
}

export type BonCadeauFaqSection = {
  _type: 'bonCadeauFaqSection'
  _key: string
  eyebrow?: string
  headingStart: string
  headingEmphasized: string
  headingEnd?: string
  items: BonCadeauFaqItem[]
}

export type BonCadeauFinalCtaSection = {
  _type: 'bonCadeauFinalCtaSection'
  _key: string
  eyebrow?: string
  headingLine1: string
  headingLine2?: string
  subtext?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
  reassuranceItems?: BonCadeauReassuranceItem[]
  backgroundImage?: string
  backgroundAlt?: string
}
