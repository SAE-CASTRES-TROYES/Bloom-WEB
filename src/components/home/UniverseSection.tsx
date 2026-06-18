'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const features = [
  { icon: '🤝', label: 'Coopération', desc: 'Jouez ensemble pour faire éclore les cinq fleurs légendaires.' },
  { icon: '👁', label: 'Doute',       desc: 'Méfiez-vous des Ronces qui se cachent parmi vous.' },
  { icon: '🌸', label: 'Poésie',      desc: 'Un univers poétique et mystérieux pour tous les âges.' },
]

export default function UniverseSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sunRotate = useTransform(scrollYProgress, [0, 1], ['-8deg', '8deg'])
  const sunScale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.88, 1, 0.92])

  return (
    <section id="univers" ref={ref} className="py-20 sm:py-28 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

        <motion.div
          className="flex items-center justify-center order-2 lg:order-1"
          style={{ rotate: sunRotate, scale: sunScale }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
            <Image
              src="/soleil.webp"
              alt="Soleil illustré"
              width={320}
              height={320}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

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
