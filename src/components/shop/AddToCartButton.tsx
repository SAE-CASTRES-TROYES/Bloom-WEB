'use client'

import { useTranslations } from 'next-intl'
import { btn } from '@/lib/ui'
import { useCartStore } from '@/lib/store/cart'

type Product = {
  id: string
  slug: string
  name: string
  price_public: number
  images: string[] | null
}

export default function AddToCartButton({ product }: { product: Product }) {
  const t = useTranslations('shop')
  const addItem = useCartStore((s) => s.addItem)

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price_public,
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
