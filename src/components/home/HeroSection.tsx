'use client'

import { motion, type Variants, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* ─── Cartes ressource flottantes ──────────────────────────────── */
const RESOURCE_CARDS = [
  { label: 'Eau',    color: '#95C6D8', emoji: '💧', x: '72%', y: '15%', rot: 12,  delay: 0 },
  { label: 'Soleil', color: '#E9C75F', emoji: '☀️', x: '82%', y: '55%', rot: -8, delay: 0.3 },
  { label: 'Pollen', color: '#CABFE3', emoji: '🌸', x: '65%', y: '75%', rot: 5,  delay: 0.6 },
  { label: 'Vent',   color: '#C1ECFD', emoji: '🌬️', x: '5%',  y: '65%', rot: -15, delay: 0.9 },
  { label: 'Terre',  color: '#DBE4D4', emoji: '🌱', x: '10%', y: '20%', rot: 10,  delay: 1.2 },
]

function FloatingCard({ label, color, emoji, x, y, rot, delay }: typeof RESOURCE_CARDS[0]) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none hidden lg:flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-2 shadow-md backdrop-blur-sm"
      style={{ left: x, top: y, borderColor: color, backgroundColor: color + '22' }}
      initial={{ opacity: 0, y: 20, rotate: rot - 5 }}
      animate={{
        opacity: 0.85,
        y: [0, -8, 0],
        rotate: [rot, rot + 3, rot],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        y: { delay, duration: 3, repeat: Infinity, ease: 'easeInOut' },
        rotate: { delay, duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <span className="text-lg">{emoji}</span>
      <span className="font-title text-xs font-semibold" style={{ color: '#3D2E46' }}>{label}</span>
    </motion.div>
  )
}

/* ─── Illustration Lavande ──────────────────────────────────────── */
function LavenderIllustration() {
  return (
    <svg viewBox="0 0 380 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg" aria-hidden>
      {/* Tiges principales */}
      <path d="M190 470 C190 470 186 340 190 210" stroke="#8F77C7" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M210 470 C210 470 208 360 215 230" stroke="#6C855A" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M172 470 C172 470 168 370 170 240" stroke="#8F77C7" strokeWidth="2" strokeLinecap="round"/>

      {/* Branches gauches */}
      <path d="M190 330 C165 295 128 278 108 258" stroke="#8F77C7" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M190 280 C162 248 138 235 115 218" stroke="#8F77C7" strokeWidth="2" strokeLinecap="round"/>
      <path d="M190 240 C168 210 148 198 130 185" stroke="#CABFE3" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Branches droites */}
      <path d="M190 315 C215 278 248 262 268 245" stroke="#8F77C7" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M190 268 C218 238 245 224 265 210" stroke="#8F77C7" strokeWidth="2" strokeLinecap="round"/>
      <path d="M190 232 C215 204 240 192 258 180" stroke="#CABFE3" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Fleurs gauche bas */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={`gl-${i}`} cx={108 - i*4 + Math.sin(i)*5} cy={258 - i*13} rx="9" ry="14"
          fill={i % 2 === 0 ? '#CABFE3' : '#8F77C7'} opacity={0.82 - i*0.05}
          transform={`rotate(${-18 + i*4} ${108 - i*4} ${258 - i*13})`}/>
      ))}
      {/* Fleurs gauche haut */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`gh-${i}`} cx={115 - i*3} cy={218 - i*12} rx="8" ry="12"
          fill={i % 2 === 0 ? '#8F77C7' : '#4F4473'} opacity={0.75 - i*0.06}
          transform={`rotate(-20 ${115 - i*3} ${218 - i*12})`}/>
      ))}
      {/* Fleurs gauche très haut */}
      {[0,1,2,3].map(i => (
        <ellipse key={`gvh-${i}`} cx={130 - i*3} cy={185 - i*11} rx="7" ry="10"
          fill="#CABFE3" opacity={0.65 - i*0.08}
          transform={`rotate(-15 ${130-i*3} ${185-i*11})`}/>
      ))}

      {/* Fleurs droite bas */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={`dr-${i}`} cx={268 + i*4} cy={245 - i*12} rx="9" ry="14"
          fill={i % 2 === 0 ? '#8F77C7' : '#CABFE3'} opacity={0.80 - i*0.05}
          transform={`rotate(${18 - i*3} ${268 + i*4} ${245 - i*12})`}/>
      ))}
      {/* Fleurs droite haut */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`dh-${i}`} cx={265 + i*4} cy={210 - i*11} rx="8" ry="12"
          fill={i % 2 === 0 ? '#4F4473' : '#8F77C7'} opacity={0.72 - i*0.06}
          transform={`rotate(20 ${265+i*4} ${210-i*11})`}/>
      ))}
      {/* Fleurs droite très haut */}
      {[0,1,2,3].map(i => (
        <ellipse key={`dvh-${i}`} cx={258 + i*4} cy={180 - i*10} rx="7" ry="10"
          fill="#CABFE3" opacity={0.62 - i*0.08}
          transform={`rotate(15 ${258+i*4} ${180-i*10})`}/>
      ))}

      {/* Fleurs sommet */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`s-${i}`} cx={190 + Math.cos(i * 1.3) * 16} cy={210 - i*14} rx="8" ry="13"
          fill={['#4F4473','#8F77C7','#CABFE3','#4F4473','#8F77C7'][i]} opacity={0.78 - i*0.05}
          transform={`rotate(${i*10-20} ${190} ${210-i*14})`}/>
      ))}

      {/* Feuilles */}
      <path d="M190 390 C160 368 148 345 154 326 C170 342 182 364 190 390Z" fill="#6C855A" opacity="0.55"/>
      <path d="M190 365 C220 344 232 322 228 304 C213 319 200 340 190 365Z" fill="#6C855A" opacity="0.45"/>
      <path d="M190 420 C165 405 155 383 161 367 C175 381 184 400 190 420Z" fill="#6C855A" opacity="0.40"/>
      <path d="M210 380 C230 362 238 342 234 326 C220 340 213 360 210 380Z" fill="#6C855A" opacity="0.35"/>

      {/* Petites fleurs décoratives */}
      {[
        [60, 300], [320, 280], [80, 180], [300, 340], [150, 150], [240, 160],
      ].map(([cx, cy], i) => (
        <g key={`d-${i}`} transform={`translate(${cx},${cy})`} opacity="0.3">
          {[0,60,120,180,240,300].map(angle => (
            <ellipse key={angle} cx={Math.cos(angle*Math.PI/180)*6} cy={Math.sin(angle*Math.PI/180)*6} rx="3" ry="5"
              fill="#CABFE3" transform={`rotate(${angle})`}/>
          ))}
        </g>
      ))}
    </svg>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
}

