import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    locale: locale as Stripe.Checkout.SessionCreateParams.Locale,
    line_items: items.map((item) => ({
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          ...(item.image ? { images: [item.image] } : {}),
        },
      },
      quantity: item.quantity,
    })),
    success_url: `${origin}${localePrefix}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${localePrefix}/panier`,
    metadata: { test_mode: 'true' },
  })

  return NextResponse.json({ url: session.url })
}
