'use client'

/**
 * Studio Sanity embarqué — accessible à /studio.
 * Chargé en client-only (ssr: false) car Sanity Studio dépend de window/document.
 * Doc: https://www.sanity.io/docs/installation/sanity-studio
 */
import dynamicImport from 'next/dynamic'
import config from '@/sanity.config'

const NextStudio = dynamicImport(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false },
)

export default function StudioPage() {
  return <NextStudio config={config} />
}
