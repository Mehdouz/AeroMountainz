/**
 * Wipe complet du dataset Sanity (documents et drafts).
 * Les images uploadées (assets) restent dans la librairie mais deviennent orphelines
 * — Sanity peut les nettoyer ensuite depuis sanity.io/manage si besoin.
 *
 * Usage : `pnpm wipe` (nécessite SANITY_API_WRITE_TOKEN).
 */
import { config as loadEnv } from 'dotenv'
import { createClient } from '@sanity/client'
import { join } from 'node:path'

loadEnv({ path: join(process.cwd(), '.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
}
if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  token,
  useCdn: false,
})

async function wipe() {
  console.log(`▶ Wiping dataset (project: ${projectId}, dataset: ${dataset})`)

  // On ne supprime pas les documents système (sanity.* ou system.*)
  const allIds: string[] = await client.fetch(
    `*[!(_id in path("_.**")) && !(_type match "sanity.**")]._id`,
  )
  console.log(`  trouvé ${allIds.length} document(s)`)

  if (allIds.length === 0) {
    console.log('✓ rien à supprimer.')
    return
  }

  // delete par batch de 50 (limite raisonnable pour les transactions Sanity)
  const batchSize = 50
  for (let i = 0; i < allIds.length; i += batchSize) {
    const batch = allIds.slice(i, i + batchSize)
    let tx = client.transaction()
    for (const id of batch) tx = tx.delete(id)
    await tx.commit({ visibility: 'async' })
    console.log(`  supprimé ${Math.min(i + batchSize, allIds.length)}/${allIds.length}`)
  }
  console.log('✓ wipe terminé.')
}

wipe().catch((e) => {
  console.error('✗ wipe failed:', e)
  process.exit(1)
})
