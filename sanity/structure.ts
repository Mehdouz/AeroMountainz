import type { StructureResolver } from 'sanity/structure'
import { LANGUAGES } from './lib/i18n'
import { apiVersion } from './env'

/**
 * Desk personnalisé :
 *   • Pages (par langue, filtrées via le champ `language` du plugin i18n)
 *   • Blog (Posts par langue + Catégories par langue + Auteurs)
 *   • Contenus réutilisables (par langue) : Pilote, Formules, Avis, FAQ, Étapes, Stats, Galerie
 *   • Paramètres (par langue) : siteSettings
 *
 * Le plugin @sanity/document-internationalization ajoute un champ `language` à chaque type listé
 * dans TRANSLATABLE_TYPES. On filtre les listes par cette valeur.
 */
export const structure: StructureResolver = (S) => {
  const localizedDocList = (typeName: string, title: string) =>
    S.listItem()
      .title(title)
      .child(
        S.list()
          .title(title)
          .items(
            LANGUAGES.map((lang) =>
              S.listItem()
                .title(lang.title)
                .child(
                  S.documentTypeList(typeName)
                    .title(`${title} — ${lang.title}`)
                    .apiVersion(apiVersion)
                    .filter('_type == $type && language == $lang')
                    .params({ type: typeName, lang: lang.id }),
                ),
            ),
          ),
      )

  const localizedSingleton = (typeName: string, title: string) =>
    S.listItem()
      .title(title)
      .child(
        S.list()
          .title(title)
          .items(
            LANGUAGES.map((lang) =>
              S.listItem()
                .title(lang.title)
                .child(
                  S.document()
                    .schemaType(typeName)
                    .documentId(`${typeName}-${lang.id}`)
                    .title(`${title} — ${lang.title}`),
                ),
            ),
          ),
      )

  return S.list()
    .title('Contenu')
    .items([
      // ==== Pages ====
      localizedDocList('page', 'Pages'),
      localizedSingleton('bonCadeauPage', 'Page Bon Cadeau'),

      S.divider(),

      // ==== Blog ====
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Articles')
                .child(
                  S.list()
                    .title('Articles')
                    .items(
                      LANGUAGES.map((lang) =>
                        S.listItem()
                          .title(lang.title)
                          .child(
                            S.documentTypeList('post')
                              .title(`Articles — ${lang.title}`)
                              .apiVersion(apiVersion)
                              .filter('_type == $type && language == $lang')
                              .params({ type: 'post', lang: lang.id }),
                          ),
                      ),
                    ),
                ),
              S.listItem()
                .title('Catégories')
                .child(
                  S.list()
                    .title('Catégories')
                    .items(
                      LANGUAGES.map((lang) =>
                        S.listItem()
                          .title(lang.title)
                          .child(
                            S.documentTypeList('category')
                              .title(`Catégories — ${lang.title}`)
                              .apiVersion(apiVersion)
                              .filter('_type == $type && language == $lang')
                              .params({ type: 'category', lang: lang.id }),
                          ),
                      ),
                    ),
                ),
              S.documentTypeListItem('author').title('Auteurs'),
            ]),
        ),

      S.divider(),

      // ==== Contenus réutilisables ====
      S.listItem()
        .title('Contenus réutilisables')
        .child(
          S.list()
            .title('Contenus réutilisables')
            .items([
              localizedSingleton('pilot', 'Pilote'),
              localizedDocList('formula', 'Formules'),
              localizedDocList('review', 'Avis'),
              localizedDocList('faq', 'FAQ'),
              localizedDocList('journeyStep', 'Étapes du déroulé'),
              localizedDocList('stat', 'Stats'),
              localizedDocList('galleryItem', 'Images de galerie'),
            ]),
        ),

      S.divider(),

      // ==== Paramètres ====
      localizedSingleton('siteSettings', 'Paramètres du site'),
    ])
}
