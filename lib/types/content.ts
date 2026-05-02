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
  bioParagraphs: string[]
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

export type Hero = {
  eyebrow: string
  titleStart: string
  titleEmphasized: string
  titleEnd: string
  subtitle: string
  primaryCta: CtaButton
  secondaryCta: CtaButton
  backgroundImage: string
  backgroundAlt: string
  cloudsImage: string
  scrollLabel: string
}

export type CtaSectionContent = {
  eyebrow: string
  titleStart: string
  titleEmphasized: string
  description: string
  backgroundImage: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  locationLabel: string
}

export type ReviewsAggregate = {
  rating: string
  countLabel: string
  source: string
}

export type CloudBreakQuote = {
  quote: string
  author?: string
}

export type SiteConfig = {
  url: string
  brand: {
    name: string
    tagline: string
    description: string
  }
  contact: {
    phone: string
    phoneDisplay: string
    email: string
  }
  location: {
    addressLine1: string
    addressLine2: string
    short: string
  }
  navLinks: NavLink[]
  legalLinks: NavLink[]
  hero: Hero
  cta: CtaSectionContent
  reviewsAggregate: ReviewsAggregate
  cloudBreakQuote: CloudBreakQuote
}
