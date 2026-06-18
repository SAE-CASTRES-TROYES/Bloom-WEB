import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { iconBadge } from '@/lib/ui'

const columns = [
  {
    title: 'LE JEU',
    links: [
      { label: 'Univers', href: '/#univers' },
      { label: 'Règles', href: '/#regles' },
      { label: 'Rôles', href: '/#regles' },
    ],
  },
  {
    title: 'COMMUNAUTÉ',
    links: [
      { label: 'Actualités', href: '/actualites' },
      { label: 'Classement', href: '/#classement' },
      { label: 'Compte joueur', href: '/compte' },
    ],
  },
  {
    title: 'BOUTIQUE',
    links: [
      { label: 'Catalogue', href: '/boutique' },
      { label: 'Espace revendeurs', href: '/boutique#b2b' },
      { label: 'Précommande', href: '/boutique' },
      { label: 'Trouver une boutique', href: '/trouver-une-boutique' },
    ],
  },
]

const socials = [
  { label: 'YouTube', href: '#', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  )},
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bloom-gray-dark text-bloom-cream-light">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-5">
            <Image
              src="/brand/wordmark.png"
              alt="Bloom"
              width={1000}
              height={309}
              className="w-[150px] h-auto"
            />
            <div className="flex gap-3">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label}
                  className={`${iconBadge} w-10 h-10 bg-bloom-black/30 border-bloom-violet-dark/40 text-bloom-violet-pale hover:text-bloom-gold hover:border-bloom-gold/50`}>
                  {icon}
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-bloom-violet-pale/50 leading-relaxed max-w-[200px]">
              Bloom, le Jardin des Merveilles. Un jeu doux, poétique et mystérieux pour 7 à 77 ans.
            </p>
          </div>

          {columns.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-4">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-bloom-violet-pale/60">
                {title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href as `/${string}`}
                      className="font-body text-sm text-bloom-violet-pale/70 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-bloom-violet-dark/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-bloom-violet-pale/40">
            © {year} Projet Bloom. Le Jardin des Merveilles. Tous droits réservés.
          </p>
          <div className="flex gap-5 flex-wrap justify-center sm:justify-end">
            <Link href="/mentions-legales" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              Confidentialité (RGPD)
            </Link>
            <a href="#" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
