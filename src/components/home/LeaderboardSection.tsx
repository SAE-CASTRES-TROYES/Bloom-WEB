import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import LeaderboardTable, { type LeaderboardEntry } from './LeaderboardTable'

export default async function LeaderboardSection() {
  const t = await getTranslations('home.leaderboard')
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('leaderboard')
    .select('id, pseudo, score, games_played, avatar_url')
    .order('score', { ascending: false })
    .limit(8)

  const entries: LeaderboardEntry[] = error ? [] : (data as LeaderboardEntry[]) ?? []

  return (
    <section id="classement" className="py-20 sm:py-28 px-6 bg-bloom-gold/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: text */}
        <div className="flex flex-col gap-5">
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl text-bloom-black leading-tight">
            {t('title')}
          </h2>
          <p className="font-body text-bloom-gray-dark/70 text-base leading-relaxed max-w-sm">
            Gagnez des parties, grimpez la saison et faites fleurir votre légende.
          </p>
        </div>

        {/* Right: animated table (client component) */}
        <LeaderboardTable entries={entries} />
      </div>
    </section>
  )
}
