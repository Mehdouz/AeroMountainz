import { defineType, defineField, defineArrayMember } from 'sanity'

export const pilotHeroSection = defineType({
  name: 'pilotHeroSection',
  title: 'Section Hero Pilote (split image + contenu)',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (ex. "Votre pilote")',
      type: 'string',
    }),
    defineField({
      name: 'titleStart',
      title: 'Titre — début (ex. "Yannick Dacheux,")',
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
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait (image de gauche)',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'portraitAlt',
      title: 'Texte alternatif du portrait',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'badgeNumber',
      title: 'Badge — valeur (ex. "10 ans")',
      type: 'string',
    }),
    defineField({
      name: 'badgeLabel',
      title: 'Badge — libellé (ex. "au-dessus du lac")',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Stats (max 3)',
      type: 'array',
      of: [defineArrayMember({ type: 'pilotHeroStat' })],
      validation: (r) => r.max(3),
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
      name: 'scrollLabel',
      title: 'Libellé du scroll (ex. "Son histoire")',
      type: 'string',
    }),
    defineField({
      name: 'scrollHref',
      title: 'Ancre du scroll (ex. "#mon-histoire")',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'titleEmphasized', media: 'portraitImage' },
    prepare: ({ title, media }) => ({
      title: `Hero Pilote — ${title || '(sans titre)'}`,
      media,
    }),
  },
})
