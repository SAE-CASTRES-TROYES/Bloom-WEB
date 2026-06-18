'use client'

import { motion, useReducedMotion } from 'framer-motion'

const CARDS = [
  { src: '/cards/eau.webp',             name: 'Eau' },
  { src: '/cards/soleil.webp',          name: 'Soleil' },
  { src: '/cards/terre.webp',           name: 'Terre' },
  { src: '/cards/vent.webp',            name: 'Vent' },
  { src: '/cards/lavande.webp',         name: 'Lavande' },
  { src: '/cards/tulipe.webp',          name: 'Tulipe' },
  { src: '/cards/lys.webp',             name: 'Lys' },
  { src: '/cards/mimosa.webp',          name: 'Mimosa' },
  { src: '/cards/epine.webp',           name: 'Épine' },
  { src: '/cards/poudre-magique.webp',  name: 'Poudre magique' },
  { src: '/cards/seve-purifiante.webp', name: 'Sève purifiante' },
  { src: '/cards/bouclier-mousse.webp', name: 'Bouclier de mousse' },
  { src: '/cards/bourrasque.webp',      name: 'Bourrasque' },
]

const fadeEdges =
  '[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] ' +
  '[-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]'

function Card({ src, name }: { src: string; name: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05, rotate: -1.5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="shrink-0 w-32 flex flex-col items-center gap-2.5"
    >
      <div className="w-32 h-44 rounded-2xl bg-white shadow-md shadow-bloom-violet-light/30 border border-bloom-violet-light/30 overflow-hidden flex items-center justify-center p-2">
        <img src={src} alt={name} className="w-full h-full object-contain" loading="lazy" />
      </div>
      <span className="font-body text-xs text-bloom-gray-dark/70 text-center">{name}</span>
    </motion.div>
  )
}

export default function ResourceMarquee() {
  const reduce = useReducedMotion()
  const loop = [...CARDS, ...CARDS]

  return (
    <div className={`relative overflow-hidden py-8 ${fadeEdges}`}>
      <motion.div
        className="flex gap-5 w-max"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((card, i) => (
          <Card key={`${card.name}-${i}`} {...card} />
        ))}
      </motion.div>
    </div>
  )
}
