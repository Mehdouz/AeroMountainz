import { defineType, defineField } from 'sanity'

export const bonCadeauTestimonialItem = defineType({
  name: 'bonCadeauTestimonialItem',
  title: 'Témoignage',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name',
      title: 'Prénom / nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'occasion',
      title: 'Occasion (ex. "anniversaire 40 ans")',
      type: 'string',
    }),
    defineField({
      name: 'stars',
      title: 'Étoiles (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5).integer(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'occasion' },
  },
})
