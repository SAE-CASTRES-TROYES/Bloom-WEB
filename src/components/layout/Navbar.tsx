'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import LocaleSwitcher from './LocaleSwitcher'
import { useCartStore } from '@/lib/store/cart'
import { EASE_OUT } from '@/lib/motion'

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cartCount = useCartStore((s) => s.count())

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const mainLinks = [
    { href: '/actualites', label: t('news') },
    { href: '/boutique',   label: t('shop') },
  ]

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bloom-cream-light/85 backdrop-blur-md shadow-sm shadow-bloom-violet-light/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

        <Link href="/" className="flex items-center shrink-0 group -my-2" aria-label="Bloom — accueil">
          <Image
            src="/brand/icotype.png" alt="Bloom"
            width={72} height={72}
            className="w-[68px] h-[68px] object-contain group-hover:scale-110 transition-transform duration-300"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {mainLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body text-[0.9rem] transition-colors relative group ${
                  pathname.startsWith(href)
                    ? 'text-bloom-violet-dark font-semibold'
                    : 'text-bloom-gray-dark/80 hover:text-bloom-violet-dark'
                }`}
              >
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-bloom-rose rounded-full transition-all duration-200 ${
                  pathname.startsWith(href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}/>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />

          {cartCount > 0 && (
            <Link href="/panier" className="relative p-2 text-bloom-gray-dark/70 hover:text-bloom-violet-dark transition-colors">
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bloom-rose text-white rounded-full text-[10px] font-bold flex items-center justify-center font-body">
                {cartCount}
              </span>
            </Link>
          )}

          <Link
            href="/connexion"
            className="font-body text-[0.9rem] font-medium text-bloom-gray-dark hover:text-bloom-violet-dark transition-colors flex items-center gap-1.5 px-1"
          >
            <User size={16} />
            {t('login')}
          </Link>

          <Link
            href="/inscription"
            className="font-body text-[0.85rem] font-semibold bg-bloom-violet-light text-bloom-violet-dark rounded-full px-5 py-2 hover:bg-bloom-violet-medium hover:text-white transition-colors"
          >
            Inscription
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          {cartCount > 0 && (
            <Link href="/panier" className="relative p-1.5 text-bloom-gray-dark/70">
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bloom-rose text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
          )}
          <button
            className="p-1.5 text-bloom-gray-dark"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-bloom-cream-light/95 backdrop-blur-md border-t border-bloom-violet-light/20 px-6 py-5 flex flex-col gap-4">
          {mainLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className="font-body text-sm py-2 text-bloom-gray-dark border-b border-bloom-violet-light/20 last:border-0">
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-1">
            <Link href="/connexion" onClick={() => setOpen(false)}
              className="font-body text-sm text-bloom-violet-dark py-2 flex items-center gap-2">
              <User size={15}/> {t('login')}
            </Link>
            <Link href="/inscription" onClick={() => setOpen(false)}
              className="font-body text-sm bg-bloom-violet-light text-bloom-violet-dark rounded-full px-5 py-2 text-center font-semibold">
              Inscription
            </Link>
            <Link href="/jeu" onClick={() => setOpen(false)}
              className="font-body text-sm bg-bloom-green text-white rounded-full px-5 py-2 text-center font-semibold">
              {t('play')}
            </Link>
          </div>
          <LocaleSwitcher />
        </div>
      )}
    </motion.header>
  )
}
