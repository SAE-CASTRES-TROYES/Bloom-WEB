'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const camps = [
  {
    key: 'jardiniers',
    icon: '🌿',
    title: 'Les Jardiniers',
    badge: 'Coopèrent',
    badgeColor: 'text-bloom-green bg-bloom-green/10 border-bloom-green/20',
    bg: 'bg-bloom-green-light border-bloom-green/20',
    iconBg: 'bg-bloom-green/20',
    desc: "Coopèrent pour faire éclore les fleurs et protèger le jardin de la corruption qui le menace.",
  },
  {
    key: 'ronces',
    icon: '🥀',
    title: 'Les Ronces',
    badge: 'Sabotent',
    badgeColor: 'text-bloom-rose bg-bloom-rose/10 border-bloom-rose/20',
    bg: 'bg-bloom-rose-light border-bloom-rose/20',
    iconBg: 'bg-bloom-rose/20',
    desc: "Coopèrent pour planter et faire fleurir les cinq fleurs légendaires — en apparence seulement.",
  },
]

const steps = [
  { num: '01', title: 'Distribuez les rôles', desc: "Chaque joueur reçoit secrètement une carte : Jardinier ou Ronce." },
  { num: '02', title: 'Faites éclore', desc: "Coopérez pour planter et faire fleurir les cinq fleurs légendaires." },
  { num: '03', title: 'Démasquez', desc: "Devinez, votez, démasquez les Ronces avant la dernière floraison." },
]

export default function RulesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="regles" ref={ref} className="py-20 sm:py-28 px-6 bg-bloom-cream-light">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {/* Header */}
        <motion.div
          className="text-center flex flex-col gap-3 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-title text-3xl sm:text-4xl lg:text-5xl text-bloom-black">
            Un jardin, deux camps
          </h2>
          <p className="font-body text-bloom-gray-dark/60 text-base">
            Coopérez autour de la table, mais méfiez-vous : les Ronces se cachent parmi les Jardiniers.
          </p>
        </motion.div>

        {/* Two camp cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {camps.map(({ key, icon, title, badge, badgeColor, bg, iconBg, desc }, i) => (
            <motion.div
              key={key}
              className={`rounded-2xl border p-6 flex flex-col gap-4 ${bg}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-xl`}>
                  {icon}
                </div>
                <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full border ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-title text-xl text-bloom-black">{title}</h3>
              <p className="font-body text-sm text-bloom-gray-dark/70 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3 steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4 border-t border-bloom-violet-light/30">
          {steps.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            >
              <span className="font-title text-4xl text-bloom-violet-light/60">{num}</span>
              <h4 className="font-title text-lg text-bloom-black">{title}</h4>
              <p className="font-body text-sm text-bloom-gray-dark/60 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
