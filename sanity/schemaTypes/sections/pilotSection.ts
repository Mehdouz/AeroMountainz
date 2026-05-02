import { defineType, defineField } from 'sanity'

export const pilotSection = defineType({
  name: 'pilotSection',
  title: 'Section Pilote',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({
      name: 'pilot',
      type: 'reference',
      to: [{ type: 'pilot' }],
      title: 'Pilote',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { name: 'pilot.name', media: 'pilot.image' },
    prepare: ({ name, media }) => ({
      title: `Pilote — ${name || '(non sélectionné)'}`,
      media,
    }),
  },
})
