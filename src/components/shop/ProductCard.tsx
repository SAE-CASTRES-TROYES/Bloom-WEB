import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  price_public: number
  stock: number
  images: string[] | null
}

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('shop')
  const inStock = product.stock > 0
  const image = product.images?.[0]

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
          <span className="font-title text-xl text-bloom-violet-dark">
            {product.price_public.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
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
