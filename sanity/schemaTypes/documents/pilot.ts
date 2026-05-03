import { defineType, defineField, defineArrayMember } from 'sanity'

export const pilot = defineType({
  name: 'pilot',
  title: 'Pilote',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texte alternatif du portrait',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Années d\'expérience (ex. "10 ans")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bioParagraphs',
      title: 'Biographie',
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
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [defineArrayMember({ type: 'pilotBadge' })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé du CTA',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
