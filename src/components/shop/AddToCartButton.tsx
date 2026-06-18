'use client'

import { useTranslations } from 'next-intl'
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
      className="w-full bg-bloom-violet-dark text-bloom-cream-light rounded-2xl px-6 py-4 font-semibold text-base hover:bg-bloom-violet-medium transition-colors"
    >
      {t('add_to_cart')}
    </button>
  )
}
