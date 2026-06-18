'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'

const MapEmbed = dynamic(() => import('./MapEmbed'), { ssr: false, loading: () => (
  <div className="w-full h-[500px] rounded-2xl bg-bloom-violet-pale flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-bloom-violet-light border-t-bloom-violet-dark animate-spin" />
  </div>
)})

export type Retailer = {
  id: string
  name: string
  address: string | null
  lat: number
  lng: number
  country: string
  type: string | null
  website: string | null
}

const COUNTRIES = ['Tous', 'FR', 'BE', 'CH', 'LU', 'CA']
const TYPES = ['Tous', 'Boutique spécialisée', 'Grande surface', 'En ligne']

export default function StoreLocatorMap({ retailers }: { retailers: Retailer[] }) {
  const t = useTranslations('locator')
  const [country, setCountry] = useState('Tous')
  const [type, setType] = useState('Tous')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => retailers.filter((r) => {
    if (country !== 'Tous' && r.country !== country) return false
    if (type !== 'Tous' && r.type !== type) return false
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  }), [retailers, country, type, search])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search_ph')}
          className="border border-bloom-violet-light rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors min-w-[200px]"
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-bloom-violet-light rounded-xl px-4 py-2 text-sm bg-white focus:outline-none"
        >
          {COUNTRIES.map((c) => <option key={c} value={c}>{c === 'Tous' ? t('all') : c}</option>)}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-bloom-violet-light rounded-xl px-4 py-2 text-sm bg-white focus:outline-none"
        >
          {TYPES.map((tp) => <option key={tp} value={tp}>{tp === 'Tous' ? t('all') : tp}</option>)}
        </select>
        <span className="font-body text-sm text-bloom-violet-medium self-center">
          {t('count', { count: filtered.length })}
        </span>
      </div>

      <MapEmbed retailers={filtered} />

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-2">
              <p className="font-title text-base text-bloom-violet-dark">{r.name}</p>
              {r.address && <p className="font-body text-sm text-bloom-gray-dark/70">{r.address}</p>}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-body text-xs bg-bloom-violet-pale text-bloom-violet-dark px-2 py-0.5 rounded-full">{r.country}</span>
                {r.type && <span className="font-body text-xs bg-bloom-cream text-bloom-gray-dark px-2 py-0.5 rounded-full">{r.type}</span>}
              </div>
              {r.website && (
                <a href={r.website} target="_blank" rel="noopener noreferrer"
                  className="font-body text-xs text-bloom-rose hover:underline mt-1">
                  {t('visit')}
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-body text-bloom-violet-medium">{t('no_results')}</p>
        </div>
      )}
    </div>
  )
}
