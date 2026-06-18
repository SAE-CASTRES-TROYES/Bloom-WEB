'use client'

import { motion, useReducedMotion } from 'framer-motion'

const CARDS = [
  { src: '/cards/carte_eau.webp',       name: 'Eau' },
  { src: '/cards/carte_soleil.webp',    name: 'Soleil' },
  { src: '/cards/carte_terre.webp',     name: 'Terre' },
  { src: '/cards/carte_bourasque.webp', name: 'Bourrasque' },
  { src: '/cards/carte_epines.webp',    name: 'Épines' },
  { src: '/cards/carte_mousse.webp',    name: 'Mousse' },
  { src: '/cards/carte_pollen.webp',    name: 'Pollen' },
  { src: '/cards/carte_seve.webp',      name: 'Sève' },
  { src: '/cards/carte_dos_bloom.webp', name: 'Bloom' },
]

const fadeEdges =
  '[mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] ' +
  '[-webkit-mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]'

function Card({ src, name }: { src: string; name: string }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05, rotate: -1.5 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="shrink-0 w-36 flex flex-col items-center gap-2.5"
    >
      <div className="w-36 aspect-[5/9] rounded-2xl overflow-hidden shadow-lg shadow-bloom-violet-dark/20 ring-1 ring-black/5">
        <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" />
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
