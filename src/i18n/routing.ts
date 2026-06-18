import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  // Toujours servir le FR par défaut, sans rediriger selon la langue du navigateur.
  localeDetection: false,
})
