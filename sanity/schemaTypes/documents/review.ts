import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Avis',
  type: 'document',
  fields: [
    defineField({
      name: 'stars',
      title: 'Étoiles (1 à 5)',
      type: 'number',
      validation: (r) => r.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Texte',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (texte libre, ex. "Octobre 2024")',
      type: 'string',
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
    select: { title: 'author', subtitle: 'date', text: 'text' },
    prepare: ({ title, subtitle, text }) => ({
      title: `${title} — ${subtitle}`,
      subtitle: text,
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
