'use client'

import { useLocale } from 'next-intl'
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
            className={`font-title text-[13px] leading-none rounded-full px-3 py-1.5 transition-colors duration-200 ${
              active
                ? 'bg-white text-bloom-violet-dark shadow-sm'
                : 'text-bloom-gray-dark/70 hover:text-bloom-gray-dark'
            }`}
            aria-current={active ? 'true' : undefined}
          >
            {labels[loc]}
          </button>
        )
      })}
    </div>
  )
}
