'use client'

import { motion } from 'framer-motion'
import { Sprout, VenetianMask } from 'lucide-react'
import { blurUp, staggerParent, viewportOnce } from '@/lib/motion'
import ResourceMarquee from './ResourceMarquee'

const camps = [
  {
    key: 'jardiniers',
    Icon: Sprout,
    title: 'Les Jardiniers',
    badge: 'Coopèrent',
    badgeStyle: 'text-bloom-green bg-bloom-green/10 border border-bloom-green/20',
    bg: 'bg-bloom-green-light border-bloom-green/20',
    iconBg: 'bg-bloom-green text-white',
    desc: 'Coopèrent pour faire éclore les fleurs et protéger le jardin de la corruption qui le menace.',
  },
  {
    key: 'ronces',
    Icon: VenetianMask,
    title: 'Les Ronces',
    badge: 'Sabotent',
    badgeStyle: 'text-bloom-rose bg-bloom-rose/10 border border-bloom-rose/20',
    bg: 'bg-bloom-rose-light border-bloom-rose/20',
    iconBg: 'bg-bloom-rose text-white',
    desc: 'Coopèrent pour planter et faire fleurir les cinq fleurs légendaires — en apparence seulement.',
  },
]

const steps = [
  { num: '01', title: 'Distribuez les rôles', desc: 'Chaque joueur reçoit secrètement une carte : Jardinier ou Ronce.' },
  { num: '02', title: 'Faites éclore',        desc: 'Coopérez pour planter et faire fleurir les cinq fleurs légendaires.' },
  { num: '03', title: 'Démasquez',             desc: 'Devinez, votez, démasquez les Ronces avant la dernière floraison.' },
]

export default function RulesSection() {
  return (
    <section id="regles" className="py-20 sm:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        <motion.div
          className="text-center flex flex-col gap-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.h2 variants={blurUp} className="font-title text-4xl sm:text-5xl text-bloom-black">
            Un jardin, deux camps
          </motion.h2>
          <motion.p variants={blurUp} className="font-body text-bloom-gray-dark/60 text-base max-w-md mx-auto leading-relaxed">
            Coopérez autour de la table, mais méfiez-vous&nbsp;: les Ronces se cachent parmi les Jardiniers.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {camps.map(({ key, Icon, title, badge, badgeStyle, bg, iconBg, desc }) => (
            <motion.div
              key={key}
              variants={blurUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`rounded-2xl border p-6 sm:p-7 flex flex-col gap-4 ${bg}`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <span className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${badgeStyle}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-title text-xl text-bloom-black">{title}</h3>
              <p className="font-body text-sm text-bloom-gray-dark/70 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-bloom-violet-light/30"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {steps.map(({ num, title, desc }) => (
            <motion.div key={num} variants={blurUp} className="flex flex-col gap-2">
              <span className="font-title text-5xl text-bloom-violet-light/50 leading-none">{num}</span>
              <h4 className="font-title text-base sm:text-lg text-bloom-black">{title}</h4>
              <p className="font-body text-sm text-bloom-gray-dark/60 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
        >
          <p className="font-accent text-bloom-rose text-center text-xl mb-6">Les cartes du jardin</p>
          <ResourceMarquee />
        </motion.div>
      </div>
    </section>
  )
}
