/**
 * Layout du Studio Sanity embarqué.
 * Exporte `metadata` et `viewport` (côté serveur) que la page client ne peut pas exporter.
 */
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
