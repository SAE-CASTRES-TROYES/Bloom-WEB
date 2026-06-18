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

const socials = [
  { label: 'Instagram', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  )},
  { label: 'TikTok', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.27 8.27 0 004.84 1.56V6.78a4.87 4.87 0 01-1.07-.09z"/></svg>
  )},
  { label: 'Twitter/X', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  )},
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bloom-black text-bloom-cream-light">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Image src="/logo.svg" alt="Bloom" width={36} height={36} className="brightness-0 invert opacity-90" />
              <span className="font-title text-xl text-white">Bloom</span>
            </div>
            <div className="flex gap-3">
              {socials.map(({ label, icon }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-8 h-8 rounded-full bg-bloom-gray-dark border border-bloom-violet-dark/40 flex items-center justify-center text-bloom-violet-pale hover:text-bloom-gold hover:border-bloom-gold/40 transition-colors">
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
