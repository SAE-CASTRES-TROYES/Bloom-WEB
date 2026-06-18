import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

type Article = {
  id: string
  slug: string
  title: string
  summary: string | null
  image_url: string | null
  published_at: string
  category: string | null
}

type Props = { article: Article }

const CATEGORY_LABELS: Record<string, string> = {
  release: 'Sortie',
  event: 'Événement',
  tournament: 'Tournoi',
}

export default function NewsCard({ article }: Props) {
  const t = useTranslations('news')
  const date = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.published_at))

  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-bloom-violet-light/20"
    >
      <div className="relative w-full aspect-video bg-bloom-violet-pale overflow-hidden">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            🌸
          </div>
        )}
        {article.category && (
          <span className="absolute top-3 left-3 bg-bloom-violet-dark text-bloom-cream-light text-xs font-semibold px-3 py-1 rounded-full">
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <p className="font-body text-xs text-bloom-violet-medium">{date}</p>
        <h3 className="font-title text-lg text-bloom-violet-dark leading-snug group-hover:text-bloom-violet-medium transition-colors">
          {article.title}
        </h3>
        {article.summary && (
          <p className="font-body text-sm text-bloom-gray-dark/80 line-clamp-3">
            {article.summary}
          </p>
        )}
        <span className="mt-auto font-body text-xs text-bloom-rose font-semibold pt-2">
          {t('read_more')} →
        </span>
      </div>
    </Link>
  )
}
