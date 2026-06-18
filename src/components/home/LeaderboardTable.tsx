'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

export type LeaderboardEntry = {
  id: string
  pseudo: string
  score: number
  games_played: number
  avatar_url: string | null
}

const AVATAR_COLORS = [
  'bg-bloom-violet-medium',
  'bg-bloom-rose',
  'bg-bloom-green',
  'bg-bloom-blue',
  'bg-bloom-gold',
]

export default function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations('home.leaderboard')

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Table header */}
      <div className="grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-2 px-4 py-3 bg-bloom-green text-white text-xs font-semibold uppercase tracking-wide">
        <span>#</span>
        <span>{t('player')}</span>
        <span className="text-right hidden sm:block">{t('games')}</span>
        <span className="text-right">{t('score')}</span>
      </div>

      {entries.length > 0 ? entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          className="grid grid-cols-[2.5rem_1fr_5rem_5rem] gap-2 px-4 py-3 items-center border-b border-bloom-violet-light/10 last:border-0 hover:bg-bloom-cream/40 transition-colors"
          initial={{ opacity: 0, x: -15 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
        >
          <span className="font-title text-sm text-bloom-violet-medium">{i + 1}</span>
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-8 h-8 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden`}>
              {entry.avatar_url
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
                : entry.pseudo.charAt(0).toUpperCase()
              }
            </div>
            <span className="font-body text-sm text-bloom-black font-medium truncate">{entry.pseudo}</span>
          </div>
          <span className="font-body text-xs text-bloom-violet-medium text-right hidden sm:block">{entry.games_played}</span>
          <span className="font-title text-sm text-bloom-rose font-semibold text-right">
            {entry.score.toLocaleString('fr-FR')}
          </span>
        </motion.div>
      )) : (
        <div className="px-4 py-10 text-center">
          <p className="font-body text-sm text-bloom-violet-medium">Le classement sera disponible après les premières parties.</p>
        </div>
      )}
    </motion.div>
  )
}
