'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { blurUp, blurIn, staggerParent, viewportOnce } from '@/lib/motion'

const features = [
  { icon: '/icons/plant-green.svg',   label: 'Coopération', desc: 'Jouez ensemble pour faire éclore les cinq fleurs légendaires.' },
  { icon: '/icons/eye-purple.svg',    label: 'Doute',       desc: 'Méfiez-vous des Ronces qui se cachent parmi vous.' },
  { icon: '/icons/flower-purple.svg', label: 'Poésie',      desc: 'Un univers poétique et mystérieux pour tous les âges.' },
]

export default function UniverseSection() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunRotate = useTransform(scrollYProgress, [0, 1], reduce ? ['0deg', '0deg'] : ['-10deg', '10deg'])
  const sunY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['8%', '-8%'])

  return (
    <section id="univers" ref={ref} className="py-20 sm:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        <motion.div
          className="flex items-center justify-center order-2 lg:order-1"
          style={{ rotate: sunRotate, y: sunY }}
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <Image
              src="/cards/soleil.webp"
              alt="Soleil illustré"
              width={320}
              height={320}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        <motion.div
          className="order-1 lg:order-2 flex flex-col gap-5"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={blurUp} className="font-title text-3xl sm:text-4xl text-bloom-black">
            Bloom, le jardin
          </motion.h2>

          <motion.p variants={blurUp} className="font-body text-bloom-gray-dark/65 text-base leading-relaxed">
            Chaque année, les Jardiniers coopèrent pour faire éclore cinq fleurs légendaires.
          </motion.p>

          <motion.blockquote variants={blurUp} className="border-l-4 border-bloom-rose pl-5 py-1">
            <p className="font-accent text-bloom-violet-dark text-xl sm:text-2xl italic leading-snug">
              «&nbsp;Coopérez, fleurissez, mais gardez l&apos;œil ouvert. Tout peut fleurir. Même le doute.&nbsp;»
            </p>
          </motion.blockquote>

          <motion.p variants={blurUp} className="font-body text-bloom-gray-dark/65 text-sm leading-relaxed">
            Un jeu de coopération et de trahison où chaque partie révèle une nouvelle dynamique de groupe.
            Faites confiance à vos coéquipiers&nbsp;— mais méfiez-vous des Ronces.
          </motion.p>

          <div className="grid grid-cols-3 gap-4 pt-2">
            {features.map(({ icon, label, desc }) => (
              <motion.div key={label} variants={blurUp} className="flex flex-col gap-2">
                <img src={icon} alt={label} className="w-[54px] h-[54px]" />
                <p className="font-title text-sm text-bloom-black">{label}</p>
                <p className="font-body text-xs text-bloom-gray-dark/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
