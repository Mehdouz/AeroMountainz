import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { documentInternationalization } from '@sanity/document-internationalization'

import { apiVersion, dataset, projectId, siteUrl } from './sanity/env'
import { LANGUAGES, TRANSLATABLE_TYPES } from './sanity/lib/i18n'
import { schemaTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'aero-mountains',
  title: 'Aero Mountains',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((template) => !TRANSLATABLE_TYPES.includes(template.templateId as never)),
  },
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: [...LANGUAGES],
      schemaTypes: [...TRANSLATABLE_TYPES],
    }),
    presentationTool({
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
