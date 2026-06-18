import { Suspense } from 'react'
import HeroSection from '@/components/home/HeroSection'
import UniverseSection from '@/components/home/UniverseSection'
import RulesSection from '@/components/home/RulesSection'
import NewsSection from '@/components/home/NewsSection'
import LeaderboardSection from '@/components/home/LeaderboardSection'
import ContactSection from '@/components/home/ContactSection'

function Spinner() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-bloom-violet-light border-t-bloom-violet-dark animate-spin" />
    </div>
  )
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <UniverseSection />
      <Suspense fallback={<Spinner />}>
        <LeaderboardSection />
      </Suspense>
      <RulesSection />
      <Suspense fallback={<Spinner />}>
        <NewsSection />
      </Suspense>
      <ContactSection />
    </main>
  )
}
