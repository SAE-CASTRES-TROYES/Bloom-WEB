'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { Menu, X, ShoppingCart, User, ShieldCheck } from 'lucide-react'
import LocaleSwitcher from './LocaleSwitcher'
import { useCartStore } from '@/lib/store/cart'
import { createClient } from '@/lib/supabase/client'
import { EASE_OUT } from '@/lib/motion'
import { btn } from '@/lib/ui'

export type NavUser = { email: string; pseudo: string; role: string } | null

function initials(name: string) {
  const p = name.trim().split(/\s+/)
  return (p.length >= 2 ? p[0][0] + p[1][0] : name.slice(0, 2)).toUpperCase()
}

export default function Navbar({ user }: { user: NavUser }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cartCount = useCartStore((s) => s.count())

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Synchronise la navbar avec les connexions/déconnexions sans rechargement.
  useEffect(() => {
    const supabase = createClient()
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') router.refresh()
    })
    return () => sub.subscription.unsubscribe()
  }, [router])

  const mainLinks = [
    { href: '/actualites', label: t('news') },
    { href: '/boutique',   label: t('shop') },
  ]

  const isAdmin = user?.role === 'admin'

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
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">

        {/* gauche — les deux liens, côte à côte */}
        <ul className="hidden md:flex items-center gap-7 justify-self-start text-lg font-semibold">
          {mainLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`transition-colors relative group ${
                  pathname.startsWith(href)
                    ? 'text-bloom-violet-dark'
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
          {isAdmin && (
            <li>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-bloom-rose hover:text-bloom-rose-dark transition-colors">
                <ShieldCheck size={18} /> {t('admin')}
              </Link>
            </li>
          )}
        </ul>

        {/* centre — l'icotype : élément phare + CTA retour accueil */}
        <Link
          href="/"
          aria-label={t('home_aria')}
          className="group order-first md:order-none justify-self-center flex items-center"
        >
          <Image
            src="/brand/icotype.webp" alt="Bloom"
            width={160} height={160}
            className="w-[72px] h-[72px] md:w-[100px] md:h-[100px] object-contain drop-shadow-sm transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3"
            priority
          />
        </Link>

        {/* droite — actions */}
        <div className="hidden md:flex items-center justify-self-end gap-3">
          <LocaleSwitcher />

          {cartCount > 0 && (
            <Link href="/panier" className="relative p-2 text-bloom-gray-dark/70 hover:text-bloom-violet-dark transition-colors">
              <ShoppingCart size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-bloom-rose text-white rounded-full text-[10px] font-bold flex items-center justify-center font-body">
                {cartCount}
              </span>
            </Link>
          )}

          {user ? (
            <Link
              href="/compte"
              className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full border border-bloom-violet-light hover:border-bloom-violet-medium hover:bg-bloom-violet-pale/50 transition-colors"
              aria-label="Mon profil"
            >
              <span className="w-8 h-8 rounded-full bg-bloom-violet-medium text-white text-xs font-bold flex items-center justify-center font-body">
                {initials(user.pseudo)}
              </span>
              <span className="font-body text-sm font-medium text-bloom-violet-dark max-w-[10ch] truncate">
                {user.pseudo}
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/connexion"
                className="font-body text-[0.9rem] font-medium text-bloom-gray-dark hover:text-bloom-violet-dark transition-colors flex items-center gap-1.5 px-1"
              >
                <User size={16} />
                {t('login')}
              </Link>
              <Link href="/inscription" className={btn('soft', 'sm')}>
                {t('register')}
              </Link>
            </>
          )}
        </div>

        {/* mobile — panier + burger */}
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
              className="font-body text-base font-semibold py-2 text-bloom-gray-dark border-b border-bloom-violet-light/20 last:border-0">
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-1">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" onClick={() => setOpen(false)}
                    className="font-body text-sm text-bloom-rose py-2 flex items-center gap-2">
                    <ShieldCheck size={15}/> {t('admin')}
                  </Link>
                )}
                <Link href="/compte" onClick={() => setOpen(false)} className={btn('soft', 'sm')}>
                  {t('profile')} ({user.pseudo})
                </Link>
              </>
            ) : (
              <>
                <Link href="/connexion" onClick={() => setOpen(false)}
                  className="font-body text-sm text-bloom-violet-dark py-2 flex items-center gap-2">
                  <User size={15}/> {t('login')}
                </Link>
                <Link href="/inscription" onClick={() => setOpen(false)} className={btn('soft', 'sm')}>
                  {t('register')}
                </Link>
                <Link href="/jeu" onClick={() => setOpen(false)} className={btn('primary', 'sm')}>
                  {t('play')}
                </Link>
              </>
            )}
          </div>
          <LocaleSwitcher />
        </div>
      )}
    </motion.header>
  )
}
