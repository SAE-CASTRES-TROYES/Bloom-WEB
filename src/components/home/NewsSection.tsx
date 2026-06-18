import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import NewsCard from '@/components/news/NewsCard'

export default async function NewsSection() {
  const t = await getTranslations('home.news')
  const supabase = await createClient()

  const { data: articles, error: newsError } = await supabase
    .from('news')
    .select('id, slug, title, summary, image_url, published_at, category')
    .order('published_at', { ascending: false })
    .limit(3)
  const safeArticles = newsError ? [] : (articles ?? [])

  return (
    <section id="actualites" className="py-24 px-4 bg-bloom-cream">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="font-accent text-bloom-rose text-lg italic">Nouveautés</span>
            <h2 className="font-title text-4xl text-bloom-violet-dark">{t('title')}</h2>
          </div>
          <Link
            href="/actualites"
            className="hidden sm:inline-flex font-body text-sm text-bloom-violet-dark border border-bloom-violet-light rounded-lg px-4 py-2 hover:bg-bloom-violet-pale transition-colors"
          >
            {t('see_all')} →
          </Link>
        </div>

        {safeArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-bloom-violet-medium">
              Les premières actualités arrivent bientôt...
            </p>
          </div>
        )}

        <Link
          href="/actualites"
          className="sm:hidden self-center font-body text-sm text-bloom-violet-dark border border-bloom-violet-light rounded-lg px-4 py-2"
        >
          {t('see_all')} →
        </Link>
      </div>
    </section>
  )
}
