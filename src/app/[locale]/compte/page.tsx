import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import AccountForm from './AccountForm'

export default async function ComptePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/connexion')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="font-accent text-bloom-rose text-lg italic">Bienvenue</span>
          <h1 className="font-title text-4xl text-bloom-violet-dark">Mon compte</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-bloom-violet-pale rounded-2xl p-5 flex flex-col gap-1">
            <span className="font-title text-3xl text-bloom-violet-dark">
              {profile?.score ?? 0}
            </span>
            <span className="font-body text-sm text-bloom-violet-medium">Score total</span>
          </div>
          <div className="bg-bloom-cream rounded-2xl p-5 flex flex-col gap-1">
            <span className="font-title text-3xl text-bloom-violet-dark">
              {profile?.games_played ?? 0}
            </span>
            <span className="font-body text-sm text-bloom-violet-medium">Parties jouées</span>
          </div>
        </div>

        <AccountForm user={user} profile={profile} />
      </div>
    </main>
  )
}
