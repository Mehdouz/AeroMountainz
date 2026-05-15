import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauContentBullet = defineType({
  name: 'bonCadeauContentBullet',
  title: 'Point — Ce que vous recevez',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Texte (utiliser gras / italique)',
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
    select: { body: 'body' },
    prepare: ({ body }) => {
      const first = (body as { children?: { text?: string }[] }[] | undefined)?.[0]
      const text = first?.children?.map((c) => c.text).filter(Boolean).join(' ') ?? ''
      return { title: text.slice(0, 60) || '(point)' }
    },
  },
})
