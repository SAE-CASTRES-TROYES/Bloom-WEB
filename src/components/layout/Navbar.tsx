'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { Menu, X } from 'lucide-react'
import LocaleSwitcher from './LocaleSwitcher'

export default function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '/actualites', label: t('news') },
    { href: '/boutique', label: t('shop') },
  ]

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-bloom-cream-light/95 backdrop-blur-md shadow-sm'
        : 'bg-bloom-cream-light/80 backdrop-blur-sm'
    }`}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="Bloom" width={36} height={36} priority className="w-9 h-9" />
          <span className="font-title text-xl text-bloom-violet-dark hidden sm:block">Bloom</span>
        </Link>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`font-body text-sm transition-colors hover:text-bloom-violet-dark ${
                  pathname.startsWith(href)
                    ? 'text-bloom-violet-dark font-semibold'
                    : 'text-bloom-gray-dark'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: locale + auth */}
        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/connexion"
            className="font-body text-sm text-bloom-violet-dark px-4 py-1.5 hover:text-bloom-rose transition-colors"
          >
            {t('login')}
          </Link>
          <Link
            href="/inscription"
            className="font-body text-sm border border-bloom-violet-dark text-bloom-violet-dark rounded-full px-5 py-1.5 hover:bg-bloom-violet-dark hover:text-white transition-colors"
          >
            Inscription
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-bloom-gray-dark p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bloom-cream-light border-t border-bloom-violet-light/20 px-6 py-4 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-body text-sm py-2 text-bloom-gray-dark border-b border-bloom-violet-light/20 last:border-0"
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link href="/connexion" onClick={() => setOpen(false)} className="font-body text-sm text-bloom-violet-dark py-2">
              {t('login')}
            </Link>
            <Link href="/inscription" onClick={() => setOpen(false)} className="font-body text-sm border border-bloom-violet-dark text-bloom-violet-dark rounded-full px-5 py-2 text-center">
              Inscription
            </Link>
          </div>
          <div className="pt-1">
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  )
}
