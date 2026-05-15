import { defineType, defineField } from 'sanity'

export const BON_CADEAU_ICON_KEYS = [
  { title: 'Cœur (Saint-Valentin, demande)', value: 'heart' },
  { title: 'Cadeau', value: 'gift' },
  { title: 'Gâteau (anniversaire)', value: 'cake' },
  { title: 'Coupe (anniversaire mariage)', value: 'cup' },
  { title: 'Sapin (Noël)', value: 'tree' },
  { title: 'Personnes (fête)', value: 'users' },
  { title: 'Horloge (retraite, validité)', value: 'clock' },
  { title: 'Étoile (spontané, top)', value: 'star' },
  { title: 'Calendrier', value: 'calendar' },
  { title: 'Repère carte (lieu)', value: 'pin' },
  { title: 'Nuage (météo)', value: 'cloud' },
  { title: 'Médaille (pilote, qualité)', value: 'medal' },
] as const

export const bonCadeauOccasionItem = defineType({
  name: 'bonCadeauOccasionItem',
  title: 'Occasion',
  type: 'object',
  fields: [
    defineField({
      name: 'iconKey',
      title: 'Icône',
      type: 'string',
      options: { list: [...BON_CADEAU_ICON_KEYS] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'label',
      title: 'Libellé (utiliser \\n pour passer à la ligne)',
      type: 'string',
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'iconKey' },
  },
})
