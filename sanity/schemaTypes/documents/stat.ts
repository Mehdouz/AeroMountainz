import { defineType, defineField } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'document',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icône',
      type: 'string',
      options: {
        list: [
          { title: 'Clock', value: 'clock' },
          { title: 'Users', value: 'users' },
          { title: 'Calendar', value: 'calendar' },
          { title: 'Map Pin', value: 'mapPin' },
          { title: 'Star', value: 'star' },
          { title: 'Award', value: 'award' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'value',
      title: 'Valeur (ex. "3h", "1 à 5")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sub',
      title: 'Sous-libellé',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'Ordre',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
})
