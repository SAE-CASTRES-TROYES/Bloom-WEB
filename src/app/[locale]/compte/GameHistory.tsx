'use client'

import { motion } from 'framer-motion'

type GameEntry = {
  id: string
  pseudo: string
  role: string | null
  score: number | null
  game_id: string | null
  created_at: string
}

const ROLE_META = {
  jardinier: { emoji: '🌸', label: 'Jardinier', color: 'text-bloom-green bg-bloom-green-light' },
  ronce:     { emoji: '🥀', label: 'Ronce',      color: 'text-bloom-rose bg-bloom-rose-light' },
  grand_arbre: { emoji: '🌳', label: 'Grand Arbre', color: 'text-bloom-violet-dark bg-bloom-violet-pale' },
}

export default function GameHistory({ entries }: { entries: GameEntry[] }) {
  if (!entries.length) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="font-title text-xl text-bloom-violet-dark">Historique des parties</h2>
        <div className="bg-white rounded-2xl p-8 text-center border border-bloom-violet-light/20">
          <p className="text-3xl mb-3">🎴</p>
          <p className="font-body text-bloom-violet-medium text-sm">
            Aucune partie jouée pour l&apos;instant. <a href="/jeu" className="text-bloom-rose hover:underline">Rejoindre une partie →</a>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-title text-xl text-bloom-violet-dark">Historique des parties</h2>
      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => {
          const meta = ROLE_META[entry.role as keyof typeof ROLE_META]
          const date = new Date(entry.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'short', year: 'numeric',
          })
          return (
            <motion.div
              key={entry.id}
              className="bg-white rounded-xl p-4 border border-bloom-violet-light/20 shadow-sm flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-2xl shrink-0">{meta?.emoji ?? '🎴'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-body text-sm font-medium text-bloom-black truncate">
                    Partie #{entry.game_id?.slice(-6) ?? '——'}
                  </p>
                  {meta && (
                    <span className={`font-body text-xs px-2 py-0.5 rounded-full ${meta.color}`}>
                      {meta.label}
                    </span>
                  )}
                </div>
                <p className="font-body text-xs text-bloom-violet-medium mt-0.5">{date}</p>
              </div>
              {entry.score != null && (
                <span className="font-title text-sm text-bloom-rose shrink-0">
                  {entry.score} pts
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
