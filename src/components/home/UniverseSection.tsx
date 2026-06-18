'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function SunIllustration() {
  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      {/* Rays */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i * 360) / 16
        const rad = (angle * Math.PI) / 180
        const x1 = 150 + Math.cos(rad) * 85
        const y1 = 150 + Math.sin(rad) * 85
        const x2 = 150 + Math.cos(rad) * 140
        const y2 = 150 + Math.sin(rad) * 140
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#E9C75F" strokeWidth={i % 2 === 0 ? 8 : 4} strokeLinecap="round"/>
        )
      })}
      {/* Sun body */}
      <circle cx="150" cy="150" r="78" fill="#E9C75F"/>
      <circle cx="150" cy="150" r="68" fill="#F1DA8C"/>
      {/* Simple face */}
      <circle cx="130" cy="142" r="8" fill="#E9C75F"/>
      <circle cx="170" cy="142" r="8" fill="#E9C75F"/>
      <circle cx="132" cy="140" r="4" fill="#2E2433"/>
      <circle cx="172" cy="140" r="4" fill="#2E2433"/>
      <path d="M130 165 Q150 182 170 165" stroke="#2E2433" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

const features = [
  { icon: '🤝', key: 'cooperation', label: 'Coopération', desc: "Jouez ensemble pour faire fleurir les cinq fleurs légendaires." },
  { icon: '👁', key: 'doubt', label: 'Doute', desc: "Méfiez-vous des Ronces qui se cachent parmi vous." },
  { icon: '🌸', key: 'poetry', label: 'Poésie', desc: "Un univers poétique et mystérieux pour tous les âges." },
]

export default function UniverseSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="univers" ref={ref} className="py-20 sm:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Sun illustration */}
        <motion.div
          className="flex items-center justify-center order-2 lg:order-1"
          initial={{ opacity: 0, scale: 0.7, rotate: -30 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
            <SunIllustration />
          </div>
        </motion.div>

        {/* Right: content */}
        <div className="order-1 lg:order-2 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-title text-3xl sm:text-4xl text-bloom-black">Bloom, le jardin</h2>
          </motion.div>

          <motion.p
            className="font-body text-bloom-gray-dark/70 text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Chaque année, les Jardiniers coopèrent pour faire éclore cinq fleurs légendaires.
          </motion.p>

          <motion.blockquote
            className="border-l-4 border-bloom-rose pl-5 py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-accent text-bloom-violet-dark text-lg sm:text-xl italic leading-relaxed">
              « Coopérez, fleurissez, mais gardez l&apos;œil ouvert. Tout peut fleurir. Même le doute. »
            </p>
          </motion.blockquote>

          <motion.p
            className="font-body text-bloom-gray-dark/70 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Un jeu de coopération et de trahison où chaque partie révèle une nouvelle dynamique.
            Faites confiance à vos coéquipiers — mais méfiez-vous des Ronces.
          </motion.p>

          <div className="grid grid-cols-3 gap-4 mt-2">
            {features.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <span className="text-2xl">{icon}</span>
                <p className="font-title text-sm text-bloom-black">{label}</p>
                <p className="font-body text-xs text-bloom-gray-dark/60 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
