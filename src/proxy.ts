import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Exclut api (routes serveur), _next, _vercel, jeu (proxy) et les fichiers (avec extension)
    '/((?!api|_next|_vercel|jeu|.*\\..*).*)',
  ],
}
