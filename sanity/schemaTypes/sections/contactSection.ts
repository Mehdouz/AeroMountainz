import { defineType, defineField, defineArrayMember } from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Section Contact',
  type: 'object',
  fieldsets: [
    { name: 'hero', title: 'Hero', options: { collapsible: true, collapsed: false } },
    {
      name: 'coord',
      title: 'Bandeau coordonnées',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'form',
      title: 'Formulaire',
      options: { collapsible: true, collapsed: true },
    },
    {
      name: 'lieu',
      title: 'Lieu / Carte',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // ─── HERO ────────────────────────────────────────────
    defineField({
      name: 'eyebrow',
      type: 'string',
      title: 'Eyebrow',
      fieldset: 'hero',
    }),
    defineField({
      name: 'titleStart',
      type: 'string',
      title: 'Titre — début',
      fieldset: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'titleEmphasized',
      type: 'string',
      title: 'Titre — italique (or)',
      fieldset: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 3,
      title: 'Sous-titre',
      fieldset: 'hero',
    }),
    defineField({
      name: 'infoLines',
      type: 'array',
      title: 'Lignes d\'info (bloc droit)',
      fieldset: 'hero',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'infoLine',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              title: 'Libellé',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Valeur',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    // ─── COORDONNÉES ─────────────────────────────────────
    defineField({
      name: 'infoColumns',
      type: 'array',
      title: 'Colonnes coordonnées (3 max recommandées)',
      fieldset: 'coord',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'infoColumn',
          fields: [
            defineField({
              name: 'num',
              type: 'string',
              title: 'Numéro / étiquette',
              description: 'Ex. "01 · Téléphone"',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Sous-titre italique',
              description: 'Ex. "Le plus rapide pour une réponse →"',
            }),
            defineField({
              name: 'value',
              type: 'string',
              title: 'Valeur principale',
              description: 'Numéro de téléphone, email, ou ligne d\'adresse',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'valueLine2',
              type: 'string',
              title: 'Valeur — 2e ligne (optionnel)',
            }),
            defineField({
              name: 'link',
              type: 'string',
              title: 'Lien (optionnel)',
              description: 'Ex. tel:+33450730487, mailto:contact@aero.fr',
            }),
            defineField({
              name: 'hint',
              type: 'text',
              rows: 2,
              title: 'Note en bas',
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'num' } },
        }),
      ],
    }),

    // ─── FORMULAIRE ──────────────────────────────────────
    defineField({
      name: 'formEyebrow',
      type: 'string',
      title: 'Eyebrow (formulaire)',
      fieldset: 'form',
    }),
    defineField({
      name: 'formTitleStart',
      type: 'string',
      title: 'Titre formulaire — début',
      fieldset: 'form',
    }),
    defineField({
      name: 'formTitleEmphasized',
      type: 'string',
      title: 'Titre formulaire — italique',
      fieldset: 'form',
    }),
    defineField({
      name: 'formLede',
      type: 'text',
      rows: 3,
      title: 'Lede formulaire',
      fieldset: 'form',
    }),
    defineField({
      name: 'formMeta',
      type: 'array',
      title: 'Méta (3 lignes : Réponse / Urgent / Confidentiel)',
      fieldset: 'form',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'formMetaRow',
          fields: [
            defineField({ name: 'key', type: 'string', title: 'Clé', validation: (r) => r.required() }),
            defineField({ name: 'value', type: 'string', title: 'Valeur', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'key' } },
        }),
      ],
    }),
    defineField({
      name: 'subjects',
      type: 'array',
      title: 'Sujets (radios)',
      fieldset: 'form',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subjectOption',
          fields: [
            defineField({
              name: 'value',
              type: 'string',
              title: 'Valeur (envoyée dans l\'email)',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'label',
              type: 'string',
              title: 'Libellé affiché',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'paxOptions',
      type: 'array',
      title: 'Options nombre de passagers',
      fieldset: 'form',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'consentText',
      type: 'text',
      rows: 3,
      title: 'Texte de consentement (RGPD)',
      fieldset: 'form',
    }),
    defineField({
      name: 'submitLabel',
      type: 'string',
      title: 'Libellé bouton envoi',
      fieldset: 'form',
    }),
    defineField({
      name: 'submitHint',
      type: 'string',
      title: 'Indice à côté du bouton (ex. "Réponse · sous 24h")',
      fieldset: 'form',
    }),
    defineField({
      name: 'successMessage',
      type: 'string',
      title: 'Message succès envoi',
      fieldset: 'form',
    }),
    defineField({
      name: 'errorMessage',
      type: 'string',
      title: 'Message erreur envoi',
      fieldset: 'form',
    }),

    // ─── LIEU / CARTE ────────────────────────────────────
    defineField({
      name: 'lieuEyebrow',
      type: 'string',
      title: 'Eyebrow (lieu)',
      fieldset: 'lieu',
    }),
    defineField({
      name: 'lieuTitleStart',
      type: 'string',
      title: 'Titre lieu — début',
      fieldset: 'lieu',
    }),
    defineField({
      name: 'lieuTitleEmphasized',
      type: 'string',
      title: 'Titre lieu — italique',
      fieldset: 'lieu',
    }),
    defineField({
      name: 'lieuLede',
      type: 'text',
      rows: 3,
      title: 'Lede lieu',
      fieldset: 'lieu',
    }),
    defineField({
      name: 'lieuList',
      type: 'array',
      title: 'Liste à puces',
      fieldset: 'lieu',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'mapEmbedUrl',
      type: 'url',
      title: 'URL d\'intégration Google Maps',
      description:
        'Sur maps.google.com → Partager → Intégrer une carte → copier l\'URL `src` de l\'iframe.',
      fieldset: 'lieu',
      validation: (r) =>
        r.required().uri({ scheme: ['https'] }).custom((url) => {
          if (!url) return true
          return url.includes('google.com/maps') || url.includes('maps.google')
            ? true
            : 'Doit être une URL Google Maps embed'
        }),
    }),
  ],
  preview: {
    select: { title: 'titleEmphasized', subtitle: 'eyebrow' },
    prepare: ({ title, subtitle }) => ({
      title: `Contact — ${title || '(sans titre)'}`,
      subtitle,
    }),
  },
})
