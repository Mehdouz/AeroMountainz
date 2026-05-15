import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauTestimonials = defineType({
  name: 'bonCadeauTestimonials',
  title: 'Section Témoignages',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Surtitre', type: 'string' }),
    defineField({
      name: 'headingStart',
      title: 'Titre — début',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEmphasized',
      title: 'Titre — partie en italique gold',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEnd',
      title: 'Titre — fin',
      type: 'string',
    }),
    defineField({
      name: 'googleRatingStars',
      title: 'Note Google (ex. "4,9")',
      type: 'string',
    }),
    defineField({
      name: 'googleRatingLabel',
      title: 'Libellé sous la note (ex. "+50 avis Google")',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Témoignages (3)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauTestimonialItem' })],
      validation: (r) => r.required().min(3).max(3),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Témoignages — ${title || ''}` }),
  },
})
