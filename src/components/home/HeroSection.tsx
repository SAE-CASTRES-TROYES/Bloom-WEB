'use client'

import { useRef } from 'react'
import { motion, type Variants, useScroll, useTransform } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'

const RESOURCE_CARDS = [
  { src: '/eau.webp',    label: 'Eau',    x: '72%', y: '12%', rot: 10,  delay: 0 },
  { src: '/soleil.webp', label: 'Soleil', x: '80%', y: '52%', rot: -7,  delay: 0.25 },
  { src: '/vent.webp',   label: 'Vent',   x: '5%',  y: '62%', rot: -14, delay: 0.5 },
  { src: '/terre.webp',  label: 'Terre',  x: '8%',  y: '18%', rot: 12,  delay: 0.75 },
  { src: '/lys.webp',    label: 'Lys',    x: '63%', y: '78%', rot: 5,   delay: 1 },
]

function FloatingCard({ src, label, x, y, rot, delay }: typeof RESOURCE_CARDS[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none hidden lg:block"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20, rotate: rot - 5 }}
      animate={{
        opacity: 0.9,
        y: [0, -10, 0],
        rotate: [rot, rot + 3, rot],
      }}
      transition={{
        opacity: { delay, duration: 0.7 },
        y: { delay, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
        rotate: { delay, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="w-14 h-14 rounded-xl shadow-lg overflow-hidden border border-white/30">
        <Image src={src} alt={label} width={56} height={56} className="w-full h-full object-cover" />
      </div>
    </motion.div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function HeroSection() {
  const t = useTranslations('home.hero')
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const illustrationY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section ref={ref} className="relative bg-bloom-cream-light overflow-hidden min-h-[90vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.032]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="botanical-bg" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M80 18 C80 18 50 60 80 95 C110 60 80 18 80 18Z" fill="#4F4473"/>
              <path d="M28 110 C40 85 68 90 55 120 C40 122 22 118 28 110Z" fill="#CF6B88"/>
              <path d="M132 68 C144 48 156 60 148 84 C136 86 124 76 132 68Z" fill="#8F77C7"/>
              <circle cx="80" cy="148" r="6" fill="#E9C75F"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanical-bg)"/>
        </svg>
      </div>

      {RESOURCE_CARDS.map((card) => <FloatingCard key={card.label} {...card} />)}

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-4 items-center w-full">
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              className="font-title text-6xl sm:text-7xl lg:text-8xl text-bloom-black leading-none tracking-tight"
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
            >
              Faites éclore les
            </motion.h1>
            <motion.p
              className="font-accent italic text-6xl sm:text-7xl lg:text-8xl text-bloom-rose leading-none"
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
            >
              Fleurs Légendaires
            </motion.p>
          </div>

          <motion.p
            className="font-body text-bloom-gray-dark/70 text-base sm:text-lg leading-relaxed max-w-[42ch]"
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex flex-col sm:flex-row gap-3 items-start"
          >
            <Link
              href="/jeu"
              className="inline-flex items-center gap-2 bg-bloom-green text-white rounded-full px-8 py-3.5 font-body font-semibold text-base hover:bg-bloom-green/90 active:scale-95 transition-all shadow-lg shadow-bloom-green/25"
            >
              Jouer maintenant
            </Link>
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 border-2 border-bloom-violet-light text-bloom-violet-dark rounded-full px-8 py-3.5 font-body font-semibold text-base hover:bg-bloom-violet-pale hover:border-bloom-violet-dark transition-all"
            >
              Précommander
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center justify-center order-first lg:order-last"
          style={{ y: illustrationY }}
          initial={{ opacity: 0, x: 50, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[440px] lg:h-[440px]">
            <Image
              src="/lavande.webp"
              alt="Bouquet de lavande"
              width={440}
              height={440}
              className="w-full h-full object-contain drop-shadow-xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-bloom-violet-light/40"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-bloom-violet-light/40" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  )
}
