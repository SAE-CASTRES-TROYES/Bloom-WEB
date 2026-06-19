import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import { btn } from '@/lib/ui'
import { saveProduct, deleteProduct } from '../actions'

const input = 'border border-bloom-violet-light rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors w-full'
const label = 'font-body text-xs font-medium text-bloom-gray-dark'
const eur = (n: number) => n.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

type Product = {
  id: string; name: string; slug: string; description: string | null
  price_public: number; price_pro: number | null; stock: number
  category: string | null; images: string[] | null
}

export default async function AdminProducts({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('id, name, slug, description, price_public, price_pro, stock, category, images')
    .order('created_at', { ascending: false })
  const items = (data ?? []) as Product[]
  const editing = edit ? items.find((p) => p.id === edit) ?? null : null

  return (
    <div className="flex flex-col gap-8">
      <form key={editing?.id ?? 'new'} action={saveProduct} className="bg-white rounded-2xl p-6 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl text-bloom-violet-dark">{editing ? 'Éditer le produit' : 'Nouveau produit'}</h2>
          {editing && <Link href="/admin/produits" className="font-body text-sm text-bloom-rose hover:underline">+ Nouveau</Link>}
        </div>
        {editing && <input type="hidden" name="id" value={editing.id} />}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Nom *</label>
            <input name="name" required defaultValue={editing?.name ?? ''} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Slug (auto si vide)</label>
            <input name="slug" defaultValue={editing?.slug ?? ''} className={input} />
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Prix public (€) *</label>
            <input name="price_public" required inputMode="decimal" defaultValue={editing?.price_public ?? ''} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Prix pro (€)</label>
            <input name="price_pro" inputMode="decimal" defaultValue={editing?.price_pro ?? ''} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Stock</label>
            <input name="stock" inputMode="numeric" defaultValue={editing?.stock ?? 0} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Catégorie</label>
            <input name="category" defaultValue={editing?.category ?? ''} className={input} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={label}>Description</label>
          <textarea name="description" rows={3} defaultValue={editing?.description ?? ''} className={`${input} resize-y`} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={label}>Images (une URL par ligne)</label>
          <textarea name="images" rows={2} defaultValue={(editing?.images ?? []).join('\n')} className={`${input} resize-y`} placeholder="https://…" />
        </div>

        <button type="submit" className={btn('violet', 'md')}>{editing ? 'Enregistrer' : 'Ajouter'}</button>
      </form>

      <div className="flex flex-col gap-3">
        <h2 className="font-title text-xl text-bloom-violet-dark">{items.length} produit{items.length !== 1 ? 's' : ''}</h2>
        {items.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-bloom-black truncate">{p.name}</p>
              <p className="font-body text-xs text-bloom-violet-medium truncate">
                {eur(p.price_public)}{p.price_pro != null ? ` · pro ${eur(p.price_pro)}` : ''} · stock {p.stock}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/admin/produits?edit=${p.id}`} className="font-body text-sm text-bloom-violet-dark hover:underline">Éditer</Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className="font-body text-sm text-bloom-rose hover:underline">Supprimer</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
