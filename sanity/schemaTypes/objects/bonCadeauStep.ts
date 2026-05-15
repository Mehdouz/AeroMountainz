import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauStep = defineType({
  name: 'bonCadeauStep',
  title: 'Étape',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Numéro affiché (ex. "01")',
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
    select: { title: 'title', subtitle: 'number' },
  },
})
