'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import NewsCard from '@/components/news/NewsCard'

type Article = {
  id: string
  slug: string
  title: string
  summary: string | null
  image_url: string | null
  published_at: string
  category: string | null
}

const CATEGORIES = ['all', 'release', 'event', 'tournament'] as const
type Category = (typeof CATEGORIES)[number]

export default function NewsFilter({ articles }: { articles: Article[] }) {
  const t = useTranslations('news')
  const [active, setActive] = useState<Category>('all')

  const filtered =
    active === 'all' ? articles : articles.filter((a) => a.category === active)

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`font-body text-sm px-4 py-1.5 rounded-full border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-bloom-violet-dark text-bloom-cream-light border-bloom-violet-dark'
                  : 'border-bloom-violet-light text-bloom-violet-dark hover:bg-bloom-violet-pale'
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          )
        })}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="font-body text-bloom-violet-medium">{t('empty')}</p>
      )}
    </>
  )
}
