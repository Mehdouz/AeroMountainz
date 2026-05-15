import { defineType, defineField } from 'sanity'

export const pilotHeroStat = defineType({
  name: 'pilotHeroStat',
  title: 'Stat pilote (hero)',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Valeur (ex. "400 h", "DGAC", "Champion")',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Libellé (ex. "de vol", "Brevet professionnel")',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
