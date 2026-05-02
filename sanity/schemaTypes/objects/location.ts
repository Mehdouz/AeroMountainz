import { defineType, defineField } from 'sanity'

export const location = defineType({
  name: 'location',
  title: 'Localisation',
  type: 'object',
  fields: [
    defineField({
      name: 'addressLine1',
      title: 'Adresse ligne 1',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'addressLine2',
      title: 'Adresse ligne 2',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'short',
      title: 'Adresse courte',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
})
