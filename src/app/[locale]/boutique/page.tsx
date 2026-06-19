import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/shop/ProductCard'
import B2BSection from '@/components/shop/B2BSection'
import { Link } from '@/i18n/navigation'
import { btn } from '@/lib/ui'

export default async function BoutiquePage() {
  const t = await getTranslations('shop')
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: products, error: productsError }, { data: profile }] = await Promise.all([
    supabase
      .from('products')
      .select('id, slug, name, description, price_public, price_pro, stock, images')
      .order('created_at', { ascending: false }),
    user
      ? supabase.from('profiles').select('role').eq('id', user.id).single()
      : Promise.resolve({ data: null, error: null }),
  ])

  const safeProducts = productsError ? [] : (products ?? [])
  const isRetailer = profile?.role === 'retailer' || profile?.role === 'admin'
  const isLoggedIn = !!user

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <span className="font-accent text-bloom-rose text-lg">{t('eyebrow')}</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>

        {safeProducts.length > 0 ? (
          <div id="catalogue" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 scroll-mt-24">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} isRetailer={isRetailer} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-bloom-violet-light/20">
            <p className="text-5xl mb-4">🌱</p>
            <p className="font-body text-bloom-violet-medium">{t('empty')}</p>
          </div>
        )}

        {isRetailer ? (
          <B2BSection products={safeProducts} />
        ) : (
          <section className="border-t border-bloom-violet-light pt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-accent text-bloom-rose text-lg">{t('b2b.eyebrow')}</span>
              <h2 className="font-title text-3xl text-bloom-violet-dark">{t('teaser.title')}</h2>
              <p className="font-body text-bloom-violet-medium max-w-lg">{t('teaser.body')}</p>
            </div>

            {isLoggedIn ? (
              <div className="bg-bloom-gold/10 border border-bloom-gold/30 rounded-2xl p-6 flex items-start gap-4 max-w-lg">
                <span className="text-2xl shrink-0">ℹ️</span>
                <div>
                  <p className="font-title text-base text-bloom-black">{t('teaser.not_retailer_title')}</p>
                  <p className="font-body text-sm text-bloom-gray-dark/70 mt-1">{t('teaser.not_retailer_body')}</p>
                  <Link href="/inscription?role=retailer" className="font-body text-sm text-bloom-rose hover:underline mt-2 inline-block">
                    {t('teaser.create_account')}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {/* Précommande : non-revendeur → création d'un compte revendeur (rôle pré-sélectionné) */}
                <Link href="/inscription?role=retailer" className={btn('primary', 'md')}>
                  {t('teaser.preorder')}
                </Link>
                <Link href="/inscription?role=retailer" className={btn('violet', 'md')}>
                  {t('teaser.register')}
                </Link>
                <Link href="/connexion" className={btn('outline', 'md')}>
                  {t('teaser.login')}
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
