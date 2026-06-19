import { notFound, redirect } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import AddToCartButton from '@/components/shop/AddToCartButton'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const t = await getTranslations('shop')
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) notFound()

  // Tarif pro pour les revendeurs/admin connectés.
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('role').eq('id', user.id).single()
    : { data: null }
  const isRetailer = profile?.role === 'retailer' || profile?.role === 'admin'
  const isPro = isRetailer && product.price_pro != null
  const displayPrice = isPro ? product.price_pro : product.price_public
  const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/boutique"
          className="font-body text-sm text-bloom-violet-dark hover:text-bloom-rose transition-colors mb-8 inline-block"
        >
          ← Boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-bloom-cream">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-8xl">🃏</div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="font-title text-4xl text-bloom-violet-dark">{product.name}</h1>
              <span className="flex items-baseline gap-3">
                <span className="font-title text-3xl text-bloom-rose">{eur(displayPrice)}</span>
                {isPro && (
                  <>
                    <span className="font-body text-lg text-bloom-gray-dark/50 line-through">{eur(product.price_public)}</span>
                    <span className="font-body text-xs uppercase tracking-wide text-bloom-rose font-semibold bg-bloom-rose-light/40 px-2 py-0.5 rounded-full">{t('pro_price_badge')}</span>
                  </>
                )}
              </span>
            </div>

            {product.description && (
              <p className="font-body text-bloom-gray-dark text-base leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-auto">
              {product.stock > 0 ? (
                <AddToCartButton product={product} isRetailer={isRetailer} />
              ) : (
                <p className="font-body text-bloom-rose font-semibold">{t('out_of_stock')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
