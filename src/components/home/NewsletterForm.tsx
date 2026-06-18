'use client'

import { useState } from 'react'
import { btn } from '@/lib/ui'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email(),
})

type FormData = z.infer<typeof schema>

export default function NewsletterForm() {
  const t = useTranslations('newsletter')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <p className="font-title text-base text-bloom-cream mb-3">{t('title')}</p>
      {status === 'success' ? (
        <p className="text-bloom-green-light text-sm">{t('success')}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            {...register('email')}
            type="email"
            placeholder={t('placeholder')}
            className="bg-bloom-black/30 border border-bloom-violet-dark rounded-lg px-3 py-2 text-sm text-bloom-cream-light placeholder:text-bloom-violet-light focus:outline-none focus:border-bloom-violet-medium"
          />
          {errors.email && (
            <p className="text-xs text-bloom-rose">{errors.email.message}</p>
          )}
          <p className="text-xs text-bloom-violet-light/70">{t('gdpr')}</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className={btn('soft', 'sm')}
          >
            {t('submit')}
          </button>
          {status === 'error' && (
            <p className="text-xs text-bloom-rose">Une erreur est survenue.</p>
          )}
        </form>
      )}
    </div>
  )
}
