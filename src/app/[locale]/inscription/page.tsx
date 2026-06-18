'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { btn } from '@/lib/ui'
import { useTranslations } from 'next-intl'
import { useRouter, Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import { Sprout, Store, Check } from 'lucide-react'

const schema = z.object({
  pseudo: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(8, 'Minimum 8 caractères'),
  confirmPassword: z.string(),
  role: z.enum(['player', 'retailer']),
  company: z.string().optional(),
  gdpr: z.literal(true, { message: 'Vous devez accepter les conditions.' }),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function InscriptionPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get('role') === 'retailer' ? 'retailer' : 'player'
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { role: initialRole } })

  const selectedRole = watch('role')

  async function onSubmit(data: FormData) {
    setError(null)
    // Inscription serveur (service-role) : compte créé déjà confirmé, sans e-mail.
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        pseudo: data.pseudo,
        role: data.role,
        company: data.company,
      }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      if (res.status === 409 || body.error === 'user_already_exists') setError(t('err_exists'))
      else if (body.message?.toLowerCase().includes('invalid')) setError(t('err_email_invalid'))
      else setError(t('err_generic'))
      return
    }
    // Connexion immédiate côté client.
    const { error: signInErr } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (signInErr) { router.push('/connexion'); return }
    router.push('/compte')
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-title text-3xl text-bloom-violet-dark">{t('register_title')}</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'player', Icon: Sprout, title: t('role_player'), desc: t('role_player_desc') },
            { value: 'retailer', Icon: Store, title: t('role_retailer'), desc: t('role_retailer_desc') },
          ].map(({ value, Icon, title, desc }) => {
            const active = selectedRole === value
            return (
              <label
                key={value}
                className={`relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  active
                    ? 'border-bloom-violet-dark bg-bloom-violet-pale shadow-md shadow-bloom-violet-light/40'
                    : 'border-bloom-violet-light/40 bg-white hover:border-bloom-violet-medium hover:-translate-y-0.5'
                }`}
              >
                <input {...register('role')} type="radio" value={value} className="sr-only" />
                {active && (
                  <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-bloom-violet-dark text-white flex items-center justify-center">
                    <Check size={13} strokeWidth={3} />
                  </span>
                )}
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  active ? 'bg-bloom-violet-dark text-white' : 'bg-bloom-violet-pale text-bloom-violet-dark'
                }`}>
                  <Icon size={24} strokeWidth={2} />
                </span>
                <p className="font-title text-base text-bloom-violet-dark">{title}</p>
                <p className="font-body text-xs text-bloom-violet-medium leading-relaxed">{desc}</p>
              </label>
            )
          })}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-bloom-violet-light/20 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('pseudo')}</label>
            <input {...register('pseudo')} className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors" />
            {errors.pseudo && <p className="text-xs text-bloom-rose">{errors.pseudo.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('email')}</label>
            <input {...register('email')} type="email" autoComplete="email" className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors" />
            {errors.email && <p className="text-xs text-bloom-rose">{errors.email.message}</p>}
          </div>

          {selectedRole === 'retailer' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('company')}</label>
                <input {...register('company')} placeholder="Ma Boutique de Jeux" className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors" />
              </div>
              <div className="bg-bloom-gold/10 border border-bloom-gold/30 rounded-xl p-3">
                <p className="font-body text-xs text-bloom-gray-dark/70">
                  {t('retailer_note')}
                </p>
              </div>
            </>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('password')}</label>
            <input {...register('password')} type="password" autoComplete="new-password" className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors" />
            {errors.password && <p className="text-xs text-bloom-rose">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('confirm_password')}</label>
            <input {...register('confirmPassword')} type="password" autoComplete="new-password" className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors" />
            {errors.confirmPassword && <p className="text-xs text-bloom-rose">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-start gap-3">
            <input {...register('gdpr')} type="checkbox" id="gdpr-register" className="mt-0.5 accent-bloom-violet-dark" />
            <label htmlFor="gdpr-register" className="font-body text-xs text-bloom-gray-dark/70 leading-relaxed">
              {t('gdpr')} <Link href="/politique-de-confidentialite" className="text-bloom-rose hover:underline">Politique de confidentialité →</Link>
            </label>
          </div>
          {errors.gdpr && <p className="text-xs text-bloom-rose -mt-3">{errors.gdpr.message}</p>}

          {error && <p className="text-xs text-bloom-rose">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${btn('violet', 'md')} mt-1`}
          >
            {isSubmitting ? '...' : t('register_submit')}
          </button>
        </form>

        <p className="text-center font-body text-sm text-bloom-gray-dark">
          {t('already_account')}{' '}
          <Link href="/connexion" className="text-bloom-rose font-semibold hover:underline">
            {t('login_link')}
          </Link>
        </p>
      </div>
    </main>
  )
}
