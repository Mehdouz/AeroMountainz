import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauHowtoSection = defineType({
  name: 'bonCadeauHowtoSection',
  title: 'Section "Comment ça marche" (Bon cadeau)',
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
      name: 'subtitle',
      title: 'Sous-titre (italique gold)',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Étapes (3 étapes)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauStep' })],
      validation: (r) => r.required().min(3).max(3),
    }),
  ],
  options: { collapsible: true },
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Bon cadeau · Comment ça marche — ${title || ''}` }),
  },
})
