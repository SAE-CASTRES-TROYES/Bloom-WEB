'use client'

import { useState } from 'react'
import { btn } from '@/lib/ui'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

const schema = z.object({
  pseudo: z.string().min(2).max(30),
  language: z.enum(['fr', 'en', 'es']),
})

type FormData = z.infer<typeof schema>
type Profile = { pseudo?: string; language?: string; avatar_url?: string; role?: string } | null

export default function AccountForm({ user, profile }: { user: User; profile: Profile }) {
  const t = useTranslations('account')
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resetState, setResetState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const supabase = createClient()

  async function handlePasswordReset() {
    if (!user.email) return
    setResetState('sending')
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/compte/reset-password`,
    })
    setResetState(error ? 'error' : 'sent')
  }

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        pseudo: profile?.pseudo ?? '',
        language: (profile?.language as 'fr' | 'en' | 'es') ?? 'fr',
      },
    })

  async function onSubmit(data: FormData) {
    setError(null)
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...data }, { onConflict: 'id' })
    if (error) { setError(error.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
    router.refresh()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-6 shadow-sm border border-bloom-violet-light/20 flex flex-col gap-5"
      >
        <h2 className="font-title text-xl text-bloom-violet-dark">{t('identity')}</h2>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('email')}</label>
          <input
            value={user.email ?? ''}
            disabled
            className="border border-bloom-violet-light/50 rounded-xl px-4 py-2.5 text-sm bg-bloom-cream/50 text-bloom-gray-dark/60"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('pseudo')}</label>
          <input
            {...register('pseudo')}
            className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
          />
          {errors.pseudo && <p className="text-xs text-bloom-rose">{errors.pseudo.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-medium text-bloom-gray-dark">{t('language')}</label>
          <select
            {...register('language')}
            className="border border-bloom-violet-light rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-bloom-violet-dark transition-colors"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-body text-sm font-medium text-bloom-gray-dark">Mot de passe</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <input
              value="••••••••••"
              type="password"
              disabled
              readOnly
              aria-label="Mot de passe (masqué)"
              className="border border-bloom-violet-light/50 rounded-xl px-4 py-2.5 text-sm bg-bloom-cream/50 text-bloom-gray-dark/60 flex-1"
            />
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={resetState === 'sending'}
              className={btn('outline', 'sm')}
            >
              {resetState === 'sending' ? 'Envoi...' : 'Réinitialiser'}
            </button>
          </div>
          {resetState === 'sent' && (
            <p className="text-xs text-bloom-green font-semibold">E-mail de réinitialisation envoyé à {user.email}.</p>
          )}
          {resetState === 'error' && (
            <p className="text-xs text-bloom-rose">Échec de l&apos;envoi, réessayez.</p>
          )}
        </div>

        {error && <p className="text-xs text-bloom-rose">{error}</p>}
        {saved && <p className="text-xs text-bloom-green font-semibold">{t('saved')}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className={btn('violet', 'md')}
        >
          {isSubmitting ? '...' : t('save')}
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="self-start font-body text-sm text-bloom-rose hover:underline"
      >
        Se déconnecter
      </button>
    </div>
  )
}
