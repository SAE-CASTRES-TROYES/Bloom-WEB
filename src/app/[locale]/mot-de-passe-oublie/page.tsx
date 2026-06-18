'use client'

import { useState } from 'react'
import { btn } from '@/lib/ui'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

const schema = z.object({ email: z.string().email() })
type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const t = useTranslations('auth')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/compte/reset-password`,
    })
    if (error) { setError(error.message); return }
    setSent(true)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <Image src="/brand/logo.svg" alt="Bloom" width={80} height={32} />
          <h1 className="font-title text-3xl text-bloom-violet-dark">{t('forgot_title')}</h1>
        </div>

        {sent ? (
          <div className="bg-bloom-green-light rounded-2xl p-8 text-center">
            <p className="text-3xl mb-3">📬</p>
            <p className="font-title text-lg text-bloom-black">
              {t('forgot_sent')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl p-6 shadow-sm border border-bloom-violet-light/20 flex flex-col gap-4"
          >
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

            {error && <p className="text-xs text-bloom-rose">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={btn('violet', 'md')}
            >
              {isSubmitting ? '...' : t('forgot_submit')}
            </button>
          </form>
        )}

        <p className="text-center font-body text-sm text-bloom-gray-dark">
          <Link href="/connexion" className="text-bloom-rose font-semibold hover:underline">
            {t('login_link')}
          </Link>
        </p>
      </div>
    </main>
  )
}
