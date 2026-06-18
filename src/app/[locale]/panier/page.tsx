'use client'

import { useTranslations } from 'next-intl'
import { btn } from '@/lib/ui'
import { useCartStore } from '@/lib/store/cart'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default function PanierPage() {
  const t = useTranslations('cart')
  const { items, removeItem, updateQuantity, total } = useCartStore()

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-5xl">🛒</p>
        <h1 className="font-title text-3xl text-bloom-violet-dark">{t('title')}</h1>
        <p className="font-body text-bloom-violet-medium">{t('empty')}</p>
        <Link
          href="/boutique"
          className="font-body text-sm bg-bloom-violet-dark text-bloom-cream-light rounded-2xl px-6 py-3 hover:bg-bloom-violet-medium transition-colors"
        >
          Voir la boutique
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h1 className="font-title text-4xl text-bloom-violet-dark">{t('title')}</h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-bloom-violet-light/20 shadow-sm"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-bloom-cream shrink-0">
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-2xl">🃏</div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-title text-sm text-bloom-violet-dark truncate">{item.name}</p>
                <p className="font-body text-sm text-bloom-rose font-semibold">
                  {item.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full border border-bloom-violet-light flex items-center justify-center text-bloom-violet-dark hover:bg-bloom-violet-pale transition-colors"
                >
                  −
                </button>
                <span className="font-body text-sm w-5 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full border border-bloom-violet-light flex items-center justify-center text-bloom-violet-dark hover:bg-bloom-violet-pale transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-bloom-violet-light hover:text-bloom-rose transition-colors text-xs"
                aria-label={t('remove')}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="font-title text-lg text-bloom-gray-dark">{t('total')}</span>
            <span className="font-title text-2xl text-bloom-violet-dark">
              {total().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
          <Link
            href="/paiement"
            className={`${btn('primary', 'lg')} w-full`}
          >
            {t('checkout')}
          </Link>
        </div>
      </div>
    </main>
  )
}
