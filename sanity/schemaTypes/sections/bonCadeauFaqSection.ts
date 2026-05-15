import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauFaqSection = defineType({
  name: 'bonCadeauFaqSection',
  title: 'Section FAQ (Bon cadeau)',
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
      title: 'Questions / réponses',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauFaqItem' })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Bon cadeau · FAQ — ${title || ''}` }),
  },
})
