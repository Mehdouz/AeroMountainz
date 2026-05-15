import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauFacts = defineType({
  name: 'bonCadeauFacts',
  title: 'Section "Bon à savoir"',
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
      title: 'Faits',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauFactItem' })],
      validation: (r) => r.required().min(3).max(9),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Bon à savoir — ${title || ''}` }),
  },
})
