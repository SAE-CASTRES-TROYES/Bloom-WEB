import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { name, email, message } = parsed.data

  if (!process.env.RESEND_API_KEY) {
    console.log('[CONTACT DEV]', { name, email, message })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: ['marius.nogueron@gmail.com'],
    replyTo: email,
    subject: `[Bloom] Message de ${name}`,
    text: `De : ${name} <${email}>\n\n${message}`,
    html: `<p><strong>De :</strong> ${name} &lt;${email}&gt;</p><p>${message.replace(/\n/g, '<br>')}</p>`,
  })

  if (error) return NextResponse.json({ error: 'Mail error' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
