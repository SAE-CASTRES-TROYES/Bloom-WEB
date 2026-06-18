'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  prenom: z.string().min(2),
  nom: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  gdpr: z.literal(true, { message: 'Vous devez accepter la politique de confidentialité.' }),
})
type FormData = z.infer<typeof schema>

const contactLinks = [
  { icon: '✉️', text: 'bonjour@bloom-jeu.fr', sub: 'Réponse sous 4h', href: 'mailto:bonjour@bloom-jeu.fr' },
  { icon: '🏪', text: 'Vous êtes revendeur ?', sub: 'Accédez à l\'Espace pro B2B', href: '/boutique#b2b' },
  { icon: '📍', text: 'Trouver une boutique', sub: 'Carte des revendeurs', href: '/trouver-une-boutique' },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${data.prenom} ${data.nom}`, email: data.email, message: data.message }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28 px-6 bg-bloom-gray-dark">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-title text-4xl sm:text-5xl text-white leading-tight">
              Une question ?<br />
              <span className="text-bloom-gold">Écrivez-nous.</span>
            </h2>
            <p className="font-body text-bloom-violet-pale/70 text-base leading-relaxed mt-3 max-w-sm">
              Une question sur Bloom, une commande ou une collaboration ? Nous vous répondons rapidement.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {contactLinks.map(({ icon, text, sub, href }, i) => (
              <motion.a
                key={text}
                href={href}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-bloom-black/30 border border-bloom-violet-dark/40 flex items-center justify-center text-lg shrink-0 group-hover:border-bloom-gold/50 transition-colors">
                  {icon}
                </div>
                <div>
                  <p className="font-body text-sm text-white font-medium group-hover:text-bloom-gold transition-colors">{text}</p>
                  <p className="font-body text-xs text-bloom-violet-pale/50">{sub}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          {status === 'success' ? (
            <div className="bg-white rounded-2xl p-8 text-center flex flex-col gap-4">
              <p className="text-4xl">🌸</p>
              <h3 className="font-title text-xl text-bloom-black">Message envoyé !</h3>
              <p className="font-body text-sm text-bloom-gray-dark/70">Nous vous répondrons sous 4h.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
            >
              {/* Prénom / Nom row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-medium text-bloom-gray-dark">
                    Prénom <span className="text-bloom-rose">*</span>
                  </label>
                  <input
                    {...register('prenom')}
                    placeholder="Benjamin"
                    className="border border-bloom-violet-light/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
                  />
                  {errors.prenom && <p className="text-xs text-bloom-rose">{errors.prenom.message}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs font-medium text-bloom-gray-dark">
                    Nom <span className="text-bloom-rose">*</span>
                  </label>
                  <input
                    {...register('nom')}
                    placeholder="Versaine"
                    className="border border-bloom-violet-light/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
                  />
                  {errors.nom && <p className="text-xs text-bloom-rose">{errors.nom.message}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-medium text-bloom-gray-dark">
                  Adresse e-mail <span className="text-bloom-rose">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john.doe@example.com"
                  className="border border-bloom-violet-light/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors"
                />
                {errors.email && <p className="text-xs text-bloom-rose">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-xs font-medium text-bloom-gray-dark">
                  Votre message
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  placeholder="Lorem ipsum..."
                  className="border border-bloom-violet-light/50 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors resize-none"
                />
                {errors.message && <p className="text-xs text-bloom-rose">{errors.message.message}</p>}
              </div>

              <div className="flex items-start gap-2.5">
                <input
                  {...register('gdpr')}
                  type="checkbox"
                  id="gdpr-contact"
                  className="mt-0.5 accent-bloom-violet-dark"
                />
                <label htmlFor="gdpr-contact" className="font-body text-xs text-bloom-gray-dark/60 leading-relaxed">
                  J&apos;accepte la politique de confidentialité
                </label>
              </div>
              {errors.gdpr && <p className="text-xs text-bloom-rose -mt-2">{errors.gdpr.message}</p>}

              {status === 'error' && <p className="text-xs text-bloom-rose">Une erreur est survenue, réessayez.</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-bloom-black text-white rounded-2xl py-3 font-semibold text-sm hover:bg-bloom-gray-dark transition-colors disabled:opacity-50 mt-1"
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
