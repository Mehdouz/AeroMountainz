import { defineType, defineField } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Section Hero',
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
    defineField({ name: 'titleEnd', type: 'string', title: 'Titre — fin' }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 3,
      title: 'Sous-titre (les retours à la ligne sont préservés)',
    }),
    defineField({
      name: 'primaryCta',
      type: 'ctaButton',
      title: 'CTA principal',
    }),
    defineField({
      name: 'secondaryCta',
      type: 'ctaButton',
      title: 'CTA secondaire',
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Image de fond',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'backgroundAlt',
      type: 'string',
      title: 'Texte alternatif de l\'image de fond',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cloudsImage',
      type: 'image',
      title: 'Image de nuages (calque parallaxe)',
      options: { hotspot: true },
    }),
    defineField({
      name: 'scrollLabel',
      type: 'string',
      title: 'Libellé du scroll',
    }),
  ],
  preview: {
    select: { title: 'titleEmphasized', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({
      title: `Hero — ${title || '(sans titre)'}`,
      media,
    }),
  },
})
