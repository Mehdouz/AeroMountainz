import { defineType, defineField } from 'sanity'

export const journeyStep = defineType({
  name: 'journeyStep',
  title: 'Étape du déroulé',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Numéro (ex. "01")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'time',
      title: 'Horaire (ex. "05h30")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'Ordre',
      type: 'number',
      hidden: true,
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
  ],
  preview: {
    select: { number: 'number', time: 'time', title: 'title' },
    prepare: ({ number, time, title }) => ({
      title: `${number} — ${title}`,
      subtitle: time,
    }),
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
})
