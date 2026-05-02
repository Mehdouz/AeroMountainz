import { defineType, defineField, defineArrayMember } from 'sanity'

const SECTION_TYPES = [
  'heroSection',
  'statsSection',
  'formulasSection',
  'cloudBreakQuoteSection',
  'journeySection',
  'pilotSection',
  'gallerySection',
  'reviewsSection',
  'faqSection',
  'ctaSection',
  'richTextSection',
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
        'Utilise "home" pour la page d\'accueil. Sinon, le slug devient l\'URL : "vols", "contact", etc.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
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
