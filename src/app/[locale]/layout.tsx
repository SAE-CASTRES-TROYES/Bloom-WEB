import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import localFont from 'next/font/local'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '../globals.css'

const alice = localFont({
  src: '../../../public/alice-regular.ttf',
  variable: '--font-alice',
  display: 'swap',
})

const karla = localFont({
  src: '../../../public/karla-variable.ttf',
  variable: '--font-karla',
  display: 'swap',
})

const dancingScript = localFont({
  src: '../../../public/dancing-script-regular.ttf',
  variable: '--font-dancing-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bloom — Tout peut fleurir. Même le doute.',
  description:
    'Bloom est un jeu de cartes hybride coopératif et de trahison. Découvrez l\'univers, les règles, et commandez votre exemplaire.',
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={`${alice.variable} ${karla.variable} ${dancingScript.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-bloom-cream-light text-bloom-gray-dark">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
