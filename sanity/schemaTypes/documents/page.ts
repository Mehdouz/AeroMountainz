import { defineType, defineField, defineArrayMember } from 'sanity'

const SECTION_TYPES = [
  'heroSection',
  'statsSection',
  'formulasSection',
  'cloudBreakQuoteSection',
  'journeySection',
  'pilotSection',
  'pilotHeroSection',
  'pilotStorySection',
  'gallerySection',
  'reviewsSection',
  'faqSection',
  'ctaSection',
  'contactSection',
  'richTextSection',
  'bonCadeauHeroSection',
  'bonCadeauOccasionsSection',
  'bonCadeauExperienceSection',
  'bonCadeauContentsSection',
  'bonCadeauHowtoSection',
  'bonCadeauFactsSection',
  'bonCadeauTestimonialsSection',
  'bonCadeauFinalCtaSection',
] as const

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fieldsets: [
    { name: 'seoFieldset', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre de la page',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug (segment d\'URL)',
      description:
        'Utilise "home" pour la page d\'accueil. Sinon, le slug devient l\'URL : "bon-cadeau", "contact", etc.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: SECTION_TYPES.map((type) => defineArrayMember({ type })),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      fieldset: 'seoFieldset',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', language: 'language' },
    prepare: ({ title, subtitle, language }) => ({
      title,
      subtitle: `/${subtitle || ''}${language ? ` · ${language.toUpperCase()}` : ''}`,
    }),
  },
})
