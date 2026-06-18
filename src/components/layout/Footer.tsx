import Image from 'next/image'
import { Link } from '@/i18n/navigation'

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
