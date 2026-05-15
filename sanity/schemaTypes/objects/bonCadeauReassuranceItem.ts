import { defineType, defineField } from 'sanity'

export const bonCadeauReassuranceItem = defineType({
  name: 'bonCadeauReassuranceItem',
  title: 'Point rassurant',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Texte',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'label' },
  },
})
