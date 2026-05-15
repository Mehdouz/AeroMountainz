import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauHero = defineType({
  name: 'bonCadeauHero',
  title: 'Section Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Image de fond',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'backgroundAlt',
      title: 'Texte alternatif de l\'image de fond',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleStart',
      title: 'Titre — début',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEmphasized',
      title: 'Titre — partie en italique gold',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEnd',
      title: 'Titre — fin',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'priceLabel',
      title: 'Libellé prix (ex. "À partir de")',
      type: 'string',
    }),
    defineField({
      name: 'priceAmount',
      title: 'Montant',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Devise',
      type: 'string',
      initialValue: '€',
    }),
    defineField({
      name: 'priceSubtext',
      title: 'Détail prix (ex. "Une personne · Vol au lever du soleil")',
      type: 'string',
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
      title: 'Points rassurants (barre du bas)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauReassuranceItem' })],
      validation: (r) => r.max(6),
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
