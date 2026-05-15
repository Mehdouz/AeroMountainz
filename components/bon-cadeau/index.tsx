import BonCadeauHeroSection from './hero'
import BonCadeauOccasionsSection from './occasions'
import BonCadeauExperienceSection from './experience'
import BonCadeauContentsSection from './contents'
import BonCadeauHowtoSection from './howto'
import BonCadeauFactsSection from './facts'
import BonCadeauTestimonialsSection from './testimonials'
import BonCadeauFaqSectionView from './faq'
import BonCadeauFinalCtaSection from './final-cta'
import type { Locale } from '@/lib/i18n'
import type { BonCadeauPage } from '@/lib/types/content'

export default function BonCadeauPageView({
  page,
  locale,
}: {
  page: BonCadeauPage
  locale: Locale
}) {
  return (
    <>
      <BonCadeauHeroSection data={page.hero} locale={locale} />
      {page.occasions && <BonCadeauOccasionsSection data={page.occasions} />}
      {page.experience && <BonCadeauExperienceSection data={page.experience} locale={locale} />}
      {page.contents && <BonCadeauContentsSection data={page.contents} />}
      {page.howto && <BonCadeauHowtoSection data={page.howto} />}
      {page.facts && <BonCadeauFactsSection data={page.facts} />}
      {page.testimonials && <BonCadeauTestimonialsSection data={page.testimonials} />}
      {page.faq && <BonCadeauFaqSectionView data={page.faq} />}
      {page.finalCta && <BonCadeauFinalCtaSection data={page.finalCta} locale={locale} />}
    </>
  )
}
