import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const schema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string().nullable().optional(),
  })),
  locale: z.enum(['fr', 'en', 'es']).default('fr'),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { items, locale } = parsed.data
  const origin = req.headers.get('origin') ?? 'http://localhost:3000'
  const localePrefix = locale === 'fr' ? '' : `/${locale}`

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Paiement indisponible : STRIPE_SECRET_KEY manquante côté serveur.' },
      { status: 500 },
    )
  }

  try {
    const stripe = new Stripe(secretKey, {
      apiVersion: '2026-05-27.dahlia',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
      line_items: items.map((item) => {
        // Stripe exige des URLs d'image ABSOLUES. On préfixe l'origine aux
        // chemins relatifs (ex. /cards/x.webp) sinon Stripe répond "Not a valid URL".
        const imageUrl =
          item.image && item.image.trim()
            ? (/^https?:\/\//.test(item.image) ? item.image : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`)
            : null
        return {
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(item.price * 100),
            product_data: {
              name: item.name,
              ...(imageUrl ? { images: [imageUrl] } : {}),
            },
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${origin}${localePrefix}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${localePrefix}/panier`,
      metadata: { test_mode: 'true' },
    })

    return NextResponse.json({ url: session.url })
  } catch (e) {
    // On renvoie toujours du JSON pour éviter le « Unexpected end of JSON input » côté client.
    const message = e instanceof Error ? e.message : 'Erreur Stripe inconnue'
    console.error('[create-checkout-session]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
