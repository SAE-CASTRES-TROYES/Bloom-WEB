import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  const { email } = parsed.data
  const supabase = await createClient()

  const { error: dbError } = await supabase
    .from('newsletter_subscribers')
    .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email' })

  if (dbError) return NextResponse.json({ error: 'Database error' }, { status: 500 })

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Bienvenue dans la communauté Bloom 🌸',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;">
          <h1 style="color:#4F4473;font-size:24px;">Bienvenue chez Bloom 🌸</h1>
          <p style="color:#3D2E46;line-height:1.6;">
            Merci de rejoindre la communauté Bloom ! Vous recevrez en avant-première nos actualités,
            sorties et événements.
          </p>
          <p style="color:#3D2E46;">Tout peut fleurir. Même le doute.</p>
          <hr style="border:none;border-top:1px solid #CABFE3;margin:24px 0;">
          <p style="color:#8F77C7;font-size:12px;">Pour vous désinscrire, répondez à cet email.</p>
        </div>
      `,
    })
  }

  return NextResponse.json({ ok: true })
}
