-- ============================================================
-- Bloom WEB — Backoffice admin
-- À exécuter dans Supabase SQL Editor APRÈS 001.
-- ============================================================

-- ── retailers : écriture réservée aux admins ─────────────────
-- (la table n'avait qu'une policy de lecture publique ; sans ça,
--  l'admin ne peut pas créer/éditer/supprimer un point de vente)
drop policy if exists "Écriture admin des revendeurs" on public.retailers;
create policy "Écriture admin des revendeurs"
  on public.retailers for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── Promotion d'un compte en administrateur ──────────────────
-- À lancer une seule fois. Le compte doit déjà s'être inscrit sur le site.
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'marius.nogueron@gmail.com');
