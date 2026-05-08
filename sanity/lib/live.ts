import { cookies, draftMode } from 'next/headers'
import {
  defineLive,
  resolvePerspectiveFromCookies,
  type LivePerspective,
} from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})

export interface DynamicFetchOptions {
  perspective: LivePerspective
  stega: boolean
  isDraftMode: boolean
}

export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode()
  if (!isDraftMode) {
    return { perspective: 'published', stega: false, isDraftMode }
  }
  const jar = await cookies()
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar })
  return { perspective: perspective ?? 'drafts', stega: true, isDraftMode }
}
