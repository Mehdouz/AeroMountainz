import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauFaqItem = defineType({
  name: 'bonCadeauFaqItem',
  title: 'Question / réponse',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
})
