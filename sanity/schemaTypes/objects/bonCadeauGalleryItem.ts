import { defineType, defineField } from 'sanity'

export const bonCadeauGalleryItem = defineType({
  name: 'bonCadeauGalleryItem',
  title: 'Image de galerie',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Texte alternatif',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Légende (affichée en bas à gauche)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'caption', subtitle: 'alt', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || subtitle || 'Image',
      subtitle,
      media,
    }),
  },
})
