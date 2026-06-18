'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80)
}

function str(fd: FormData, key: string): string {
  return ((fd.get(key) as string) ?? '').trim()
}
function strOrNull(fd: FormData, key: string): string | null {
  const v = str(fd, key)
  return v === '' ? null : v
}
function numOrNull(fd: FormData, key: string): number | null {
  const v = str(fd, key)
  if (v === '') return null
  const n = Number(v.replace(',', '.'))
  return Number.isFinite(n) ? n : null
}

// Vérifie que la session courante est admin, puis renvoie un client d'écriture.
// On utilise le client service-role pour les mutations (contourne le RLS) — sûr
// car l'accès est déjà verrouillé par le contrôle de rôle ci-dessus.
async function assertAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/')
  try {
    return createAdminClient()
  } catch {
    return supabase // fallback : nécessite alors les policies RLS d'écriture admin
  }
}

// ── News ──────────────────────────────────────────────────────
export async function saveNews(fd: FormData) {
  const supabase = await assertAdmin()
  const id = strOrNull(fd, 'id')
  const title = str(fd, 'title')
  const category = strOrNull(fd, 'category')
  const row = {
    title,
    slug: str(fd, 'slug') || slugify(title),
    summary: strOrNull(fd, 'summary'),
    content: strOrNull(fd, 'content'),
    image_url: strOrNull(fd, 'image_url'),
    category: category && ['release', 'event', 'tournament'].includes(category) ? category : null,
  }
  if (id) await supabase.from('news').update(row).eq('id', id)
  else await supabase.from('news').insert(row)
  revalidatePath('/admin/actualites')
  redirect('/admin/actualites')
}

export async function deleteNews(fd: FormData) {
  const supabase = await assertAdmin()
  await supabase.from('news').delete().eq('id', str(fd, 'id'))
  revalidatePath('/admin/actualites')
}

// ── Products ──────────────────────────────────────────────────
export async function saveProduct(fd: FormData) {
  const supabase = await assertAdmin()
  const id = strOrNull(fd, 'id')
  const name = str(fd, 'name')
  const images = str(fd, 'images')
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean)
  const row = {
    name,
    slug: str(fd, 'slug') || slugify(name),
    description: strOrNull(fd, 'description'),
    price_public: numOrNull(fd, 'price_public') ?? 0,
    price_pro: numOrNull(fd, 'price_pro'),
    stock: Math.round(numOrNull(fd, 'stock') ?? 0),
    category: strOrNull(fd, 'category'),
    images: images.length ? images : null,
  }
  if (id) await supabase.from('products').update(row).eq('id', id)
  else await supabase.from('products').insert(row)
  revalidatePath('/admin/produits')
  redirect('/admin/produits')
}

export async function deleteProduct(fd: FormData) {
  const supabase = await assertAdmin()
  await supabase.from('products').delete().eq('id', str(fd, 'id'))
  revalidatePath('/admin/produits')
}

// ── Retailers (store locator) ─────────────────────────────────
export async function saveRetailer(fd: FormData) {
  const supabase = await assertAdmin()
  const id = strOrNull(fd, 'id')
  const row = {
    name: str(fd, 'name'),
    address: strOrNull(fd, 'address'),
    lat: numOrNull(fd, 'lat') ?? 0,
    lng: numOrNull(fd, 'lng') ?? 0,
    country: str(fd, 'country') || 'FR',
    type: strOrNull(fd, 'type'),
    website: strOrNull(fd, 'website'),
  }
  if (id) await supabase.from('retailers').update(row).eq('id', id)
  else await supabase.from('retailers').insert(row)
  revalidatePath('/admin/revendeurs')
  redirect('/admin/revendeurs')
}

export async function deleteRetailer(fd: FormData) {
  const supabase = await assertAdmin()
  await supabase.from('retailers').delete().eq('id', str(fd, 'id'))
  revalidatePath('/admin/revendeurs')
}
