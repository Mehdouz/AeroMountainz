'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

/**
 * Met à jour <html lang="..."> côté client en fonction de la locale active.
 * Le root layout reste hardcodé en `lang="fr"` (Next.js exige le tag html dans le root layout
 * et ne permet pas de le rendre dynamiquement en fonction d'une route enfant).
 */
export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
