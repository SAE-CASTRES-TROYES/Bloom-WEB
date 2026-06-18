-- ============================================================
-- Bloom — Liaison comptes JEU ↔ WEB + statistiques
-- À exécuter dans Supabase SQL Editor (ou via psql sur SUPABASE_DB_URL)
-- ============================================================

-- 1) Rattacher un joueur du JEU à un compte (null si invité non connecté)
alter table public.players
  add column if not exists user_id uuid references auth.users(id) on delete set null;

-- 2) Enregistrement idempotent-friendly d'un résultat de partie pour le
--    joueur connecté. security definer → contourne le RLS mais ne touche
--    QUE le profil de l'appelant (auth.uid()). Les invités (auth.uid() null)
--    sont ignorés silencieusement.
create or replace function public.record_game_result(p_won boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  update public.profiles
     set games_played = games_played + 1,
         wins         = wins + (case when p_won then 1 else 0 end),
         score        = score + (case when p_won then 10 else 2 end),
         updated_at   = now()
   where id = auth.uid();
end;
$$;

grant execute on function public.record_game_result(boolean) to anon, authenticated;
