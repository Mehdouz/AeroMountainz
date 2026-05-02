'use client'

/**
 * Studio Sanity embarqué — accessible à /studio.
 * Doc: https://www.sanity.io/docs/installation/sanity-studio
 */
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
