'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { btn } from '@/lib/ui'

const schema = z
  .object({
    password: z.string().min(8, '8 caractères minimum.'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const t = useTranslations('auth')
  const supabase = createClient()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // La session de récupération est créée depuis le lien e-mail (token dans l'URL).
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true)
    })
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true) })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setError(null)
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) { setError(error.message); return }
    setDone(true)
    setTimeout(() => router.push('/compte'), 1500)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="/brand/logo.svg" alt="Bloom" width={80} height={32} />
          <h1 className="font-title text-3xl text-bloom-violet-dark">{t('reset_title')}</h1>
        </div>

        {done ? (
          <div className="bg-bloom-green-light rounded-2xl p-8 text-center">
            <p className="text-3xl mb-3">✅</p>
            <p className="font-title text-lg text-bloom-black">{t('reset_done')}</p>
          </div>
        ) : !ready ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-bloom-violet-light/20">
            <p className="font-body text-sm text-bloom-violet-medium">
              {t('reset_need_link')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 shadow-sm border border-bloom-violet-light/20 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('reset_new')}</label>
              <input
                {...register('password')}
                type="password"
                autoComplete="new-password"
                className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
              />
              {errors.password && <p className="text-xs text-bloom-rose">{errors.password.message}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('reset_confirm')}</label>
              <input
                {...register('confirm')}
                type="password"
                autoComplete="new-password"
                className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
              />
              {errors.confirm && <p className="text-xs text-bloom-rose">{errors.confirm.message}</p>}
            </div>
            {error && <p className="text-xs text-bloom-rose">{error}</p>}
            <button type="submit" disabled={isSubmitting} className={btn('violet', 'md')}>
              {isSubmitting ? '...' : t('reset_submit')}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
