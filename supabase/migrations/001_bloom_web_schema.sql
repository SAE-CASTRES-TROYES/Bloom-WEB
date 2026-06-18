-- ============================================================
-- Bloom WEB — Schema initial
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- ── profiles ────────────────────────────────────────────────
-- Liée à auth.users (même Supabase que Bloom-JEU)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  pseudo      text not null default '',
  avatar_url  text,
  language    text not null default 'fr' check (language in ('fr', 'en', 'es')),
  role        text not null default 'player' check (role in ('player', 'retailer', 'admin')),
  score       integer not null default 0,
  games_played integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Lecture publique des profils"
  on public.profiles for select using (true);

create policy "Modification du propre profil"
  on public.profiles for all using (auth.uid() = id);

-- Trigger: créer un profil à la création du compte
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, pseudo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'pseudo', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── news ─────────────────────────────────────────────────────
create table if not exists public.news (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  summary        text,
  content        text,
  image_url      text,
  category       text check (category in ('release', 'event', 'tournament')),
  published_at   timestamptz not null default now(),
  created_at     timestamptz not null default now()
);

alter table public.news enable row level security;

create policy "Lecture publique des actualités"
  on public.news for select using (true);

create policy "Écriture admin uniquement"
  on public.news for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── products ─────────────────────────────────────────────────
create table if not exists public.products (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  description   text,
  price_public  numeric(10,2) not null,
  price_pro     numeric(10,2),
  stock         integer not null default 0,
  category      text,
  images        text[],
  created_at    timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Lecture publique des produits"
  on public.products for select using (true);

create policy "Écriture admin uniquement"
  on public.products for all using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ── orders ────────────────────────────────────────────────────
create table if not exists public.orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.profiles(id) on delete set null,
  items      jsonb not null default '[]',
  total      numeric(10,2) not null,
  status     text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Lecture des propres commandes"
  on public.orders for select using (auth.uid() = user_id);

create policy "Création de commande authentifiée"
  on public.orders for insert with check (auth.uid() = user_id);

-- ── retailers (store locator) ─────────────────────────────────
create table if not exists public.retailers (
  id       uuid primary key default gen_random_uuid(),
  name     text not null,
  address  text,
  lat      double precision not null,
  lng      double precision not null,
  country  text not null default 'FR',
  type     text,
  website  text,
  created_at timestamptz not null default now()
);

alter table public.retailers enable row level security;

create policy "Lecture publique des revendeurs"
  on public.retailers for select using (true);

-- ── leaderboard view ─────────────────────────────────────────
-- Vue qui expose pseudo, score, games_played pour le classement
create or replace view public.leaderboard as
  select
    id,
    pseudo,
    avatar_url,
    score,
    games_played
  from public.profiles
  where score > 0
  order by score desc;

-- ── newsletter_subscribers ───────────────────────────────────
create table if not exists public.newsletter_subscribers (
  email         text primary key,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
-- Pas de politique SELECT publique : données privées (admin seulement)
create policy "Inscription newsletter"
  on public.newsletter_subscribers for insert with check (true);
