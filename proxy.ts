import { NextResponse, type NextRequest } from 'next/server'
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n'

/**
 * Force le préfixe de locale (`/fr/...` ou `/en/...`) sur toutes les routes du site.
 * Les routes /studio, /api, /_next, etc. sont exclues via `config.matcher`.
 *
 * Convention Next.js 16+ : exporter `proxy` depuis `proxy.ts` (renommé depuis `middleware.ts`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Si déjà préfixé par une locale supportée, on laisse passer.
  const hasLocale = LOCALES.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`),
  )
  if (hasLocale) return NextResponse.next()

  // Sinon on redirige vers la locale par défaut en préservant le path.
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Tous les paths sauf : studio, api, _next, fichiers statiques.
    '/((?!studio|api|_next/static|_next/image|favicon.ico|icon.svg|icon-light-32x32.png|icon-dark-32x32.png|apple-icon.png|images/|robots.txt|sitemap.xml).*)',
  ],
}
