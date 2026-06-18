import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import NewsFilter from '@/components/news/NewsFilter'

export default async function ActualitesPage() {
  const t = await getTranslations('news')
  const supabase = await createClient()

  const { data: rawArticles, error: articlesError } = await supabase
    .from('news')
    .select('id, slug, title, summary, image_url, published_at, category')
    .order('published_at', { ascending: false })
  const articles = articlesError ? [] : (rawArticles ?? [])

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>

        <NewsFilter articles={articles} />
      </div>
    </main>
  )
}
