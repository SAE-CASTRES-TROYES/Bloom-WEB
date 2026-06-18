import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  async rewrites() {
    const jeuUrl = process.env.NEXT_PUBLIC_JEU_URL ?? 'http://localhost:3001'
    return [
      {
        source: '/jeu',
        destination: `${jeuUrl}/`,
      },
      {
        source: '/jeu/:path*',
        destination: `${jeuUrl}/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
