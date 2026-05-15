import { defineType, defineField } from 'sanity'

export const bonCadeauPage = defineType({
  name: 'bonCadeauPage',
  title: 'Page Bon Cadeau',
  type: 'document',
  fieldsets: [
    { name: 'seoFieldset', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre interne',
      type: 'string',
      description: 'Pour l\'organisation Studio. Le titre SEO se règle dans le bloc SEO.',
      initialValue: 'Page Bon Cadeau',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'bonCadeauHero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'occasions',
      title: 'Occasions',
      type: 'bonCadeauOccasions',
    }),
    defineField({
      name: 'experience',
      title: 'Le vol qu\'ils vont vivre',
      type: 'bonCadeauExperience',
    }),
    defineField({
      name: 'contents',
      title: 'Ce que vous recevez',
      type: 'bonCadeauContents',
    }),
    defineField({
      name: 'howto',
      title: 'Comment ça marche',
      type: 'bonCadeauHowto',
    }),
    defineField({
      name: 'facts',
      title: 'Bon à savoir',
      type: 'bonCadeauFacts',
    }),
    defineField({
      name: 'testimonials',
      title: 'Témoignages',
      type: 'bonCadeauTestimonials',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'bonCadeauFaq',
    }),
    defineField({
      name: 'finalCta',
      title: 'CTA final',
      type: 'bonCadeauFinalCta',
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      fieldset: 'seoFieldset',
    }),
  ],
  preview: {
    select: { title: 'title', language: 'language', media: 'hero.backgroundImage' },
    prepare: ({ title, language, media }) => ({
      title: title || 'Page Bon Cadeau',
      subtitle: language ? language.toUpperCase() : '',
      media,
    }),
  },
})
