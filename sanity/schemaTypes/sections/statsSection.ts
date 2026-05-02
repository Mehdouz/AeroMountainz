import { defineType, defineField, defineArrayMember } from 'sanity'

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Section Stats',
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
      name: 'stats',
      type: 'array',
      title: 'Stats',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'stat' }] })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Stats — ${title}` }),
  },
})
