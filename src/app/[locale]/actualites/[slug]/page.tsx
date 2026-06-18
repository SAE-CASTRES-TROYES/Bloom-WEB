import { notFound, redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { Link } from '@/i18n/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const t = await getTranslations('news')
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!article) notFound()

  const date = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(article.published_at))

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <Link
          href="/actualites"
          className="font-body text-sm text-bloom-violet-dark hover:text-bloom-rose transition-colors"
        >
          {t('back')}
        </Link>

        {/* Hero image */}
        {article.image_url && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-bloom-violet-pale">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-col gap-3">
          {article.category && (
            <span className="self-start bg-bloom-violet-dark text-bloom-cream-light text-xs font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
          )}
          <h1 className="font-title text-4xl sm:text-5xl text-bloom-violet-dark leading-tight">
            {article.title}
          </h1>
          <p className="font-body text-sm text-bloom-violet-medium">
            {t('published_on', { date })}
          </p>
        </div>

        {/* Content */}
        <div
          className="font-body text-bloom-gray-dark text-base leading-relaxed prose prose-headings:font-title prose-headings:text-bloom-violet-dark prose-a:text-bloom-rose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content ?? '' }}
        />
      </div>
    </main>
  )
}