export default function HeroSection() {
  const t = useTranslations('home.hero')
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const illustrationY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])

  return (
    <section ref={ref} className="relative bg-bloom-cream-light overflow-hidden min-h-[90vh] flex items-center">
      {/* Botanical watermark texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="botanical-bg" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
              {/* Feuille stylisée */}
              <path d="M80 18 C80 18 50 60 80 95 C110 60 80 18 80 18Z" fill="#4F4473"/>
              <path d="M28 110 C40 85 68 90 55 120 C40 122 22 118 28 110Z" fill="#CF6B88"/>
              <path d="M132 68 C144 48 156 60 148 84 C136 86 124 76 132 68Z" fill="#8F77C7"/>
              <circle cx="80" cy="148" r="6" fill="#E9C75F"/>
              <path d="M20 30 C25 20 35 22 32 38 C24 40 16 36 20 30Z" fill="#6C855A"/>
              <path d="M140 130 C145 120 155 123 152 138 C144 140 136 136 140 130Z" fill="#95C6D8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanical-bg)"/>
        </svg>
      </div>

      {/* Floating resource cards */}
      {RESOURCE_CARDS.map((card) => <FloatingCard key={card.label} {...card} />)}

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 lg:gap-4 items-center w-full">
        {/* Left column */}
        <div className="flex flex-col gap-5 lg:gap-6">
          <div className="flex flex-col gap-1">
            <motion.h1
              className="font-title text-6xl sm:text-7xl lg:text-8xl text-bloom-black leading-none tracking-tight"
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
            >
              Faites éclore les
            </motion.h1>
            <motion.p
              className="font-title text-6xl sm:text-7xl lg:text-8xl text-bloom-rose leading-none tracking-tight"
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
              className="inline-flex items-center gap-2 bg-bloom-rose text-white rounded-full px-8 py-3.5 font-body font-semibold text-base hover:bg-bloom-rose/90 active:scale-95 transition-all shadow-lg shadow-bloom-rose/25"
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

        {/* Right column — illustration avec parallax */}
        <motion.div
          className="flex items-center justify-center order-first lg:order-last"
          style={{ y: illustrationY }}
          initial={{ opacity: 0, x: 50, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[420px] lg:h-[420px]">
            <LavenderIllustration />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
