'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── Cartes ressource pour la déco ────── */
const RESOURCE_MINI = [
  { label: 'Épine',   color: '#CF6B88', emoji: '🌵' },
  { label: 'Bouclier', color: '#4F4473', emoji: '🛡️' },
  { label: 'Sève',    color: '#6C855A', emoji: '🌿' },
  { label: 'Regard',  color: '#E9C75F', emoji: '👁' },
]

const camps = [
  {
    key: 'jardiniers',
    icon: '🌿',
    title: 'Les Jardiniers',
    badge: 'Coopèrent',
    badgeStyle: 'text-bloom-green bg-bloom-green/10 border border-bloom-green/20',
    bg: 'bg-bloom-green-light border-bloom-green/20',
    iconBg: 'bg-bloom-green/15',
    desc: 'Coopèrent pour faire éclore les fleurs et protéger le jardin de la corruption qui le menace.',
  },
  {
    key: 'ronces',
    icon: '🥀',
    title: 'Les Ronces',
    badge: 'Sabotent',
    badgeStyle: 'text-bloom-rose bg-bloom-rose/10 border border-bloom-rose/20',
    bg: 'bg-bloom-rose-light border-bloom-rose/20',
    iconBg: 'bg-bloom-rose/15',
    desc: 'Coopèrent pour planter et faire fleurir les cinq fleurs légendaires — en apparence seulement.',
  },
]

const steps = [
  { num: '01', title: 'Distribuez les rôles', desc: 'Chaque joueur reçoit secrètement une carte : Jardinier ou Ronce.' },
  { num: '02', title: 'Faites éclore',        desc: 'Coopérez pour planter et faire fleurir les cinq fleurs légendaires.' },
  { num: '03', title: 'Démasquez',             desc: 'Devinez, votez, démasquez les Ronces avant la dernière floraison.' },
]

export default function RulesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="regles" ref={ref} className="py-20 sm:py-28 px-6 bg-bloom-cream-light overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Titre centré */}
        <motion.div
          className="text-center flex flex-col gap-3"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <h2 className="font-title text-4xl sm:text-5xl text-bloom-black">Un jardin, deux camps</h2>
          <p className="font-body text-bloom-gray-dark/60 text-base max-w-md mx-auto leading-relaxed">
            Coopérez autour de la table, mais méfiez-vous&nbsp;: les Ronces se cachent parmi les Jardiniers.
          </p>
        </motion.div>

        {/* Cartes camps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {camps.map(({ key, icon, title, badge, badgeStyle, bg, iconBg, desc }, i) => (
            <motion.div
              key={key}
              className={`rounded-2xl border p-6 sm:p-7 flex flex-col gap-4 ${bg}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.12 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center text-2xl`}>
                  {icon}
                </div>
                <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${badgeStyle}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-title text-xl text-bloom-black">{title}</h3>
              <p className="font-body text-sm text-bloom-gray-dark/70 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 3 étapes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-bloom-violet-light/30">
          {steps.map(({ num, title, desc }, i) => (
            <motion.div
              key={num}
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
            >
              <span className="font-title text-5xl text-bloom-violet-light/50 leading-none">{num}</span>
              <h4 className="font-title text-base sm:text-lg text-bloom-black">{title}</h4>
              <p className="font-body text-sm text-bloom-gray-dark/60 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mini cartes ressource */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 pt-2"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {[
            { label: 'Eau',    color: '#95C6D8', emoji: '💧' },
            { label: 'Soleil', color: '#E9C75F', emoji: '☀️' },
            { label: 'Terre',  color: '#DBE4D4', emoji: '🌱' },
            { label: 'Vent',   color: '#C1ECFD', emoji: '🌬️' },
            { label: 'Pollen', color: '#CABFE3', emoji: '🌸' },
            ...RESOURCE_MINI,
          ].map(({ label, color, emoji }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-body font-semibold border"
              style={{ backgroundColor: color + '22', borderColor: color + '55', color: '#3D2E46' }}
            >
              <span>{emoji}</span>
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
