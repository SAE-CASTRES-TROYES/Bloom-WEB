import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

export default async function NotFound() {
  const t = await getTranslations('errors')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <Image src="/logo.svg" alt="Bloom" width={80} height={32} />
      <div className="text-center flex flex-col gap-4 max-w-sm">
        <p className="text-6xl">🥀</p>
        <h1 className="font-title text-4xl text-bloom-violet-dark">{t('not_found')}</h1>
        <p className="font-body text-bloom-violet-medium">{t('not_found_body')}</p>
        <Link
          href="/"
          className="self-center font-body text-sm bg-bloom-violet-dark text-bloom-cream-light rounded-2xl px-6 py-3 hover:bg-bloom-violet-medium transition-colors"
        >
          {t('back_home')}
        </Link>
      </div>
    </main>
  )
}
