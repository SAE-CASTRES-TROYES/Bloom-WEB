'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

const schema = z.object({
  pseudo: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  gdpr: z.literal(true, { message: 'Vous devez accepter les conditions.' }),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function InscriptionPage() {
  const t = useTranslations('auth')
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setError(null)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { pseudo: data.pseudo },
      },
    })
    if (error) {
      setError(error.message)
      return
    }
    router.push('/compte')
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="/logo.svg" alt="Bloom" width={80} height={32} />
          <h1 className="font-title text-3xl text-bloom-violet-dark">{t('register_title')}</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-6 shadow-sm border border-bloom-violet-light/20 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">
              {t('pseudo')}
            </label>
            <input
              {...register('pseudo')}
              className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
            />
            {errors.pseudo && <p className="text-xs text-bloom-rose">{errors.pseudo.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">
              {t('email')}
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
            />
            {errors.email && <p className="text-xs text-bloom-rose">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">
              {t('password')}
            </label>
            <input
              {...register('password')}
              type="password"
              autoComplete="new-password"
              className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
            />
            {errors.password && <p className="text-xs text-bloom-rose">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-bloom-gray-dark">
              {t('confirm_password')}
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              autoComplete="new-password"
              className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
            />
            {errors.confirmPassword && <p className="text-xs text-bloom-rose">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-start gap-3">
            <input
              {...register('gdpr')}
              type="checkbox"
              id="gdpr-register"
              className="mt-0.5 accent-bloom-violet-dark"
            />
            <label htmlFor="gdpr-register" className="font-body text-xs text-bloom-gray-dark/70 leading-relaxed">
              {t('gdpr')}
            </label>
          </div>
          {errors.gdpr && <p className="text-xs text-bloom-rose -mt-3">{errors.gdpr.message}</p>}

          {error && <p className="text-xs text-bloom-rose">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-bloom-violet-dark text-bloom-cream-light rounded-2xl px-6 py-3 font-semibold text-sm hover:bg-bloom-violet-medium transition-colors disabled:opacity-50 mt-2"
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
