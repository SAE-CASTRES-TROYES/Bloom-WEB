import { Link } from '@/i18n/navigation'
import { createClient } from '@/lib/supabase/server'
import { btn } from '@/lib/ui'
import { saveNews, deleteNews } from '../actions'

const input = 'border border-bloom-violet-light rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-bloom-violet-dark transition-colors w-full'
const label = 'font-body text-xs font-medium text-bloom-gray-dark'

type News = {
  id: string; title: string; slug: string; summary: string | null
  content: string | null; image_url: string | null; category: string | null
}

export default async function AdminNews({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams
  const supabase = await createClient()
  const { data } = await supabase
    .from('news')
    .select('id, title, slug, summary, content, image_url, category, published_at')
    .order('published_at', { ascending: false })
  const items = (data ?? []) as News[]
  const editing = edit ? items.find((n) => n.id === edit) ?? null : null

  return (
    <div className="flex flex-col gap-8">
      {/* Formulaire création / édition */}
      <form action={saveNews} className="bg-white rounded-2xl p-6 border border-bloom-violet-light/20 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl text-bloom-violet-dark">{editing ? 'Éditer l’actualité' : 'Nouvelle actualité'}</h2>
          {editing && <Link href="/admin/actualites" className="font-body text-sm text-bloom-rose hover:underline">+ Nouvelle</Link>}
        </div>
        {editing && <input type="hidden" name="id" value={editing.id} />}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Titre *</label>
            <input name="title" required defaultValue={editing?.title ?? ''} className={input} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>Slug (auto si vide)</label>
            <input name="slug" defaultValue={editing?.slug ?? ''} className={input} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={label}>Catégorie</label>
            <select name="category" defaultValue={editing?.category ?? ''} className={input}>
              <option value="">—</option>
              <option value="release">Sortie</option>
              <option value="event">Événement</option>
              <option value="tournament">Tournoi</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={label}>URL de l’image</label>
            <input name="image_url" type="url" defaultValue={editing?.image_url ?? ''} className={input} placeholder="https://…" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={label}>Résumé</label>
          <input name="summary" defaultValue={editing?.summary ?? ''} className={input} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={label}>Contenu</label>
          <textarea name="content" rows={5} defaultValue={editing?.content ?? ''} className={`${input} resize-y`} />
        </div>

        <button type="submit" className={btn('violet', 'md')}>{editing ? 'Enregistrer' : 'Publier'}</button>
      </form>

      {/* Liste */}
      <div className="flex flex-col gap-3">
        <h2 className="font-title text-xl text-bloom-violet-dark">{items.length} actualité{items.length !== 1 ? 's' : ''}</h2>
        {items.map((n) => (
          <div key={n.id} className="bg-white rounded-2xl p-4 border border-bloom-violet-light/20 shadow-sm flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body text-sm font-semibold text-bloom-black truncate">{n.title}</p>
              <p className="font-body text-xs text-bloom-violet-medium truncate">/{n.slug}{n.category ? ` · ${n.category}` : ''}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link href={`/admin/actualites?edit=${n.id}`} className="font-body text-sm text-bloom-violet-dark hover:underline">Éditer</Link>
              <form action={deleteNews}>
                <input type="hidden" name="id" value={n.id} />
                <button type="submit" className="font-body text-sm text-bloom-rose hover:underline">Supprimer</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
