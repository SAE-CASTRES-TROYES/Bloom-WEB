import { Package, FileText, BadgeEuro, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { btn } from '@/lib/ui'

type Product = {
  id: string
  name: string
  price_public: number
  price_pro: number | null
}

const eur = (n: number) =>
  n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

export default function B2BSection({ products }: { products: Product[] }) {
  const t = useTranslations('shop.b2b')
  const actions = [
    { Icon: FileText, label: t('kit'),     desc: t('kit_desc'),     href: 'mailto:bonjour@bloom-jeu.fr?subject=Demande%20du%20kit%20de%20vente%20Bloom' },
    { Icon: BadgeEuro, label: t('prices'),  desc: t('prices_desc'),  href: '#tarifs-pro' },
    { Icon: Package,   label: t('catalog'), desc: t('catalog_desc'), href: '#catalogue' },
  ]

  return (
    <section id="b2b" className="border-t border-bloom-violet-light pt-12 flex flex-col gap-8 scroll-mt-24">
      <div className="flex flex-col gap-2">
        <span className="font-accent text-bloom-rose text-lg">{t('eyebrow')}</span>
        <h2 className="font-title text-3xl text-bloom-violet-dark">{t('title')}</h2>
        <p className="font-body text-bloom-violet-medium max-w-lg">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map(({ Icon, label, desc, href }) => (
          <a
            key={label}
            href={href}
            className="bg-bloom-violet-pale rounded-2xl p-6 flex flex-col gap-3 hover:bg-bloom-violet-light/50 transition-colors"
          >
            <span className="w-11 h-11 rounded-xl bg-bloom-violet-dark text-white flex items-center justify-center">
              <Icon size={20} />
            </span>
            <span className="font-title text-base text-bloom-violet-dark">{label}</span>
            <span className="font-body text-sm text-bloom-gray-dark/65">{desc}</span>
          </a>
        ))}
      </div>

      {/* Tarifs professionnels (vraies données) */}
      <div id="tarifs-pro" className="flex flex-col gap-4 scroll-mt-24">
        <h3 className="font-title text-xl text-bloom-violet-dark">{t('tarifs_title')}</h3>
        {products.length > 0 ? (
          <div className="rounded-2xl border border-bloom-violet-light/40 overflow-hidden bg-white">
            <div className="grid grid-cols-[1fr_6rem_6rem] gap-2 px-5 py-3 bg-bloom-violet-pale text-bloom-violet-dark text-xs font-semibold uppercase tracking-wide">
              <span>{t('col_product')}</span>
              <span className="text-right">{t('col_public')}</span>
              <span className="text-right">{t('col_pro')}</span>
            </div>
            {products.map((p) => (
              <div key={p.id} className="grid grid-cols-[1fr_6rem_6rem] gap-2 px-5 py-3 items-center border-b border-bloom-violet-light/15 last:border-0">
                <span className="font-body text-sm text-bloom-black truncate">{p.name}</span>
                <span className="font-body text-sm text-bloom-gray-dark/60 text-right line-through">{eur(p.price_public)}</span>
                <span className="font-title text-sm text-bloom-rose font-semibold text-right">
                  {p.price_pro != null ? eur(p.price_pro) : '—'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-sm text-bloom-violet-medium">{t('catalog_empty')}</p>
        )}
      </div>

      {/* Précommande : revendeur connecté → catalogue B2B */}
      <div className="flex flex-wrap items-center gap-3">
        <a href="#catalogue" className={btn('primary', 'lg')}>
          <Send size={18} /> {t('preorder')}
        </a>
        <span className="font-body text-sm text-bloom-violet-medium">
          {t('preorder_hint')}
        </span>
      </div>
    </section>
  )
}
