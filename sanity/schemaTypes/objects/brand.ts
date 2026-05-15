import { defineType, defineField } from 'sanity'

export const brand = defineType({
  name: 'brand',
  title: 'Marque',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo — texte alternatif',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      description: 'Utilisé dans le copyright du footer et les métadonnées Open Graph.',
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
  ],
})
