'use client'

import { useTranslations } from 'next-intl'
import { btn } from '@/lib/ui'
import { useCartStore } from '@/lib/store/cart'

type Product = {
  id: string
  slug: string
  name: string
  price_public: number
  price_pro: number | null
  images: string[] | null
}

export default function AddToCartButton({ product, isRetailer = false }: { product: Product; isRetailer?: boolean }) {
  const t = useTranslations('shop')
  const addItem = useCartStore((s) => s.addItem)
  // Revendeur connecté → tarif pro ; sinon tarif public.
  const price = isRetailer && product.price_pro != null ? product.price_pro : product.price_public

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price,
          image: product.images?.[0] ?? null,
          quantity: 1,
        })
      }
      className={`${btn('primary', 'lg')} w-full`}
    >
      {t('add_to_cart')}
    </button>
  )
}
