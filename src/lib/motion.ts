import type { Variants, Transition } from 'framer-motion'

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const SPRING: Transition = { type: 'spring', stiffness: 120, damping: 18, mass: 0.9 }
export const SPRING_SOFT: Transition = { type: 'spring', stiffness: 90, damping: 20, mass: 1 }

export const blurUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.97 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
}

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const lineMask: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 0.9, ease: EASE_OUT } },
}

export const viewportOnce = { once: true, margin: '-90px' } as const
