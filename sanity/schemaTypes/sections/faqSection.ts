import { defineType, defineField, defineArrayMember } from 'sanity'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'Section FAQ',
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
      name: 'faqs',
      type: 'array',
      title: 'Questions/Réponses',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'faq' }] })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'dark',
      type: 'boolean',
      title: 'Variant sombre (fond midnight)',
      description: 'À activer quand la section est rendue sur fond sombre (ex. page Contact).',
      initialValue: false,
    }),
    defineField({
      name: 'lede',
      type: 'text',
      rows: 2,
      title: 'Sous-titre (optionnel)',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `FAQ — ${title}` }),
  },
})
