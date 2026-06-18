'use client'

import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const labels: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
}

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-0.5 bg-bloom-gold rounded-full p-[3px]" role="group" aria-label="Changer de langue">
      {routing.locales.map((loc) => {
        const active = loc === locale
        return (
          <button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`relative font-title text-[13px] leading-none rounded-full px-3 py-1.5 transition-colors ${
              active ? 'text-bloom-violet-dark' : 'text-bloom-gray-dark/70 hover:text-bloom-gray-dark'
            }`}
            aria-current={active ? 'true' : undefined}
          >
            {active && (
              <motion.span
                layoutId="locale-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{labels[loc]}</span>
          </button>
        )
      })}
    </div>
  )
}
