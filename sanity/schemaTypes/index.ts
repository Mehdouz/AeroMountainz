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

// Bon Cadeau — objets de section
import { bonCadeauReassuranceItem } from './objects/bonCadeauReassuranceItem'
import { bonCadeauHero } from './objects/bonCadeauHero'
import { bonCadeauOccasionItem } from './objects/bonCadeauOccasionItem'
import { bonCadeauOccasions } from './objects/bonCadeauOccasions'
import { bonCadeauGalleryItem } from './objects/bonCadeauGalleryItem'
import { bonCadeauExperience } from './objects/bonCadeauExperience'
import { bonCadeauContentBullet } from './objects/bonCadeauContentBullet'
import { bonCadeauContents } from './objects/bonCadeauContents'
import { bonCadeauStep } from './objects/bonCadeauStep'
import { bonCadeauHowto } from './objects/bonCadeauHowto'
import { bonCadeauFactItem } from './objects/bonCadeauFactItem'
import { bonCadeauFacts } from './objects/bonCadeauFacts'
import { bonCadeauTestimonialItem } from './objects/bonCadeauTestimonialItem'
import { bonCadeauTestimonials } from './objects/bonCadeauTestimonials'
import { bonCadeauFaqItem } from './objects/bonCadeauFaqItem'
import { bonCadeauFaq } from './objects/bonCadeauFaq'
import { bonCadeauFinalCta } from './objects/bonCadeauFinalCta'

// Documents — site
import { siteSettings } from './documents/siteSettings'
import { page } from './documents/page'
import { bonCadeauPage } from './documents/bonCadeauPage'

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
  // Bon Cadeau — objets de section
  bonCadeauReassuranceItem,
  bonCadeauHero,
  bonCadeauOccasionItem,
  bonCadeauOccasions,
  bonCadeauGalleryItem,
  bonCadeauExperience,
  bonCadeauContentBullet,
  bonCadeauContents,
  bonCadeauStep,
  bonCadeauHowto,
  bonCadeauFactItem,
  bonCadeauFacts,
  bonCadeauTestimonialItem,
  bonCadeauTestimonials,
  bonCadeauFaqItem,
  bonCadeauFaq,
  bonCadeauFinalCta,
  // Documents — site
  siteSettings,
  page,
  bonCadeauPage,
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
