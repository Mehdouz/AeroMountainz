import { defineType, defineField } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Image de galerie',
  type: 'document',
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
      title: 'Titre (lightbox)',
      type: 'string',
      description: 'Titre poétique affiché dans le lightbox. Optionnel — si vide, on retombe sur le texte alternatif.',
    }),
    defineField({
      name: 'description',
      title: 'Description (lightbox)',
      type: 'text',
      rows: 2,
      description: 'Sous-titre court affiché sous le titre dans le lightbox. Optionnel.',
    }),
    defineField({
      name: 'span',
      title: 'Taille dans la grille',
      type: 'string',
      options: {
        list: [
          { title: '1×1', value: 'col-span-1 row-span-1' },
          { title: '1×2 (haut)', value: 'col-span-1 row-span-2' },
          { title: '2×1 (large)', value: 'col-span-2 row-span-1' },
          { title: '2×2 (grand)', value: 'col-span-2 row-span-2' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
      initialValue: 'col-span-1 row-span-1',
    }),
    defineField({
      name: 'orderRank',
      title: 'Ordre',
      type: 'number',
      hidden: true,
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
  ],
  preview: {
    select: { title: 'alt', media: 'image', subtitle: 'span' },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
})
