import { defineType, defineField } from 'sanity'

export const ctaSection = defineType({
  name: 'ctaSection',
  title: 'Section CTA',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({
      name: 'titleStart',
      type: 'string',
      title: 'Titre — début',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEmphasized',
      type: 'string',
      title: 'Titre — partie en italique',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      title: 'Description',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Image de fond',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'primaryCtaLabel',
      type: 'string',
      title: 'Libellé CTA principal (ex. "Appeler")',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      type: 'string',
      title: 'Libellé CTA secondaire',
    }),
    defineField({
      name: 'locationLabel',
      type: 'string',
      title: 'Libellé localisation',
    }),
  ],
  preview: {
    select: { title: 'titleEmphasized', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({ title: `CTA — ${title}`, media }),
  },
})
