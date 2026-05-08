/**
 * Diagnostic i18n du dataset Sanity (lecture seule).
 *
 * Détecte :
 *  - documents traduisibles orphelins (non référencés par un translation.metadata)
 *  - désaccords entre `_key` (langue déclarée dans la métadonnée) et `language`
 *    du document référencé
 *  - documents sans champ `language`
 *  - doublons (même `slug` + même `language`)
 *  - références cassées dans translation.metadata
 *
 * Usage : `npx tsx scripts/diagnose-i18n.ts`
 *   Nécessite SANITY_API_READ_TOKEN (ou SANITY_API_WRITE_TOKEN à défaut).
 *
 * Aucune mutation : 100 % lecture seule.
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { join } from 'node:path'

loadEnv({ path: join(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_READ_TOKEN ?? process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
}
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN (or SANITY_API_WRITE_TOKEN)')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  token,
  useCdn: false,
  perspective: 'drafts',
})

const TRANSLATABLE_TYPES = [
  'siteSettings',
  'page',
  'post',
  'category',
  'pilot',
  'formula',
  'faq',
  'review',
  'journeyStep',
  'stat',
  'galleryItem',
] as const

interface DocSnapshot {
  _id: string
  _type: string
  language: string | null
  slug: string | null
  updatedAt: string
}

interface MetaSnapshot {
  _id: string
  schemaTypes: string[] | null
  translations: Array<{
    _key: string
    id: string | null
    lang: string | null
    type: string | null
    slug: string | null
  }>
}

const stableId = (id: string) => (id.startsWith('drafts.') ? id.slice('drafts.'.length) : id)

async function main() {
  console.log(`▶ Diagnostic i18n (project: ${projectId}, dataset: ${dataset})`)
  console.log()

  const docsByType: Record<string, DocSnapshot[]> = {}
  for (const type of TRANSLATABLE_TYPES) {
    docsByType[type] = await client.fetch<DocSnapshot[]>(
      `*[_type == $type]{
        _id,
        _type,
        language,
        "slug": slug.current,
        "updatedAt": _updatedAt
      } | order(slug asc, language asc)`,
      { type },
    )
  }

  const metas = await client.fetch<MetaSnapshot[]>(
    `*[_type == "translation.metadata"]{
      _id,
      schemaTypes,
      "translations": translations[]{
        _key,
        "id": value._ref,
        "lang": value->language,
        "type": value->_type,
        "slug": value->slug.current
      }
    }`,
  )

  const referencedIds = new Set<string>()
  for (const m of metas) {
    for (const t of m.translations) {
      if (t.id) referencedIds.add(t.id)
    }
  }

  console.log('─── Inventaire par type ───')
  let totalOrphans = 0
  let totalMissingLang = 0
  let totalDuplicates = 0

  for (const type of TRANSLATABLE_TYPES) {
    const docs = docsByType[type]
    const orphans = docs?.filter((d) => !referencedIds.has(stableId(d._id))) ?? []
    const missingLang = docs?.filter((d) => !d.language) ?? []

    const byKey = new Map<string, DocSnapshot[]>()
    for (const d of docs ?? []) {
      if (!d.slug || !d.language) continue
      const k = `${d.slug}|${d.language}`
      const arr = byKey.get(k) ?? []
      arr.push(d)
      byKey.set(k, arr)
    }
    const duplicates = [...byKey.entries()].filter(([, ds]) => ds.length > 1)

    totalOrphans += orphans.length
    totalMissingLang += missingLang.length
    totalDuplicates += duplicates.length

    console.log(
      `  ${type}: ${docs?.length ?? 0} doc(s) | ${orphans.length} orphelin(s) | ${missingLang.length} sans 'language' | ${duplicates.length} doublon(s)`,
    )
    for (const d of orphans) {
      console.log(`    [orphan]  ${d._id}  lang=${d.language ?? 'null'}  slug=${d.slug ?? '∅'}`)
    }
    for (const d of missingLang) {
      console.log(`    [no-lang] ${d._id}  slug=${d.slug ?? '∅'}`)
    }
    for (const [k, ds] of duplicates) {
      console.log(`    [dup ${k}]  ${ds.map((d) => d._id).join(', ')}`)
    }
  }

  console.log()
  console.log('─── translation.metadata ───')
  console.log(`  total: ${metas.length}`)

  let mismatches = 0
  let brokenRefs = 0
  for (const m of metas ?? []) {
    for (const t of m.translations) {
      if (!t.id) continue
      if (t.lang === null && t.type === null) {
        brokenRefs++
        console.log(`  [broken-ref]   meta=${m._id}  key=${t._key}  →  id=${t.id} (introuvable)`)
        continue
      }
      if (t.lang !== t._key) {
        mismatches++
        console.log(
          `  [lang-mismatch] meta=${m._id}  key='${t._key}'  doc=${t.id}  doc.language='${t.lang ?? 'null'}'`,
        )
      }
    }
  }

  console.log(`  ${mismatches} désaccord(s) _key↔language, ${brokenRefs} référence(s) cassée(s)`)

  console.log()
  console.log('─── Résumé ───')
  console.log(`  Orphelins:      ${totalOrphans}`)
  console.log(`  Sans language:  ${totalMissingLang}`)
  console.log(`  Doublons:       ${totalDuplicates}`)
  console.log(`  Mismatchs lang: ${mismatches}`)
  console.log(`  Refs cassées:   ${brokenRefs}`)
  console.log()

  const totalIssues = totalOrphans + totalMissingLang + totalDuplicates + mismatches + brokenRefs
  if (totalIssues === 0) {
    console.log('✓ Aucune incohérence détectée.')
  } else {
    console.log(`⚠ ${totalIssues} incohérence(s) à examiner.`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
