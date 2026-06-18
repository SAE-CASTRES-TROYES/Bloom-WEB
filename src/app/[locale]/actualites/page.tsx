import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import NewsCard from '@/components/news/NewsCard'

export default async function ActualitesPage() {
  const t = await getTranslations('news')
  const supabase = await createClient()

  const { data: rawArticles, error: articlesError } = await supabase
    .from('news')
    .select('id, slug, title, summary, image_url, published_at, category')
    .order('published_at', { ascending: false })
  const articles = articlesError ? [] : (rawArticles ?? [])

  const categories = ['all', 'release', 'event', 'tournament'] as const

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="font-accent text-bloom-rose text-lg italic">Blog &amp; Agenda</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">{t('title')}</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat}
              className="font-body text-sm px-4 py-1.5 rounded-full border border-bloom-violet-light text-bloom-violet-dark cursor-pointer hover:bg-bloom-violet-pale transition-colors"
            >
              {t(`categories.${cat}`)}
            </span>
          ))}
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🌸</p>
            <p className="font-body text-bloom-violet-medium text-lg">
              Les premières actualités arrivent bientôt...
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
