import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauExperience = defineType({
  name: 'bonCadeauExperience',
  title: 'Section Expérience',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Surtitre', type: 'string' }),
    defineField({
      name: 'headingStart',
      title: 'Titre — début',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEmphasized',
      title: 'Titre — partie en italique gold',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEnd',
      title: 'Titre — fin',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre (italique gold)',
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
    }),
    defineField({
      name: 'linkLabel',
      title: 'Lien — libellé (optionnel)',
      type: 'string',
    }),
    defineField({
      name: 'linkHref',
      title: 'Lien — URL (optionnel)',
      type: 'string',
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images (4 images)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauGalleryItem' })],
      validation: (r) => r.required().min(4).max(4),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Expérience — ${title || ''}` }),
  },
})
