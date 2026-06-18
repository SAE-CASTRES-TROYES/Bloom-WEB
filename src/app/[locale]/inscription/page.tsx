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
  const [emailSent, setEmailSent] = useState(false)
  const supabase = createClient()

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { role: initialRole } })

  const selectedRole = watch('role')

  async function onSubmit(data: FormData) {
    setError(null)
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          pseudo: data.pseudo,
          role: data.role,
          company: data.company,
        },
      },
    })
    if (error) {
      // Messages plus clairs que ceux renvoyés bruts par Supabase
      if (error.code === 'over_email_send_rate_limit') setError(t('err_rate_limit'))
      else if (error.code === 'email_address_invalid') setError(t('err_email_invalid'))
      else if (error.code === 'user_already_exists' || error.message.includes('already')) setError(t('err_exists'))
      else setError(error.message)
      return
    }
    // Session immédiate → connecté. Sinon, confirmation par e-mail requise.
    if (result.session) router.push('/compte')
    else setEmailSent(true)
  }

  if (emailSent) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm flex flex-col gap-6 text-center">
          <h1 className="font-title text-3xl text-bloom-violet-dark">{t('register_title')}</h1>
          <div className="bg-bloom-green-light rounded-2xl p-8 flex flex-col gap-3">
            <p className="text-3xl">📬</p>
            <p className="font-title text-lg text-bloom-black">{t('confirm_sent')}</p>
            <p className="font-body text-sm text-bloom-gray-dark/70">{t('confirm_sent_body')}</p>
          </div>
          <Link href="/connexion" className="font-body text-sm text-bloom-rose font-semibold hover:underline">
            {t('login_link')}
          </Link>
        </div>
      </main>
    )
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
