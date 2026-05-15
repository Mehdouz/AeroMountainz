import { defineType, defineField, defineArrayMember } from 'sanity'

export const pilotStorySection = defineType({
  name: 'pilotStorySection',
  title: 'Section Histoire du Pilote (timeline)',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (ex. "Mon parcours")',
      type: 'string',
    }),
    defineField({
      name: 'headingStart',
      title: 'Titre — début',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEmphasized',
      title: 'Titre — partie en italique gold',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'headingEnd',
      title: 'Titre — fin (ex. ".")',
      type: 'string',
    }),
    defineField({
      name: 'lede',
      title: 'Chapô (sous le titre)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Jalons',
      type: 'array',
      of: [defineArrayMember({ type: 'pilotStoryItem' })],
      validation: (r) => r.required().min(3),
    }),
    defineField({
      name: 'footerCta',
      title: 'Phrase de fin (ex. "Prêt à découvrir le lac d\'Annecy…")',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'footerLinkLabel',
      title: 'Libellé du lien de fin',
      type: 'string',
    }),
    defineField({
      name: 'footerLinkHref',
      title: 'Lien de fin (ex. "/#formules")',
      type: 'string',
    }),
    defineField({
      name: 'signature',
      title: 'Signature (ex. "— Yannick")',
      type: 'string',
    }),
    defineField({
      name: 'signatureRole',
      title: 'Rôle (ex. "Pilote breveté DGAC · Aero Montagnes")',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({
      title: `Histoire pilote — ${title || '(sans titre)'}`,
    }),
  },
})
