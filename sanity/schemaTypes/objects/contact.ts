import { defineType, defineField } from 'sanity'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'object',
  fields: [
    defineField({
      name: 'phone',
      title: 'Téléphone (format international, ex. +33673940721)',
      type: 'string',
      validation: (r) =>
        r.required().regex(/^\+?\d{8,15}$/, { name: 'téléphone' }),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Téléphone (affichage, ex. 06 73 94 07 21)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (r) => r.required().email(),
    }),
  ],
})
