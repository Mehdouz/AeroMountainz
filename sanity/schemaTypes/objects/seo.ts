import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre SEO (balise <title>)',
      type: 'string',
      description: 'Si vide, le titre de la page sera utilisé.',
      validation: (r) => r.max(70).warning('Idéalement < 70 caractères'),
    }),
    defineField({
      name: 'description',
      title: 'Description SEO (meta description)',
      type: 'text',
      rows: 3,
      validation: (r) =>
        r.max(160).warning('Idéalement < 160 caractères'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image Open Graph (1200×630)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Image affichée lors du partage sur les réseaux sociaux. Si vide, l\'image hero/cover de la page sera utilisée.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Empêcher l\'indexation par les moteurs de recherche',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
