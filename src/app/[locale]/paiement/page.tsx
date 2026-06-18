'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useCartStore } from '@/lib/store/cart'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default function PaiementPage() {
  const t = useTranslations('checkout')
  const locale = useLocale()
  const { items, total } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, locale }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Erreur Stripe')
      window.location.href = data.url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erreur inconnue')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <p className="font-body text-bloom-violet-medium">Votre panier est vide.</p>
        <Link href="/boutique" className="font-body text-sm bg-bloom-violet-dark text-bloom-cream-light rounded-2xl px-6 py-3">
          Voir la boutique
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-title text-4xl text-bloom-violet-dark">{t('title')}</h1>
          <p className="font-body text-xs text-bloom-green bg-bloom-green-light inline-flex items-center gap-1 px-3 py-1 rounded-full w-fit">
            🔒 Mode test — aucun paiement réel ne sera débité
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-bloom-violet-light/20 shadow-sm overflow-hidden">
          <div className="px-5 py-3 bg-bloom-violet-pale border-b border-bloom-violet-light/20">
            <p className="font-title text-sm text-bloom-violet-dark">Récapitulatif</p>
          </div>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-3 border-b border-bloom-violet-light/10 last:border-0">
              <div className="w-12 h-12 rounded-xl bg-bloom-cream overflow-hidden shrink-0 relative">
                {item.image
                  ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                  : <div className="absolute inset-0 flex items-center justify-center text-xl">🃏</div>
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-medium text-bloom-black truncate">{item.name}</p>
                <p className="font-body text-xs text-bloom-violet-medium">× {item.quantity}</p>
              </div>
              <p className="font-title text-sm text-bloom-rose shrink-0">
                {(item.price * item.quantity).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
          ))}
          <div className="px-5 py-4 flex justify-between items-center bg-bloom-cream/40">
            <span className="font-title text-base text-bloom-gray-dark">Total</span>
            <span className="font-title text-2xl text-bloom-violet-dark">
              {total().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
        </div>

        <div className="bg-bloom-blue-pale rounded-2xl p-4 text-sm font-body text-bloom-gray-dark border border-bloom-blue/20">
          <p className="font-semibold mb-1">💳 Carte de test Stripe</p>
          <p>Numéro : <code className="bg-white px-1 rounded">4242 4242 4242 4242</code></p>
          <p>Date : n&apos;importe quelle date future · CVC : n&apos;importe quel code à 3 chiffres</p>
        </div>

        {error && <p className="text-sm text-bloom-rose">{error}</p>}

        <button
          onClick={handleCheckout}
          disabled={loading || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_')}
          className="w-full bg-bloom-gold text-bloom-black rounded-2xl px-6 py-4 font-semibold text-base hover:bg-bloom-gold-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-bloom-black/30 border-t-bloom-black animate-spin" />
              Redirection vers Stripe...
            </>
          ) : (
            'Payer avec Stripe (test)'
          )}
        </button>

        <Link href="/panier" className="self-center font-body text-sm text-bloom-violet-medium hover:text-bloom-rose transition-colors">
          ← Modifier le panier
        </Link>
      </div>
    </main>
  )
}
