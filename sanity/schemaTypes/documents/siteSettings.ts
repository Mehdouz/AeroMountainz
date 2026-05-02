import { defineType, defineField, defineArrayMember } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'url',
      title: 'URL canonique du site',
      type: 'url',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Marque',
      type: 'brand',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'contact',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'location',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'navLinks',
      title: 'Liens de navigation',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Liens légaux',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres du site' }),
  },
})
