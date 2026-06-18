import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function PaymentSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams
  const t = await getTranslations('checkout')

  // Stripe fournit un session_id — on vérifie qu'il est présent
  if (!session_id) redirect('/boutique')

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4">
      <Image src="/brand/logo.svg" alt="Bloom" width={80} height={32} />

      <div className="bg-bloom-green-light rounded-3xl p-10 text-center max-w-md flex flex-col gap-5 border border-bloom-green/20">
        <div className="text-5xl">🌸</div>
        <h1 className="font-title text-3xl text-bloom-black">{t('success_title')}</h1>
        <p className="font-body text-bloom-gray-dark">{t('success_body')}</p>
        <p className="font-body text-xs text-bloom-green/70 bg-white/50 rounded-xl p-2">
          Référence : <code className="font-mono">{session_id.slice(0, 24)}…</code>
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/boutique"
          className="font-body text-sm border border-bloom-violet-light rounded-xl px-5 py-2.5 text-bloom-violet-dark hover:bg-bloom-violet-pale transition-colors"
        >
          Continuer mes achats
        </Link>
        <Link
          href="/compte"
          className="font-body text-sm bg-bloom-violet-dark text-bloom-cream-light rounded-xl px-5 py-2.5 hover:bg-bloom-violet-medium transition-colors"
        >
          Mon compte
        </Link>
      </div>
    </main>
  )
}
