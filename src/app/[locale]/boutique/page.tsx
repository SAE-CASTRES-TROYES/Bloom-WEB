import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/components/shop/ProductCard'
import B2BSection from '@/components/shop/B2BSection'

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

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <span className="font-accent text-bloom-rose text-lg italic">Commander</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>

        {/* Public catalog */}
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

        {/* B2B section — only for retailers */}
        {isRetailer && <B2BSection />}
      </div>
    </main>
  )
}
