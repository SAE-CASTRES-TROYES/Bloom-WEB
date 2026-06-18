/**
 * Tokens de classe partagés pour garder une cohérence visuelle.
 * Boutons : même typo (Karla semibold), même rayon (rounded-full), même
 * transition ; seules les couleurs changent selon la variante.
 * Badges d'icône : même rayon (rounded-xl) et même structure ; le fond varie
 * selon le contexte (passé via la prop).
 */

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold ' +
  'transition-colors duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

export const btnSize = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
} as const

export const btnVariant = {
  // Action principale (rose) — un seul accent fort par écran.
  primary: 'bg-bloom-rose text-white shadow-lg shadow-bloom-rose/25 hover:bg-bloom-rose-dark',
  // Action secondaire pleine (violet).
  violet: 'bg-bloom-violet-dark text-white hover:bg-bloom-violet-medium',
  // Action douce (violet clair) — inscription, accents légers.
  soft: 'bg-bloom-violet-light text-bloom-violet-dark hover:bg-bloom-violet-medium hover:text-white',
  // Action tertiaire (contour).
  outline:
    'border-2 border-bloom-violet-light text-bloom-violet-dark hover:bg-bloom-violet-pale hover:border-bloom-violet-medium',
} as const

export function btn(
  variant: keyof typeof btnVariant = 'primary',
  size: keyof typeof btnSize = 'md',
) {
  return `${btnBase} ${btnSize[size]} ${btnVariant[variant]}`
}

/**
 * Badge d'icône : rayon et structure unifiés partout, fond à fournir.
 * Ex. : `${iconBadge} w-10 h-10 bg-bloom-black/30 ...`
 */
export const iconBadge =
  'rounded-xl border flex items-center justify-center shrink-0 transition-colors'
