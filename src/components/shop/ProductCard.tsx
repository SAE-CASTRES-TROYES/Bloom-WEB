import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  price_public: number
  price_pro: number | null
  stock: number
  images: string[] | null
}

const eur = (n: number) =>
  n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

export default function ProductCard({ product, isRetailer = false }: { product: Product; isRetailer?: boolean }) {
  const t = useTranslations('shop')
  const inStock = product.stock > 0
  const image = product.images?.[0]
  const isPro = isRetailer && product.price_pro != null
  const displayPrice = isPro ? product.price_pro! : product.price_public

  return (
    <Link
      href={`/boutique/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-bloom-violet-light/20 flex flex-col"
    >
      <div className="relative aspect-square bg-bloom-cream overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-6xl">🃏</div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-bloom-black/50 flex items-center justify-center">
            <span className="font-title text-white text-sm bg-bloom-rose px-3 py-1 rounded-full">
              {t('out_of_stock')}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-title text-lg text-bloom-violet-dark group-hover:text-bloom-violet-medium transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-body text-sm text-bloom-gray-dark/80 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="flex items-baseline gap-2">
            <span className="font-title text-xl text-bloom-violet-dark">{eur(displayPrice)}</span>
            {isPro && (
              <>
                <span className="font-body text-sm text-bloom-gray-dark/50 line-through">{eur(product.price_public)}</span>
                <span className="font-body text-[10px] uppercase tracking-wide text-bloom-rose font-semibold">{t('pro_price_badge')}</span>
              </>
            )}
          </span>
          {inStock && (
            <span className="font-body text-xs text-bloom-green font-semibold bg-bloom-green-light px-3 py-1 rounded-full">
              En stock
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
