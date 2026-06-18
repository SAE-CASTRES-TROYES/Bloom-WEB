'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  motion, AnimatePresence, useReducedMotion,
  useMotionValue, useSpring, useTransform,
} from 'framer-motion'

type Flower = { src: string; name: string; accent: string; ring: string }

const FLOWERS: Flower[] = [
  { src: '/cards/lavande.webp', name: 'Lavande', accent: 'text-bloom-violet-medium', ring: 'ring-bloom-violet-medium' },
  { src: '/cards/tulipe.webp',  name: 'Tulipe',  accent: 'text-bloom-rose',          ring: 'ring-bloom-rose' },
  { src: '/cards/dahlia.webp',  name: 'Dahlia',  accent: 'text-bloom-rose',          ring: 'ring-bloom-rose' },
  { src: '/cards/lys.webp',     name: 'Lys',     accent: 'text-bloom-gold',          ring: 'ring-bloom-gold' },
  { src: '/cards/mimosa.webp',  name: 'Mimosa',  accent: 'text-bloom-gold',          ring: 'ring-bloom-gold' },
]

export default function FlowerShowcase() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const flower = FLOWERS[active]

  // pointer tilt
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], reduce ? ['0deg', '0deg'] : ['9deg', '-9deg']), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], reduce ? ['0deg', '0deg'] : ['-12deg', '12deg']), { stiffness: 150, damping: 18 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }, [px, py, reduce])

  const reset = useCallback(() => { px.set(0); py.set(0) }, [px, py])

  useEffect(() => {
    if (reduce || paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % FLOWERS.length), 3800)
    return () => clearInterval(id)
  }, [reduce, paused])

  return (
    <div
      className="relative w-full max-w-[420px] mx-auto flex flex-col items-center gap-7 select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); reset() }}
    >
      <div
        className="relative w-full aspect-[4/5] flex items-center justify-center"
        style={{ perspective: 1000 }}
        onMouseMove={onMove}
      >
        {/* soft halo behind the bloom */}
        <motion.div
          aria-hidden
          className="absolute w-[68%] h-[68%] rounded-full bg-bloom-rose/15 blur-3xl"
          animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div className="relative w-[78%] h-[88%]" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={flower.src}
              src={flower.src}
              alt={flower.name}
              className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.85, rotate: -6, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9, rotate: 6, filter: 'blur(8px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        {/* floating name badge */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={flower.name}
              className={`block font-accent text-2xl sm:text-3xl ${flower.accent}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {flower.name}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* selector */}
      <div className="flex items-center gap-2.5" role="tablist" aria-label="Fleurs légendaires">
        {FLOWERS.map((f, i) => (
          <button
            key={f.name}
            role="tab"
            aria-selected={i === active}
            aria-label={f.name}
            onClick={() => setActive(i)}
            className={`relative w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm grid place-items-center transition-all duration-300 ring-2 ${
              i === active ? `${f.ring} scale-110 shadow-md` : 'ring-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={f.src} alt="" className="w-8 h-8 object-contain" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  )
}
