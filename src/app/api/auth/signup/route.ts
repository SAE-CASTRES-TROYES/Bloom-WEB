import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  pseudo: z.string().min(2).max(30),
  role: z.enum(['player', 'retailer']),
  company: z.string().optional(),
})

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }
  const { email, password, pseudo, role, company } = parsed.data

  let admin
  try {
    admin = createAdminClient()
  } catch {
    return NextResponse.json({ error: 'server_misconfigured' }, { status: 500 })
  }

  // Crée l'utilisateur déjà confirmé → aucun e-mail envoyé, pas de rate limit.
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { pseudo, role, company: company ?? null },
  })

  if (error) {
    const exists = error.code === 'email_exists' || error.message.toLowerCase().includes('already')
    return NextResponse.json(
      { error: exists ? 'user_already_exists' : 'signup_failed', message: error.message },
      { status: exists ? 409 : 400 },
    )
  }

  // Best-effort : crée le profil si le trigger n'existe pas encore (ignore si la table manque).
  if (data.user) {
    await admin.from('profiles').upsert(
      { id: data.user.id, pseudo, role, company: company ?? null },
      { onConflict: 'id' },
    )
  }

  return NextResponse.json({ ok: true })
}
