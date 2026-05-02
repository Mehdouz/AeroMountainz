import { defineType, defineField } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Nom',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 2,
      title: 'Description',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', language: 'language' },
    prepare: ({ title, subtitle, language }) => ({
      title,
      subtitle: `${subtitle}${language ? ` · ${language.toUpperCase()}` : ''}`,
    }),
  },
})
