import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import StoreLocatorMap from '@/components/map/StoreLocatorMap'

export default async function TrouverUneBoutiquePage() {
  const t = await getTranslations('locator')
  const supabase = await createClient()

  const { data: retailers } = await supabase
    .from('retailers')
    .select('id, name, address, lat, lng, country, type, website')
    .order('name')

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-accent text-bloom-rose text-lg">{t('eyebrow')}</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>
        <StoreLocatorMap retailers={retailers ?? []} />
      </div>
    </main>
  )
}
