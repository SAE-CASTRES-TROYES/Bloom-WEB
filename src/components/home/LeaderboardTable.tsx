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

function initials(pseudo: string) {
  const parts = pseudo.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toLowerCase()
  return pseudo.slice(0, 2).toLowerCase()
}

export default function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const t = useTranslations('home.leaderboard')

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl border border-bloom-gray-dark/15 bg-bloom-gold-light/30 overflow-hidden"
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-bloom-gray-dark/10">
        <span className="font-body text-sm font-semibold tracking-wide text-bloom-gray-dark">
          {t('player')}
        </span>
        <span className="font-body text-xs font-semibold text-bloom-violet-dark bg-bloom-violet-light/70 border border-bloom-violet-medium/30 rounded-full px-4 py-1.5">
          {t('score')}
        </span>
      </div>

      {entries.length > 0 ? entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          className="flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 border-b border-bloom-gray-dark/10 last:border-0 hover:bg-bloom-gold-light/40 transition-colors"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`font-title text-2xl sm:text-3xl w-7 text-center shrink-0 ${i < 3 ? 'text-bloom-black' : 'text-bloom-gray-dark/40'}`}>
            {i + 1}
          </span>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-bloom-violet-medium flex items-center justify-center text-white text-xs font-bold shrink-0 overflow-hidden">
            {entry.avatar_url
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={entry.avatar_url} alt="" className="w-full h-full object-cover" />
              : initials(entry.pseudo)
            }
          </div>
          <span className="font-body text-sm font-semibold text-bloom-black truncate flex-1 min-w-0">
            {entry.pseudo}
          </span>
          <span className="font-title text-base text-bloom-rose font-semibold shrink-0 tabular-nums">
            {entry.score.toLocaleString('fr-FR')}
          </span>
        </motion.div>
      )) : (
        <div className="px-5 py-10 text-center">
          <p className="font-body text-sm text-bloom-gray-dark/60">{t('empty')}</p>
        </div>
      )}
    </motion.div>
  )
}
