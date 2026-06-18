'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

/* ─── Soleil SVG — fidèle à la maquette ─── */
function SunIllustration() {
  const rays = Array.from({ length: 18 }, (_, i) => {
    const angle = (i * 360) / 18
    const rad = (angle * Math.PI) / 180
    const inner = i % 2 === 0 ? 82 : 75
    const outer = i % 2 === 0 ? 142 : 120
    return { rad, inner, outer, thick: i % 2 === 0 }
  })

  return (
    <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      {/* Lueur */}
      <circle cx="150" cy="150" r="145" fill="#E9C75F" opacity="0.08"/>
      {/* Rayons */}
      {rays.map(({ rad, inner, outer, thick }, i) => (
        <line key={i}
          x1={150 + Math.cos(rad) * inner} y1={150 + Math.sin(rad) * inner}
          x2={150 + Math.cos(rad) * outer} y2={150 + Math.sin(rad) * outer}
          stroke="#E9C75F" strokeWidth={thick ? 9 : 5} strokeLinecap="round"/>
      ))}
      {/* Corps */}
      <circle cx="150" cy="150" r="72" fill="#E9C75F"/>
      <circle cx="150" cy="150" r="62" fill="#F1DA8C"/>
      {/* Yeux */}
      <circle cx="132" cy="142" r="9" fill="#E9C75F"/>
      <circle cx="168" cy="142" r="9" fill="#E9C75F"/>
      <circle cx="133" cy="140" r="5" fill="#2E2433"/>
      <circle cx="169" cy="140" r="5" fill="#2E2433"/>
      {/* Reflets yeux */}
      <circle cx="135" cy="138" r="2" fill="white" opacity="0.6"/>
      <circle cx="171" cy="138" r="2" fill="white" opacity="0.6"/>
      {/* Sourire */}
      <path d="M133 167 Q150 184 167 167" stroke="#2E2433" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

const features = [
  { icon: '🤝', label: 'Coopération', desc: 'Jouez ensemble pour faire éclore les cinq fleurs légendaires.' },
  { icon: '👁', label: 'Doute',       desc: 'Méfiez-vous des Ronces qui se cachent parmi vous.' },
  { icon: '🌸', label: 'Poésie',      desc: 'Un univers poétique et mystérieux pour tous les âges.' },
]

export default function UniverseSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunRotate = useTransform(scrollYProgress, [0, 1], ['-10deg', '10deg'])
  const sunScale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.9])

  return (
    <section id="univers" ref={ref} className="py-20 sm:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        {/* Soleil avec rotation au scroll */}
        <motion.div
          className="flex items-center justify-center order-2 lg:order-1"
          style={{ rotate: sunRotate, scale: sunScale }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <SunIllustration />
          </div>
        </motion.div>

        {/* Contenu */}
        <div className="order-1 lg:order-2 flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-title text-3xl sm:text-4xl text-bloom-black">Bloom, le jardin</h2>
          </motion.div>

          <motion.p
            className="font-body text-bloom-gray-dark/65 text-base leading-relaxed"
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Chaque année, les Jardiniers coopèrent pour faire éclore cinq fleurs légendaires.
          </motion.p>

          <motion.blockquote
            className="border-l-4 border-bloom-rose pl-5 py-1"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18 }}
          >
            <p className="font-accent text-bloom-violet-dark text-xl sm:text-2xl italic leading-snug">
              «&nbsp;Coopérez, fleurissez, mais gardez l&apos;œil ouvert. Tout peut fleurir. Même le doute.&nbsp;»
            </p>
          </motion.blockquote>

          <motion.p
            className="font-body text-bloom-gray-dark/65 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            Un jeu de coopération et de trahison où chaque partie révèle une nouvelle dynamique de groupe.
            Faites confiance à vos coéquipiers&nbsp;— mais méfiez-vous des Ronces.
          </motion.p>

          {/* 3 features */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {features.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.34 + i * 0.1 }}
              >
                <div className="w-9 h-9 rounded-xl bg-bloom-violet-pale/70 flex items-center justify-center text-xl">
                  {icon}
                </div>
                <p className="font-title text-sm text-bloom-black">{label}</p>
                <p className="font-body text-xs text-bloom-gray-dark/55 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
