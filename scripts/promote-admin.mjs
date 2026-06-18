// Promotion d'un compte en admin via la clé service-role.
// Usage : node --env-file=.env.local scripts/promote-admin.mjs <email>
import { createClient } from '@supabase/supabase-js'

const email = process.argv[2] || 'marius.nogueron@gmail.com'
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SECRET_KEY
if (!url || !key) { console.error('Env manquant'); process.exit(1) }

const admin = createClient(url, key, { auth: { persistSession: false } })

// 1) Trouver l'utilisateur dans auth.users (pagination)
let target = null
for (let page = 1; page <= 20 && !target; page++) {
  const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 })
  if (error) { console.error('listUsers:', error.message); process.exit(1) }
  target = data.users.find((u) => (u.email || '').toLowerCase() === email.toLowerCase())
  if (data.users.length < 1000) break
}
if (!target) { console.error(`Aucun compte pour ${email} — inscris-toi d'abord sur le site.`); process.exit(2) }

// 2) Passer le profil en admin
const { error: upErr } = await admin.from('profiles').update({ role: 'admin' }).eq('id', target.id)
if (upErr) { console.error('update profile:', upErr.message); process.exit(1) }

const { data: check } = await admin.from('profiles').select('id, pseudo, role').eq('id', target.id).single()
console.log('OK →', JSON.stringify(check))
