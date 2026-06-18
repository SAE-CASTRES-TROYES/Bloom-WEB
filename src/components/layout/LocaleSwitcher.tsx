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

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: e.target.value })
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="font-body text-sm bg-transparent text-bloom-gray-dark border border-bloom-violet-light rounded-md px-2 py-1 cursor-pointer hover:border-bloom-violet-dark transition-colors"
      aria-label="Changer de langue"
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {labels[loc]}
        </option>
      ))}
    </select>
  )
}
