import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauOccasions = defineType({
  name: 'bonCadeauOccasions',
  title: 'Section Occasions',
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
      name: 'items',
      title: 'Occasions',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauOccasionItem' })],
      validation: (r) => r.min(4).max(12),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Occasions — ${title || ''}` }),
  },
})
