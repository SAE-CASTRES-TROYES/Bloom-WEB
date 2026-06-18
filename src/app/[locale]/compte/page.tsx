import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@/lib/supabase/server'
import AccountForm from './AccountForm'
import GameHistory from './GameHistory'

export default async function ComptePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/connexion')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const [{ data: orders }, { data: gameHistory }] = await Promise.all([
    supabase.from('orders').select('id, total, status, created_at, items').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('players').select('id, pseudo, role, score, game_id, created_at').eq('pseudo', (profile as { pseudo?: string } | null)?.pseudo ?? '').limit(10),
  ])

  const t = await getTranslations('account')

  const totalScore = profile?.score ?? 0
  const gamesPlayed = profile?.games_played ?? 0
  const winRate = gamesPlayed > 0 ? Math.round((profile?.wins ?? 0) / gamesPlayed * 100) : 0

  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-bloom-violet-pale flex items-center justify-center text-3xl overflow-hidden">
            {profile?.avatar_url
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              : '🌿'
            }
          </div>
          <div>
            <span className="font-accent text-bloom-rose text-base">{t('welcome')}</span>
            <h1 className="font-title text-3xl text-bloom-violet-dark leading-tight">
              {profile?.pseudo || user.email?.split('@')[0]}
            </h1>
            {profile?.role === 'retailer' && (
              <span className="font-body text-xs bg-bloom-gold/20 text-bloom-black px-2 py-0.5 rounded-full border border-bloom-gold/40">
                {t('retailer_badge')}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: totalScore.toLocaleString('fr-FR'), label: t('score'), icon: '🏆' },
            { value: gamesPlayed, label: t('games_played'), icon: '🎴' },
            { value: `${winRate}%`, label: t('wins'), icon: '🌸' },
            { value: profile?.role === 'retailer' ? t('status_pro') : t('status_player'), label: t('status'), icon: profile?.role === 'retailer' ? '🏪' : '🌿' },
          ].map(({ value, label, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-1 items-center text-center">
              <span className="text-2xl">{icon}</span>
              <span className="font-title text-2xl text-bloom-violet-dark">{value}</span>
              <span className="font-body text-xs text-bloom-violet-medium">{label}</span>
            </div>
          ))}
        </div>

        <AccountForm user={user} profile={profile} />

        <GameHistory entries={gameHistory ?? []} />

        {orders && orders.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="font-title text-xl text-bloom-violet-dark">{t('orders_title')}</h2>
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm font-medium text-bloom-black">
                      {t('order_date', { date: new Date(order.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) })}
                    </p>
                    <p className="font-body text-xs text-bloom-violet-medium mt-0.5">
                      {order.status === 'paid' ? t('status_paid') : order.status === 'pending' ? t('status_pending') : order.status}
                    </p>
                  </div>
                  <span className="font-title text-bloom-rose">
                    {order.total.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
