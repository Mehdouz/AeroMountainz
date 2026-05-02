import { defineType, defineField, defineArrayMember } from 'sanity'

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Section Avis',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Titre',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'reviews',
      type: 'array',
      title: 'Avis',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'review' }] })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'aggregateRating',
      type: 'string',
      title: 'Note globale (ex. "4.9")',
    }),
    defineField({
      name: 'aggregateCountLabel',
      type: 'string',
      title: 'Libellé du nombre (ex. "+120 avis")',
    }),
    defineField({
      name: 'aggregateSource',
      type: 'string',
      title: 'Source (ex. "Google Reviews")',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Avis — ${title}` }),
  },
})
