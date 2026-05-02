import { defineType, defineField, defineArrayMember } from 'sanity'

export const formulasSection = defineType({
  name: 'formulasSection',
  title: 'Section Formules',
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
      name: 'subtext',
      type: 'text',
      rows: 2,
      title: 'Texte sous les cartes (ex. "Chaque vol est confirmé par téléphone…")',
    }),
    defineField({
      name: 'formulas',
      type: 'array',
      title: 'Formules',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'formula' }] }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Formules — ${title}` }),
  },
})
