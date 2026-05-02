import { defineType, defineField, defineArrayMember } from 'sanity'

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Section Galerie',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Titre',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Images',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'galleryItem' }] }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: `Galerie — ${title}` }),
  },
})
