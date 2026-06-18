'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { staggerParent, lineMask, blurUp, blurIn, EASE_OUT, SPRING } from '@/lib/motion'
import FlowerShowcase from './FlowerShowcase'

export default function HeroSection() {
  const t = useTranslations('home.hero')
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const illustrationY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-14%'])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-4 items-center w-full">
        <motion.div
          className="flex flex-col gap-5 lg:gap-6"
          variants={staggerParent}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col gap-1">
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                variants={lineMask}
                className="block font-title text-6xl sm:text-7xl lg:text-8xl text-bloom-black leading-[1.05] tracking-tight"
              >
                Faites éclore les
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                variants={lineMask}
                className="block font-accent text-6xl sm:text-7xl lg:text-8xl text-bloom-rose leading-[1.05] tracking-tight"
              >
                Fleurs Légendaires
              </motion.span>
            </span>
          </div>

          <motion.p
            variants={blurUp}
            className="font-body text-bloom-gray-dark/70 text-base sm:text-lg leading-relaxed max-w-[42ch]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={blurUp} className="flex flex-col sm:flex-row gap-3 items-start">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SPRING}>
              <Link
                href="/jeu"
                className="inline-flex items-center gap-2 bg-bloom-rose text-white rounded-full px-8 py-3.5 font-body font-semibold text-base shadow-lg shadow-bloom-rose/25"
              >
                Jouer maintenant
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={SPRING}>
              <Link
                href="/boutique"
                className="inline-flex items-center gap-2 border-2 border-bloom-violet-light text-bloom-violet-dark rounded-full px-8 py-3.5 font-body font-semibold text-base hover:bg-bloom-violet-pale hover:border-bloom-violet-dark transition-colors"
              >
                Précommander
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center order-first lg:order-last w-full"
          style={{ y: illustrationY }}
          variants={blurIn}
          initial="hidden"
          animate="visible"
        >
          <FlowerShowcase />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-bloom-violet-light/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT }}
      >
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-transparent to-bloom-violet-light/50"
          animate={reduce ? {} : { scaleY: [0.6, 1, 0.6], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
