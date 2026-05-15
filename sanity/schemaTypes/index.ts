import type { SchemaTypeDefinition } from 'sanity'

// Objects
import { brand } from './objects/brand'
import { contact } from './objects/contact'
import { ctaButton } from './objects/ctaButton'
import { location } from './objects/location'
import { navLink } from './objects/navLink'
import { pilotBadge } from './objects/pilotBadge'
import { pilotHeroStat } from './objects/pilotHeroStat'
import { pilotStoryItem } from './objects/pilotStoryItem'
import { seo } from './objects/seo'

// Bon Cadeau — sub-items (utilisés à l'intérieur des sections bon-cadeau)
import { bonCadeauReassuranceItem } from './objects/bonCadeauReassuranceItem'
import { bonCadeauOccasionItem } from './objects/bonCadeauOccasionItem'
import { bonCadeauGalleryItem } from './objects/bonCadeauGalleryItem'
import { bonCadeauContentBullet } from './objects/bonCadeauContentBullet'
import { bonCadeauStep } from './objects/bonCadeauStep'
import { bonCadeauFactItem } from './objects/bonCadeauFactItem'
import { bonCadeauTestimonialItem } from './objects/bonCadeauTestimonialItem'

// Sections
import { heroSection } from './sections/heroSection'
import { statsSection } from './sections/statsSection'
import { formulasSection } from './sections/formulasSection'
import { journeySection } from './sections/journeySection'
import { pilotSection } from './sections/pilotSection'
import { pilotHeroSection } from './sections/pilotHeroSection'
import { pilotStorySection } from './sections/pilotStorySection'
import { gallerySection } from './sections/gallerySection'
import { reviewsSection } from './sections/reviewsSection'
import { faqSection } from './sections/faqSection'
import { ctaSection } from './sections/ctaSection'
import { contactSection } from './sections/contactSection'
import { richTextSection } from './sections/richTextSection'

// Bon Cadeau — sections (utilisables dans page.sections[])
import { bonCadeauHeroSection } from './sections/bonCadeauHeroSection'
import { bonCadeauOccasionsSection } from './sections/bonCadeauOccasionsSection'
import { bonCadeauExperienceSection } from './sections/bonCadeauExperienceSection'
import { bonCadeauContentsSection } from './sections/bonCadeauContentsSection'
import { bonCadeauHowtoSection } from './sections/bonCadeauHowtoSection'
import { bonCadeauFactsSection } from './sections/bonCadeauFactsSection'
import { bonCadeauTestimonialsSection } from './sections/bonCadeauTestimonialsSection'
import { bonCadeauFinalCtaSection } from './sections/bonCadeauFinalCtaSection'

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
  pilotHeroStat,
  pilotStoryItem,
  seo,
  // Bon Cadeau — sub-items
  bonCadeauReassuranceItem,
  bonCadeauOccasionItem,
  bonCadeauGalleryItem,
  bonCadeauContentBullet,
  bonCadeauStep,
  bonCadeauFactItem,
  bonCadeauTestimonialItem,
  // Sections
  heroSection,
  statsSection,
  formulasSection,
  journeySection,
  pilotSection,
  pilotHeroSection,
  pilotStorySection,
  gallerySection,
  reviewsSection,
  faqSection,
  ctaSection,
  contactSection,
  richTextSection,
  // Bon Cadeau — sections
  bonCadeauHeroSection,
  bonCadeauOccasionsSection,
  bonCadeauExperienceSection,
  bonCadeauContentsSection,
  bonCadeauHowtoSection,
  bonCadeauFactsSection,
  bonCadeauTestimonialsSection,
  bonCadeauFinalCtaSection,
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
