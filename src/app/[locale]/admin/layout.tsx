import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'

const tabs = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/actualites', label: 'Actualités' },
  { href: '/admin/produits', label: 'Produits' },
  { href: '/admin/revendeurs', label: 'Revendeurs' },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-accent text-bloom-rose text-lg">Backoffice</span>
          <h1 className="font-title text-4xl text-bloom-violet-dark">Administration</h1>
        </div>

        <nav className="flex flex-wrap gap-2 border-b border-bloom-violet-light/40 pb-3">
          {tabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-body text-sm font-medium px-4 py-2 rounded-full text-bloom-violet-dark hover:bg-bloom-violet-pale transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {children}
      </div>
    </main>
  )
}
