// Seed : produit "Bloom" (15€ / 10€ pro) + 1 actualité de lancement.
// Usage : node --env-file=.env.local scripts/seed-bloom.mjs
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  { auth: { persistSession: false } },
)

async function main() {
  // 1) Nettoyage des placeholders de test
  await supabase.from('products').delete().eq('slug', 'nom-du-produit')
  await supabase.from('news').delete().eq('slug', 'une-actualite')

  // 2) Produit Bloom — public 15€, revendeur 10€
  const product = {
    name: 'Bloom — Le jeu de cartes',
    slug: 'bloom',
    description:
      "Un jeu de cartes hybride, coopératif et de trahison, pour 4 à 8 joueurs. " +
      "Récoltez les bonnes ressources pour faire éclore les Fleurs Légendaires… " +
      "mais méfiez-vous des Ronces tapies parmi les Jardiniers. Parties de 20 à 30 minutes, " +
      "règles accessibles dès 10 ans, tension garantie.",
    price_public: 15,
    price_pro: 10,
    stock: 100,
    category: 'jeu',
    images: ['/cards/carte_dos_bloom.webp', '/cards/lavande.webp', '/cards/dahlia.webp'],
  }
  const { error: pErr } = await supabase
    .from('products')
    .upsert(product, { onConflict: 'slug' })
  console.log('product:', pErr ? pErr.message : 'OK (bloom)')

  // 3) Actualité de lancement (peu de texte, ton jeune studio)
  const news = {
    title: 'Bloom éclot : notre premier jeu de société arrive',
    slug: 'bloom-eclot-premier-jeu',
    summary:
      "Jeune studio passionné de jeux de société, nous lançons Bloom — notre tout premier jeu. " +
      "La précommande est ouverte.",
    content:
      "Après des mois de prototypes, de parties tests et de fous rires autour de la table, " +
      "nous sommes fiers de vous présenter Bloom, notre premier jeu de cartes coopératif et de trahison.\n\n" +
      "Faites éclore les Fleurs Légendaires en récoltant les bonnes ressources… mais gardez l'œil ouvert : " +
      "les Ronces se cachent parmi les Jardiniers. À 4 à 8 joueurs, en 20 à 30 minutes.\n\n" +
      "La précommande est ouverte dès aujourd'hui sur la boutique. Merci de faire grandir Bloom avec nous 🌱",
    category: 'release',
    image_url: '/cards/carte_dos_bloom.webp',
    published_at: new Date().toISOString(),
  }
  const { error: nErr } = await supabase
    .from('news')
    .upsert(news, { onConflict: 'slug' })
  console.log('news:', nErr ? nErr.message : 'OK (bloom-eclot-premier-jeu)')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
