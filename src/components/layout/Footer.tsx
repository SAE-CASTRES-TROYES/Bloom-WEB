import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const year = new Date().getFullYear()

  const columns = [
    {
      title: t('col_game'),
      links: [
        { label: t('l_universe'), href: '/#univers' },
        { label: t('l_rules'), href: '/#regles' },
        { label: t('l_roles'), href: '/#regles' },
      ],
    },
    {
      title: t('col_community'),
      links: [
        { label: t('l_news'), href: '/actualites' },
        { label: t('l_leaderboard'), href: '/#classement' },
        { label: t('l_account'), href: '/compte' },
      ],
    },
    {
      title: t('col_shop'),
      links: [
        { label: t('l_catalog'), href: '/boutique' },
        { label: t('l_b2b'), href: '/boutique#b2b' },
        { label: t('l_preorder'), href: '/boutique' },
        { label: t('l_find'), href: '/trouver-une-boutique' },
      ],
    },
  ]

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
              {t('tagline')}
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
            {t('rights', { year })}
          </p>
          <div className="flex gap-5 flex-wrap justify-center sm:justify-end">
            <Link href="/mentions-legales" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              {t('legal')}
            </Link>
            <Link href="/politique-de-confidentialite" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              {t('privacy')}
            </Link>
            <a href="#" className="font-body text-xs text-bloom-violet-pale/40 hover:text-bloom-violet-pale transition-colors">
              {t('cgv')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
