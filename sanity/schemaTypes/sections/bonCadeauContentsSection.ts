import { defineType, defineField, defineArrayMember } from 'sanity'

export const bonCadeauContentsSection = defineType({
  name: 'bonCadeauContentsSection',
  title: 'Section "Ce que vous recevez" (Bon cadeau)',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Surtitre', type: 'string' }),
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
      title: 'Titre — fin',
      type: 'string',
    }),
    defineField({
      name: 'mockupTitleStart',
      title: 'Mockup — titre début',
      type: 'string',
      description: 'Affiché sur la carte mockup. Ex. "Vol en"',
    }),
    defineField({
      name: 'mockupTitleEmphasized',
      title: 'Mockup — titre italique gold',
      type: 'string',
      description: 'Ex. "montgolfière"',
    }),
    defineField({
      name: 'mockupTitleEnd',
      title: 'Mockup — titre fin',
      type: 'string',
      description: 'Ex. "à Annecy"',
    }),
    defineField({
      name: 'mockupRecipient',
      title: 'Mockup — exemple de dédicace',
      type: 'text',
      rows: 2,
      description: 'Ex. "Pour Camille, avec tout mon amour."',
    }),
    defineField({
      name: 'mockupNumberLabel',
      title: 'Mockup — numéro affiché',
      type: 'string',
      description: 'Ex. "N° 24-A1839"',
    }),
    defineField({
      name: 'mockupValidityLabel',
      title: 'Mockup — libellé validité',
      type: 'string',
      description: 'Ex. "Valable 12 mois"',
    }),
    defineField({
      name: 'mockupEyebrow',
      title: 'Mockup — surtitre haut de carte',
      type: 'string',
      description: 'Ex. "Bon cadeau · Aero Montagnes"',
    }),
    defineField({
      name: 'bullets',
      title: 'Points (ce que vous recevez)',
      type: 'array',
      of: [defineArrayMember({ type: 'bonCadeauContentBullet' })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'headingEmphasized' },
    prepare: ({ title }) => ({ title: `Bon cadeau · Ce que vous recevez — ${title || ''}` }),
  },
})
