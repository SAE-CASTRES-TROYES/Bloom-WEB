#!/bin/bash
# setup-github-cicd.sh
# Lance ce script UNE SEULE FOIS pour configurer le CI/CD GitHub
# Prérequis : gh auth login (30 secondes)

set -e

REPO_NAME="bloom-web"
VPS_HOST="91.214.191.242"
VPS_USER="debian"
SSH_KEY_PATH="/Users/mariusnogueron/.ssh/id_ed25519"

echo "🌸 Configuration CI/CD GitHub pour Bloom WEB"
echo ""

# 1. Vérifier l'auth GitHub
if ! gh auth status &>/dev/null; then
  echo "❌ Tu n'es pas connecté à GitHub."
  echo "Lance d'abord : gh auth login"
  exit 1
fi

GH_USER=$(gh api user --jq '.login')
echo "✅ Connecté à GitHub en tant que: $GH_USER"

# 2. Créer le repo GitHub (privé)
if ! gh repo view "$GH_USER/$REPO_NAME" &>/dev/null; then
  echo "📦 Création du repo GitHub privé: $GH_USER/$REPO_NAME"
  gh repo create "$REPO_NAME" --private --source=. --push
else
  echo "📦 Repo existant: $GH_USER/$REPO_NAME"
  git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git" 2>/dev/null || \
    git remote set-url origin "https://github.com/$GH_USER/$REPO_NAME.git"
  git push -u origin main
fi

REPO_FULL="$GH_USER/$REPO_NAME"

echo ""
echo "🔐 Ajout des secrets GitHub Actions..."

# 3. Secrets infra
gh secret set SSH_PRIVATE_KEY --repo "$REPO_FULL" < "$SSH_KEY_PATH"
gh secret set VPS_HOST --repo "$REPO_FULL" -b "$VPS_HOST"
gh secret set VPS_USER --repo "$REPO_FULL" -b "$VPS_USER"

# 4. Secrets Supabase (depuis .env.local)
SUPABASE_URL=$(grep NEXT_PUBLIC_SUPABASE_URL .env.local | cut -d= -f2)
SUPABASE_KEY=$(grep NEXT_PUBLIC_SUPABASE_ANON_KEY .env.local | cut -d= -f2)
RESEND_KEY=$(grep RESEND_API_KEY .env.local | cut -d= -f2)
STRIPE_SK=$(grep "^STRIPE_SECRET_KEY" .env.local | cut -d= -f2)
STRIPE_PK=$(grep NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY .env.local | cut -d= -f2)
STRIPE_WH=$(grep STRIPE_WEBHOOK_SECRET .env.local | cut -d= -f2)
JEU_URL=$(grep NEXT_PUBLIC_JEU_URL .env.local | cut -d= -f2)

gh secret set NEXT_PUBLIC_SUPABASE_URL --repo "$REPO_FULL" -b "$SUPABASE_URL"
gh secret set NEXT_PUBLIC_SUPABASE_ANON_KEY --repo "$REPO_FULL" -b "$SUPABASE_KEY"
gh secret set RESEND_API_KEY --repo "$REPO_FULL" -b "$RESEND_KEY"
[ -n "$STRIPE_SK" ] && gh secret set STRIPE_SECRET_KEY --repo "$REPO_FULL" -b "$STRIPE_SK"
[ -n "$STRIPE_PK" ] && gh secret set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY --repo "$REPO_FULL" -b "$STRIPE_PK"
[ -n "$STRIPE_WH" ] && gh secret set STRIPE_WEBHOOK_SECRET --repo "$REPO_FULL" -b "$STRIPE_WH"
[ -n "$JEU_URL" ] && gh secret set NEXT_PUBLIC_JEU_URL --repo "$REPO_FULL" -b "$JEU_URL"

echo ""
echo "✅ CI/CD configuré !"
echo ""
echo "📌 Pour déployer : git push origin main"
echo "📌 Voir les déploiements : https://github.com/$REPO_FULL/actions"
