/**
 * Réparation i18n du dataset Sanity.
 *
 * Décisions de l'utilisateur (cf. plan) :
 *  - garder `siteSettings-fr`, supprimer `siteSettings.fr` (ancien format avec point)
 *  - garder `siteSettings-en` (patch `language='en'`), supprimer `390f5052…` (UUID)
 *  - supprimer `e0e7c656…` (page EN orpheline, slug 'confidential-policies')
 *  - supprimer `c24cd229…` (formula sans langue ni slug, déchet)
 *  - supprimer `d4983bd1…` (translation.metadata cassée : `_key` non-conformes)
 *
 * Ensuite, création des `translation.metadata` propres :
 *   - bi-langue FR+EN pour `siteSettings` (seul cas qui a les deux après nettoyage)
 *   - mono-langue FR pour tout le reste — le panneau Translations affichera
 *     "Create English translation" comme attendu.
 *
 * Le script utilise `createOrReplace` avec des IDs déterministes (`meta-<frDocId>`)
 * pour être idempotent : on peut le relancer sans créer de doublons.
 *
 * Usage :
 *   npx tsx scripts/fix-i18n.ts            # dry-run (défaut)
 *   npx tsx scripts/fix-i18n.ts --apply    # applique les écritures
 *
 * Nécessite SANITY_API_WRITE_TOKEN.
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { join } from 'node:path'

loadEnv({ path: join(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN',
  )
}

const APPLY = process.argv.includes('--apply')

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  token,
  useCdn: false,
  perspective: 'raw',
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

const IDS_TO_DELETE = [
  'siteSettings.fr',
  '390f5052-b066-456a-889d-7e31f5554b93',
  'e0e7c656-33c2-4995-b6ed-41fd460e2797',
  'c24cd229-4688-4ce6-91d3-cc512d5ce002',
  'd4983bd1-c155-442a-9e33-daecd861c879',
] as const

const PATCHES: Array<{ id: string; set: Record<string, unknown> }> = [
  { id: 'siteSettings-en', set: { language: 'en' } },
]

interface DocSnapshot {
  _id: string
  _type: string
  language: string | null
}

const stableId = (id: string) => (id.startsWith('drafts.') ? id.slice('drafts.'.length) : id)

function buildMetadataDoc(
  type: string,
  entries: Array<{ lang: string; ref: string }>,
  metaId: string,
) {
  return {
    _id: metaId,
    _type: 'translation.metadata',
    schemaTypes: [type],
    translations: entries.map((e) => ({
      _key: e.lang,
      _type: 'internationalizedArrayReferenceValue',
      language: e.lang,
      value: {
        _type: 'reference',
        _ref: e.ref,
        _weak: true,
        _strengthenOnPublish: { type },
      },
    })),
  }
}

async function main() {
  console.log(
    `▶ Réparation i18n  project=${projectId}  dataset=${dataset}  mode=${APPLY ? 'APPLY' : 'DRY-RUN'}`,
  )
  console.log()

  // ── Étape 1 : suppressions ──────────────────────────────────────────────
  console.log('─── 1. Suppressions ───')
  for (const id of IDS_TO_DELETE) {
    console.log(`  - delete ${id} (et son draft éventuel)`)
  }
  if (APPLY) {
    const tx = client.transaction()
    for (const id of IDS_TO_DELETE) {
      tx.delete(id)
      tx.delete(`drafts.${id}`)
    }
    await tx.commit({ visibility: 'async' })
    console.log(`  ✓ ${IDS_TO_DELETE.length} doc(s) supprimé(s) (+ drafts associés)`)
  }
  console.log()

  // ── Étape 2 : patches `language` ────────────────────────────────────────
  console.log('─── 2. Patches `language` ───')
  for (const p of PATCHES) {
    console.log(`  - patch ${p.id} → ${JSON.stringify(p.set)}`)
  }
  if (APPLY) {
    for (const p of PATCHES) {
      // Patch published + draft (l'un des deux peut ne pas exister, on ignore l'erreur)
      for (const id of [p.id, `drafts.${p.id}`]) {
        try {
          await client.patch(id).set(p.set).commit()
        } catch {
          // ignore : le doc n'existe peut-être pas dans cet état
        }
      }
    }
    console.log(`  ✓ ${PATCHES.length} patch(es) appliqué(s)`)
  }
  console.log()

  // ── Étape 3 : (re)création des translation.metadata ─────────────────────
  console.log('─── 3. Création des translation.metadata ───')

  // Recharger l'inventaire SANS les ids à supprimer.
  const allDocs: DocSnapshot[] = []
  for (const type of TRANSLATABLE_TYPES) {
    const docs = await client.fetch<DocSnapshot[]>(
      `*[_type == $type]{ _id, _type, language }`,
      { type },
    )
    allDocs.push(...docs)
  }

  // En dry-run, simuler les suppressions et patches en mémoire.
  const survivors = allDocs.filter((d) => !IDS_TO_DELETE.includes(stableId(d._id) as never))
  for (const p of PATCHES) {
    for (const d of survivors) {
      if (stableId(d._id) === p.id && 'language' in p.set) {
        d.language = p.set.language as string
      }
    }
  }

  // Dédupliquer published vs drafts en gardant l'entrée la plus "stable"
  // (perspective:'raw' nous donne les deux ; on bosse sur l'_id stable).
  const byStableId = new Map<string, DocSnapshot>()
  for (const d of survivors) {
    const sid = stableId(d._id)
    const existing = byStableId.get(sid)
    if (!existing || existing._id.startsWith('drafts.')) {
      byStableId.set(sid, { ...d, _id: sid })
    }
  }
  const uniqueDocs = [...byStableId.values()]

  // Pour chaque doc FR, chercher un sibling EN (ou inverse) du MÊME type,
  // l'apparier, puis créer la métadonnée.
  const seen = new Set<string>()
  const metas: Array<{ _id: string; doc: ReturnType<typeof buildMetadataDoc> }> = []

  // Stratégie d'appariement :
  //  - siteSettings : 1 FR + 1 EN après cleanup → bi-langue.
  //  - autres types : pour l'instant uniquement FR → mono-langue.
  // Si on trouve plusieurs EN possibles pour un même type+slug FR, on logge un warn.

  // Anchor sur les docs FR (puisque c'est notre langue par défaut).
  const frDocs = uniqueDocs.filter((d) => d.language === 'fr').sort((a, b) => a._id.localeCompare(b._id))
  const enDocs = uniqueDocs.filter((d) => d.language === 'en')

  for (const fr of frDocs) {
    if (seen.has(fr._id)) continue

    // Pour siteSettings (singleton par langue), on apparie naïvement le seul EN du même type.
    const candidates = enDocs.filter((e) => e._type === fr._type && !seen.has(e._id))
    let pair: DocSnapshot | undefined
    if (fr._type === 'siteSettings' && candidates.length === 1) {
      pair = candidates[0]
    } else if (fr._type === 'siteSettings' && candidates.length > 1) {
      console.warn(
        `  ⚠ ${candidates.length} candidats EN pour siteSettings FR=${fr._id} — appariement ambigu, on prend le premier (`+candidates[0]._id+`)`,
      )
      pair = candidates[0]
    }
    // Pour les autres types : pas d'appariement automatique, mono-langue FR.

    const entries: Array<{ lang: string; ref: string }> = [{ lang: 'fr', ref: fr._id }]
    if (pair) {
      entries.push({ lang: 'en', ref: pair._id })
      seen.add(pair._id)
    }

    const metaId = `meta-${fr._id}`
    metas.push({
      _id: metaId,
      doc: buildMetadataDoc(fr._type, entries, metaId),
    })
    seen.add(fr._id)
  }

  // Docs EN restants (non appariés à un FR) : créer une méta mono-langue EN.
  for (const en of enDocs) {
    if (seen.has(en._id)) continue
    const metaId = `meta-${en._id}`
    metas.push({
      _id: metaId,
      doc: buildMetadataDoc(en._type, [{ lang: 'en', ref: en._id }], metaId),
    })
    seen.add(en._id)
  }

  for (const m of metas) {
    const langs = (m.doc.translations as Array<{ language: string; value: { _ref: string } }>)
      .map((t) => `${t.language}→${t.value._ref}`)
      .join(', ')
    console.log(`  - createOrReplace ${m._id}  type=${m.doc.schemaTypes[0]}  [${langs}]`)
  }
  console.log(`  → ${metas.length} méta(s) à créer`)

  if (APPLY) {
    // Commit en chunks de 50 pour rester sous la limite de transaction.
    const chunkSize = 50
    for (let i = 0; i < metas.length; i += chunkSize) {
      const tx = client.transaction()
      for (const m of metas.slice(i, i + chunkSize)) {
        tx.createOrReplace(m.doc as never)
      }
      await tx.commit({ visibility: 'async' })
    }
    console.log(`  ✓ ${metas.length} méta(s) créée(s)`)
  }

  console.log()
  if (!APPLY) {
    console.log('ℹ Dry-run terminé. Relance avec `--apply` pour effectuer les écritures.')
  } else {
    console.log('✓ Réparation terminée. Relance `npx tsx scripts/diagnose-i18n.ts` pour vérifier.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
