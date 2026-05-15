import { defineType, defineField } from 'sanity'
import { BON_CADEAU_ICON_KEYS } from './bonCadeauOccasionItem'

export const bonCadeauFactItem = defineType({
  name: 'bonCadeauFactItem',
  title: 'Fait pratique',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icône',
      type: 'string',
      options: { list: [...BON_CADEAU_ICON_KEYS] },
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
      rows: 2,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'iconKey' },
  },
})
