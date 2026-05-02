import { defineType, defineField, defineArrayMember } from 'sanity'

export const journeySection = defineType({
  name: 'journeySection',
  title: 'Section Déroulé',
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
      name: 'footer',
      type: 'string',
      title: 'Texte de pied (ex. "Durée totale : environ 3 heures")',
    }),
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Étapes',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'journeyStep' }] }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Déroulé — ${title}` }),
  },
})
