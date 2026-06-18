export const metadata = {
  title: 'Politique de confidentialité — Bloom',
  robots: 'noindex',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="font-accent text-bloom-rose text-lg italic">RGPD</span>
          <h1 className="font-title text-5xl text-bloom-violet-dark">
            Politique de confidentialité
          </h1>
          <p className="font-body text-sm text-bloom-violet-medium">
            Dernière mise à jour : juin 2026
          </p>
        </div>

        <div className="prose prose-headings:font-title prose-headings:text-bloom-violet-dark prose-p:font-body prose-p:text-bloom-gray-dark max-w-none flex flex-col gap-8">

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">1. Responsable du traitement</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Le site bloom.mariusnogueron.fr est édité par le Projet Bloom. Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l&apos;adresse : <a href="mailto:bonjour@bloom-jeu.fr" className="text-bloom-rose hover:underline">bonjour@bloom-jeu.fr</a>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">2. Données collectées</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Nous collectons les données suivantes dans le cadre de l&apos;utilisation du site :
            </p>
            <ul className="flex flex-col gap-2 pl-4">
              {[
                { title: 'Compte joueur', desc: 'Adresse e-mail, pseudo, avatar, préférences de langue' },
                { title: 'Parties jouées', desc: 'Scores, rôles joués, historique des parties (via Supabase)' },
                { title: 'Commandes', desc: 'Données de facturation et de livraison (via Stripe — nous ne stockons pas vos données de carte bancaire)' },
                { title: 'Contact', desc: 'Nom, prénom, adresse e-mail, contenu du message' },
                { title: 'Newsletter', desc: 'Adresse e-mail uniquement' },
                { title: 'Cookies techniques', desc: 'Session d\'authentification, panier (localStorage)' },
              ].map(({ title, desc }) => (
                <li key={title} className="font-body text-bloom-gray-dark/80 leading-relaxed">
                  <span className="font-semibold text-bloom-gray-dark">{title} :</span> {desc}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">3. Finalités du traitement</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-body text-sm">
                <thead>
                  <tr className="bg-bloom-violet-pale">
                    <th className="text-left p-3 font-semibold text-bloom-violet-dark border border-bloom-violet-light">Finalité</th>
                    <th className="text-left p-3 font-semibold text-bloom-violet-dark border border-bloom-violet-light">Base légale</th>
                    <th className="text-left p-3 font-semibold text-bloom-violet-dark border border-bloom-violet-light">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Gestion du compte joueur', 'Exécution du contrat', '3 ans après inactivité'],
                    ['Traitement des commandes', 'Exécution du contrat', '10 ans (obligation comptable)'],
                    ['Envoi de newsletters', 'Consentement', "Jusqu'à désinscription"],
                    ['Réponse aux demandes de contact', 'Intérêt légitime', '1 an'],
                    ['Classement en ligne (leaderboard)', 'Exécution du contrat', 'Durée du compte'],
                    ['Statistiques anonymes', 'Intérêt légitime', '26 mois'],
                  ].map(([fin, base, duree]) => (
                    <tr key={fin} className="border-b border-bloom-violet-light/30 hover:bg-bloom-cream/30">
                      <td className="p-3 border border-bloom-violet-light/30">{fin}</td>
                      <td className="p-3 border border-bloom-violet-light/30">{base}</td>
                      <td className="p-3 border border-bloom-violet-light/30">{duree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">4. Sous-traitants et transferts</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Vos données sont susceptibles d&apos;être transmises aux sous-traitants suivants, dans le cadre de la fourniture de leurs services :
            </p>
            <ul className="flex flex-col gap-1 pl-4">
              {[
                'Supabase Inc. (base de données, authentification) — serveurs UE',
                'Resend Inc. (envoi d\'e-mails transactionnels) — serveurs UE',
                'Stripe Inc. (paiement en ligne) — certifié PCI DSS',
                'OVHcloud SAS (hébergement VPS) — France',
              ].map((item) => (
                <li key={item} className="font-body text-bloom-gray-dark/80">{item}</li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">5. Vos droits (RGPD)</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez des droits suivants :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { right: 'Accès', desc: 'Obtenir une copie de vos données' },
                { right: 'Rectification', desc: 'Corriger des données inexactes' },
                { right: 'Effacement', desc: '«Droit à l\'oubli» — supprimer votre compte et vos données' },
                { right: 'Portabilité', desc: 'Récupérer vos données dans un format structuré' },
                { right: 'Opposition', desc: 'Vous opposer à certains traitements' },
                { right: 'Limitation', desc: 'Limiter le traitement de vos données' },
              ].map(({ right, desc }) => (
                <div key={right} className="bg-bloom-violet-pale/50 rounded-xl p-4">
                  <p className="font-title text-sm text-bloom-violet-dark font-semibold">{right}</p>
                  <p className="font-body text-xs text-bloom-gray-dark/70 mt-1">{desc}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Pour exercer vos droits, contactez-nous à <a href="mailto:bonjour@bloom-jeu.fr" className="text-bloom-rose hover:underline">bonjour@bloom-jeu.fr</a>. En cas de litige, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-bloom-rose hover:underline">CNIL</a>.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">6. Cookies</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Nous utilisons uniquement des cookies strictement nécessaires au fonctionnement du site (session d&apos;authentification, préférences de langue). Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre consentement.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-title text-2xl text-bloom-violet-dark">7. Sécurité</h2>
            <p className="font-body text-bloom-gray-dark/80 leading-relaxed">
              Vos données sont transmises via HTTPS (TLS 1.3). Les mots de passe sont gérés par Supabase Auth et ne sont jamais stockés en clair. Les clés d&apos;API sont stockées côté serveur uniquement.
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}
