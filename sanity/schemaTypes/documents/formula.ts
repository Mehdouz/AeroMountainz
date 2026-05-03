import { defineType, defineField, defineArrayMember } from 'sanity'

export const formula = defineType({
  name: 'formula',
  title: 'Formule',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Tag (ex. "Découverte", "Populaire")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre (les retours à la ligne sont préservés)',
      type: 'text',
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix (ex. "250 €", "Sur devis")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'priceDetail',
      title: 'Détail du prix (ex. "par personne")',
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
      name: 'features',
      title: 'Caractéristiques',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'highlight',
      title: 'Mettre en avant',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'title', subtitle: 'price', highlight: 'highlight' },
    prepare: ({ title, subtitle, highlight }) => ({
      title: title?.replace(/\n/g, ' '),
      subtitle: `${subtitle}${highlight ? ' · ⭐' : ''}`,
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
