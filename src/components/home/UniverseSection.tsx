'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { blurUp, blurIn, staggerParent, viewportOnce } from '@/lib/motion'
import ElementDial from './ElementDial'

export default function UniverseSection() {
  const t = useTranslations('home.universe')
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const features = [
    { icon: '/icons/plant-green.svg',  label: t('feat_coop'),   desc: t('feat_coop_desc') },
    { icon: '/icons/eye-green.svg',    label: t('feat_doubt'),  desc: t('feat_doubt_desc') },
    { icon: '/icons/flower-green.svg', label: t('feat_poetry'), desc: t('feat_poetry_desc') },
  ]
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-8%'])

  return (
    <section id="univers" ref={ref} className="py-20 sm:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        <motion.div
          className="flex items-center justify-center order-2 lg:order-1 w-full py-6"
          style={{ y: sunY }}
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <ElementDial />
        </motion.div>

        <motion.div
          className="order-1 lg:order-2 flex flex-col gap-5"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={blurUp} className="font-title text-3xl sm:text-4xl text-bloom-black">
            {t('heading')}
          </motion.h2>

          <motion.p variants={blurUp} className="font-body text-bloom-gray-dark/65 text-base leading-relaxed">
            {t('intro')}
          </motion.p>

          <motion.blockquote variants={blurUp} className="border-l-4 border-bloom-rose pl-5 py-1">
            <p className="font-accent text-bloom-violet-dark text-xl sm:text-2xl italic leading-snug">
              «&nbsp;{t('quote')}&nbsp;»
            </p>
          </motion.blockquote>

          <motion.p variants={blurUp} className="font-body text-bloom-gray-dark/65 text-sm leading-relaxed">
            {t('body')}
          </motion.p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {features.map(({ icon, label, desc }) => (
              <motion.div key={label} variants={blurUp} className="flex flex-col gap-2">
                <img src={icon} alt={label} className="w-[54px] h-[54px]" />
                <p className="font-body text-base font-semibold text-bloom-black">{label}</p>
                <p className="font-title text-sm text-bloom-gray-dark tracking-tight leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
