'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Element = { src: string; name: string; kind: 'Ressource' | 'Objet' }

const ELEMENTS: Element[] = [
  { src: '/cards/soleil.webp',          name: 'Soleil',             kind: 'Ressource' },
  { src: '/cards/eau.webp',             name: 'Eau',                kind: 'Ressource' },
  { src: '/cards/terre.webp',           name: 'Terre',              kind: 'Ressource' },
  { src: '/cards/vent.webp',            name: 'Vent',               kind: 'Ressource' },
  { src: '/cards/poudre-magique.webp',  name: 'Poudre magique',     kind: 'Objet' },
  { src: '/cards/seve-purifiante.webp', name: 'Sève purifiante',    kind: 'Objet' },
  { src: '/cards/bouclier-mousse.webp', name: 'Bouclier de mousse', kind: 'Objet' },
  { src: '/cards/bourrasque.webp',      name: 'Bourrasque',         kind: 'Objet' },
]

const RADIUS = 41 // % of container
const N = ELEMENTS.length

export default function ElementDial() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const el = ELEMENTS[active]

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % N), 3000)
    return () => clearInterval(id)
  }, [reduce, paused])

  return (
    <div
      className="w-full max-w-[360px] mx-auto flex flex-col items-center gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full aspect-square">
        {/* rotating dashed orbit */}
        <motion.div
          aria-hidden
          className="absolute inset-[9%] rounded-full border-2 border-dashed border-bloom-violet-medium/30"
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <div aria-hidden className="absolute inset-[22%] rounded-full bg-bloom-gold/10 blur-2xl" />

        {/* center featured */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] h-[42%] flex flex-col items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={el.src}
              src={el.src}
              alt={el.name}
              className="w-full h-full object-contain drop-shadow-xl"
              initial={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.7, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* nodes */}
        {ELEMENTS.map((node, i) => {
          const angle = (-90 + i * (360 / N)) * (Math.PI / 180)
          const x = 50 + RADIUS * Math.cos(angle)
          const y = 50 + RADIUS * Math.sin(angle)
          const isActive = i === active
          return (
            <button
              key={node.name}
              aria-label={node.name}
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              style={{ left: `${x}%`, top: `${y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl grid place-items-center transition-all duration-300 ${
                isActive
                  ? 'bg-white scale-110 shadow-lg ring-2 ring-bloom-rose'
                  : 'bg-white/70 backdrop-blur-sm shadow-sm hover:scale-105 hover:bg-white'
              }`}
            >
              <img src={node.src} alt="" className="w-9 h-9 object-contain" draggable={false} />
            </button>
          )
        })}
      </div>

      {/* label (in flow, below the dial) */}
      <div className="h-12 text-center whitespace-nowrap">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={el.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block font-body text-[0.65rem] font-semibold uppercase tracking-widest text-bloom-violet-medium">{el.kind}</span>
            <span className="block font-accent text-2xl text-bloom-violet-dark leading-tight">{el.name}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
