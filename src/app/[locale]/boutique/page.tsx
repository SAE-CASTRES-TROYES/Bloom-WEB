import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/shop/ProductCard'
import B2BSection from '@/components/shop/B2BSection'
import { Link } from '@/i18n/navigation'

export default async function BoutiquePage() {
  const t = await getTranslations('shop')
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: products, error: productsError }, { data: profile }] = await Promise.all([
    supabase
      .from('products')
      .select('id, slug, name, description, price_public, stock, images')
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
          <span className="font-accent text-bloom-rose text-lg italic">Commander</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>

        {safeProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-bloom-violet-light/20">
            <p className="text-5xl mb-4">🌱</p>
            <p className="font-body text-bloom-violet-medium">
              La boutique ouvre bientôt. Revenez vite !
            </p>
          </div>
        )}

        {isRetailer ? (
          <B2BSection />
        ) : (
          <section className="border-t border-bloom-violet-light pt-10 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-accent text-bloom-rose text-lg italic">Professionnels</span>
              <h2 className="font-title text-3xl text-bloom-violet-dark">Espace Revendeur B2B</h2>
              <p className="font-body text-bloom-violet-medium max-w-lg">
                Accédez au catalogue grossiste, aux tarifs pro et au kit de vente en créant un compte revendeur.
              </p>
            </div>

            {isLoggedIn ? (
              <div className="bg-bloom-gold/10 border border-bloom-gold/30 rounded-2xl p-6 flex items-start gap-4 max-w-lg">
                <span className="text-2xl shrink-0">ℹ️</span>
                <div>
                  <p className="font-title text-base text-bloom-black">Vous n&apos;êtes pas revendeur</p>
                  <p className="font-body text-sm text-bloom-gray-dark/70 mt-1">
                    Pour accéder à l&apos;espace B2B, créez un nouveau compte avec le statut <strong>Revendeur</strong>.
                  </p>
                  <Link href="/inscription" className="font-body text-sm text-bloom-rose hover:underline mt-2 inline-block">
                    Créer un compte revendeur →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/inscription"
                  className="font-body text-sm font-semibold bg-bloom-violet-dark text-white rounded-full px-6 py-3 hover:bg-bloom-violet-medium transition-colors"
                >
                  S&apos;inscrire comme revendeur
                </Link>
                <Link
                  href="/connexion"
                  className="font-body text-sm border border-bloom-violet-light text-bloom-violet-dark rounded-full px-6 py-3 hover:bg-bloom-violet-pale transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
