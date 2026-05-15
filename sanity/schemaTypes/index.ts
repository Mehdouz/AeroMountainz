import type { SchemaTypeDefinition } from 'sanity'

// Objects
import { brand } from './objects/brand'
import { contact } from './objects/contact'
import { ctaButton } from './objects/ctaButton'
import { location } from './objects/location'
import { navLink } from './objects/navLink'
import { pilotBadge } from './objects/pilotBadge'
import { seo } from './objects/seo'

// Sections
import { heroSection } from './sections/heroSection'
import { statsSection } from './sections/statsSection'
import { formulasSection } from './sections/formulasSection'
import { cloudBreakQuoteSection } from './sections/cloudBreakQuoteSection'
import { journeySection } from './sections/journeySection'
import { pilotSection } from './sections/pilotSection'
import { gallerySection } from './sections/gallerySection'
import { reviewsSection } from './sections/reviewsSection'
import { faqSection } from './sections/faqSection'
import { ctaSection } from './sections/ctaSection'
import { contactSection } from './sections/contactSection'
import { richTextSection } from './sections/richTextSection'

// Documents — site
import { siteSettings } from './documents/siteSettings'
import { page } from './documents/page'

// Documents — blog
import { post } from './documents/post'
import { author } from './documents/author'
import { category } from './documents/category'

// Documents — réutilisables
import { pilot } from './documents/pilot'
import { formula } from './documents/formula'
import { faq } from './documents/faq'
import { review } from './documents/review'
import { journeyStep } from './documents/journeyStep'
import { stat } from './documents/stat'
import { galleryItem } from './documents/galleryItem'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  brand,
  contact,
  ctaButton,
  location,
  navLink,
  pilotBadge,
  seo,
  // Sections
  heroSection,
  statsSection,
  formulasSection,
  cloudBreakQuoteSection,
  journeySection,
  pilotSection,
  gallerySection,
  reviewsSection,
  faqSection,
  ctaSection,
  contactSection,
  richTextSection,
  // Documents — site
  siteSettings,
  page,
  // Documents — blog
  post,
  author,
  category,
  // Documents — réutilisables
  pilot,
  formula,
  faq,
  review,
  journeyStep,
  stat,
  galleryItem,
]
