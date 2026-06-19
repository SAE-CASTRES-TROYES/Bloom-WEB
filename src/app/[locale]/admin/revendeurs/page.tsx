import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import { btn } from '@/lib/ui'
import { saveRetailer, deleteRetailer } from '../actions'

const input = 'border border-bloom-violet-light rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors w-full'
const label = 'font-body text-xs font-medium text-bloom-gray-dark'

const COUNTRIES = ['FR', 'BE', 'CH', 'LU', 'CA']
const TYPES = ['Boutique spécialisée', 'Grande surface', 'En ligne']

type Retailer = {
  id: string; name: string; address: string | null; lat: number; lng: number
  country: string; type: string | null; website: string | null
}

export default async function AdminRetailers({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams
  const supabase = await createClient()
  const { data } = await supabase
    .from('retailers')
    .select('id, name, address, lat, lng, country, type, website')
    .order('created_at', { ascending: false })
  const items = (data ?? []) as Retailer[]
  const editing = edit ? items.find((r) => r.id === edit) ?? null : null

  return (
    <div className="flex flex-col gap-8">
      <form key={editing?.id ?? 'new'} action={saveRetailer} className="bg-white rounded-2xl p-6 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl text-bloom-violet-dark">{editing ? 'Éditer le point de vente' : 'Nouveau point de vente'}</h2>
          {editing && <Link href="/admin/revendeurs" className="font-body text-sm text-bloom-rose hover:underline">+ Nouveau</Link>}
        </div>
        {editing && <input type="hidden" name="id" value={editing.id} />}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Nom *</label>
            <input name="name" required defaultValue={editing?.name ?? ''} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Adresse</label>
            <input name="address" defaultValue={editing?.address ?? ''} className={input} />
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Latitude *</label>
            <input name="lat" required inputMode="decimal" defaultValue={editing?.lat ?? ''} className={input} placeholder="48.8566" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Longitude *</label>
            <input name="lng" required inputMode="decimal" defaultValue={editing?.lng ?? ''} className={input} placeholder="2.3522" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Pays</label>
            <select name="country" defaultValue={editing?.country ?? 'FR'} className={input}>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Type</label>
            <select name="type" defaultValue={editing?.type ?? ''} className={input}>
              <option value="">—</option>
              {TYPES.map((tp) => <option key={tp}>{tp}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={label}>Site web</label>
          <input name="website" type="url" defaultValue={editing?.website ?? ''} className={input} placeholder="https://…" />
        </div>

        <button type="submit" className={btn('violet', 'md')}>{editing ? 'Enregistrer' : 'Ajouter'}</button>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="font-title text-xl text-bloom-violet-dark">{items.length} point{items.length !== 1 ? 's' : ''} de vente</h2>
        {items.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-bloom-black truncate">{r.name}</p>
              <p className="font-body text-xs text-bloom-violet-medium truncate">
                {r.country}{r.type ? ` · ${r.type}` : ''} · {r.lat}, {r.lng}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/admin/revendeurs?edit=${r.id}`} className="font-body text-sm text-bloom-violet-dark hover:underline">Éditer</Link>
              <form action={deleteRetailer}>
                <input type="hidden" name="id" value={r.id} />
                <button type="submit" className="font-body text-sm text-bloom-rose hover:underline">Supprimer</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
