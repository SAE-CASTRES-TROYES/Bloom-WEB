'use client'

import { motion, type Variants } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/* Botanical decorative SVG — lavender-inspired */
function LavenderIllustration() {
  return (
    <svg viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden>
      {/* Main stem */}
      <path d="M200 480 C200 480 195 300 200 200" stroke="#8F77C7" strokeWidth="3" strokeLinecap="round"/>
      {/* Left branch */}
      <path d="M200 320 C180 280 140 260 120 240" stroke="#8F77C7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Right branch */}
      <path d="M200 300 C220 265 255 245 275 225" stroke="#8F77C7" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Left branch 2 */}
      <path d="M200 260 C175 225 145 210 125 195" stroke="#8F77C7" strokeWidth="2" strokeLinecap="round"/>
      {/* Right branch 2 */}
      <path d="M200 245 C225 210 255 195 278 180" stroke="#8F77C7" strokeWidth="2" strokeLinecap="round"/>
      {/* Flower clusters - left */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={`fl-${i}`}
          cx={120 - i * 5 + Math.sin(i) * 8} cy={240 - i * 12}
          rx="8" ry="12"
          fill="#CABFE3" opacity="0.85"
          transform={`rotate(${-15 + i * 5} ${120 - i*5} ${240 - i*12})`}
        />
      ))}
      {/* Flower clusters - right */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={`fr-${i}`}
          cx={275 + i * 4 + Math.sin(i) * 6} cy={225 - i * 11}
          rx="8" ry="12"
          fill="#8F77C7" opacity="0.7"
          transform={`rotate(${15 - i * 4} ${275 + i*4} ${225 - i*11})`}
        />
      ))}
      {/* Small flowers top clusters */}
      {[0,1,2,3,4].map(i => (
        <ellipse key={`ft-${i}`}
          cx={195 + Math.cos(i * 1.2) * 15} cy={200 - i * 14}
          rx="7" ry="11"
          fill="#4F4473" opacity="0.6"
          transform={`rotate(${i * 8 - 10} ${195} ${200 - i*14})`}
        />
      ))}
      {/* Left branch 2 flowers */}
      {[0,1,2,3].map(i => (
        <ellipse key={`fl2-${i}`}
          cx={125 - i * 4} cy={195 - i * 12}
          rx="7" ry="10"
          fill="#CABFE3" opacity="0.75"
          transform={`rotate(-20 ${125 - i*4} ${195 - i*12})`}
        />
      ))}
      {/* Right branch 2 flowers */}
      {[0,1,2,3].map(i => (
        <ellipse key={`fr2-${i}`}
          cx={278 + i * 5} cy={180 - i * 11}
          rx="7" ry="10"
          fill="#8F77C7" opacity="0.65"
          transform={`rotate(20 ${278 + i*5} ${180 - i*11})`}
        />
      ))}
      {/* Leaves */}
      <path d="M200 380 C170 360 155 340 160 320 C175 335 185 355 200 380Z" fill="#6C855A" opacity="0.5"/>
      <path d="M200 360 C228 340 242 320 238 300 C224 315 213 335 200 360Z" fill="#6C855A" opacity="0.4"/>
      <path d="M200 420 C172 405 162 385 168 368 C180 382 190 400 200 420Z" fill="#6C855A" opacity="0.35"/>
      {/* Decorative small dots */}
      {[...Array(12)].map((_, i) => (
        <circle key={`d-${i}`}
          cx={100 + Math.random() * 200} cy={100 + i * 30}
          r="2" fill="#CABFE3" opacity="0.4"
        />
      ))}
    </svg>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

export default function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative bg-bloom-cream-light overflow-hidden min-h-[88vh] flex items-center">
      {/* Subtle botanical background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" opacity="0.04">
          <defs>
            <pattern id="botanical" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M60 10 C60 10 40 40 60 60 C80 40 60 10 60 10Z" fill="#4F4473"/>
              <path d="M20 80 C30 60 50 65 40 90 C30 90 15 85 20 80Z" fill="#CF6B88"/>
              <path d="M100 50 C110 35 120 45 110 65 C100 65 90 55 100 50Z" fill="#8F77C7"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanical)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden">
            <motion.h1
              className="font-title text-5xl sm:text-6xl lg:text-7xl text-bloom-black leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              Faites éclore les
            </motion.h1>
          </div>
          <div className="overflow-hidden -mt-3">
            <motion.p
              className="font-title text-5xl sm:text-6xl lg:text-7xl text-bloom-rose leading-tight"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              Fleurs Légendaires
            </motion.p>
          </div>

          <motion.p
            className="font-body text-bloom-gray-dark/70 text-base sm:text-lg max-w-md leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
          >
            <Link
              href="/jeu"
              className="inline-flex items-center gap-2 bg-bloom-rose text-white rounded-full px-8 py-4 font-body font-semibold text-base hover:bg-bloom-rose/90 active:scale-95 transition-all shadow-md shadow-bloom-rose/20"
            >
              Jouer maintenant
            </Link>
          </motion.div>
        </div>

        {/* Right: botanical illustration */}
        <motion.div
          className="flex items-center justify-center h-64 lg:h-[500px]"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <LavenderIllustration />
        </motion.div>
      </div>
    </section>
  )
}
