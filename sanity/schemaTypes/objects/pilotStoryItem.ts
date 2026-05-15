import { defineType, defineField, defineArrayMember } from 'sanity'

export const pilotStoryItem = defineType({
  name: 'pilotStoryItem',
  title: 'Jalon (timeline pilote)',
  type: 'object',
  fields: [
    defineField({
      name: 'date',
      title: 'Date affichée (ex. "2014", "Aujourd\'hui")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'dateTime',
      title: 'Attribut datetime (ex. "2014", "2026") — pour SEO',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEmphasized',
      title: 'Titre — partie en italique gold (optionnelle, appendée)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Corps du texte',
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
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'tags',
      title: 'Tags (pills sous le texte)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})
