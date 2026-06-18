import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase service-role — SERVEUR UNIQUEMENT.
 * Contourne le RLS : à n'utiliser que dans des Server Actions déjà protégées
 * par une vérification du rôle admin (voir assertAdmin dans admin/actions.ts).
 * Ne jamais importer ce module dans un composant client.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY
  if (!key) throw new Error('SUPABASE_SECRET_KEY manquant')
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
