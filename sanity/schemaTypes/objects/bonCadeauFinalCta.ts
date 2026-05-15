import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauFinalCta = defineType({
  name: 'bonCadeauFinalCta',
  title: 'Section CTA final',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Surtitre', type: 'string' }),
    defineField({
      name: 'headingLine1',
      title: 'Titre — ligne 1 (italique gold)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingLine2',
      title: 'Titre — ligne 2 (italique gold)',
      type: 'string',
    }),
    defineField({
      name: 'subtext',
      title: 'Sous-texte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'CTA principal',
      type: 'ctaButton',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'CTA secondaire',
      type: 'ctaButton',
    }),
    defineField({
      name: 'reassuranceItems',
      title: 'Points rassurants (bas de section)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauReassuranceItem' })],
      validation: (r) => r.max(6),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond (optionnelle, visible avec voile cream par-dessus)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundAlt',
      title: 'Texte alternatif de l\'image de fond',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'headingLine1', media: 'backgroundImage' },
    prepare: ({ title, media }) => ({
      title: `CTA final — ${title || '(sans titre)'}`,
      media,
    }),
  },
})
