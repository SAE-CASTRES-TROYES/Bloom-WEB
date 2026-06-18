import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import { Newspaper, ShoppingBag, MapPin } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [news, products, retailers] = await Promise.all([
    supabase.from('news').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('retailers').select('id', { count: 'exact', head: true }),
  ])

  const cards = [
    { label: 'Actualités', count: news.count ?? 0, href: '/admin/actualites', Icon: Newspaper },
    { label: 'Produits', count: products.count ?? 0, href: '/admin/produits', Icon: ShoppingBag },
    { label: 'Revendeurs', count: retailers.count ?? 0, href: '/admin/revendeurs', Icon: MapPin },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {cards.map(({ label, count, href, Icon }) => (
        <Link
          key={href}
          href={href}
          className="bg-white rounded-2xl p-6 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-3 hover:border-bloom-violet-medium transition-colors"
        >
          <span className="w-11 h-11 rounded-xl bg-bloom-violet-pale text-bloom-violet-dark flex items-center justify-center">
            <Icon size={20} />
          </span>
          <span className="font-title text-3xl text-bloom-violet-dark">{count}</span>
          <span className="font-body text-sm text-bloom-gray-dark/65">{label}</span>
        </Link>
      ))}
    </div>
  )
}
