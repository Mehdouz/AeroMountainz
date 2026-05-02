import { defineType, defineField } from 'sanity'

export const pilotBadge = defineType({
  name: 'pilotBadge',
  title: 'Badge pilote',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icône',
      type: 'string',
      options: {
        list: [
          { title: 'Award', value: 'award' },
          { title: 'Wind', value: 'wind' },
          { title: 'Trophy', value: 'trophy' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'iconKey' },
  },
})
