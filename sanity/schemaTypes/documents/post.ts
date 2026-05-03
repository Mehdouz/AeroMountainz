import { defineType, defineField, defineArrayMember } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Article de blog',
  type: 'document',
  fieldsets: [
    { name: 'seoFieldset', title: 'SEO', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Titre',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      title: 'Extrait',
      description: 'Affiché sur la liste du blog et dans les meta SEO.',
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Image de couverture',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImageAlt',
      type: 'string',
      title: 'Alt de l\'image de couverture',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Date de publication',
      validation: (r) => r.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      title: 'Auteur',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Catégories',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Corps de l\'article',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
          ],
          lists: [
            { title: 'Puces', value: 'bullet' },
            { title: 'Numérotée', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (r) =>
                      r.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt' },
            { name: 'caption', type: 'string', title: 'Légende' },
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'SEO',
      fieldset: 'seoFieldset',
    }),
  ],
  orderings: [
    {
      title: 'Date de publication (récent → ancien)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
      language: 'language',
    },
    prepare: ({ title, author, media, publishedAt, language }) => ({
      title,
      subtitle: `${author || '?'} · ${publishedAt?.slice(0, 10) || '?'}${language ? ` · ${language.toUpperCase()}` : ''}`,
      media,
    }),
  },
})
