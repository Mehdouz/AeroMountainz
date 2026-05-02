import { defineType, defineField } from 'sanity'

export const cloudBreakQuoteSection = defineType({
  name: 'cloudBreakQuoteSection',
  title: 'Section Citation',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 3,
      title: 'Citation',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      type: 'string',
      title: 'Auteur (optionnel)',
    }),
  ],
  preview: {
    select: { title: 'quote', subtitle: 'author' },
    prepare: ({ title, subtitle }) => ({
      title: `Citation — ${title?.slice(0, 50)}…`,
      subtitle,
    }),
  },
})
