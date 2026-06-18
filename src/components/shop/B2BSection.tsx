import { useTranslations } from 'next-intl'

export default function B2BSection() {
  const t = useTranslations('shop.b2b')

  return (
    <section className="border-t border-bloom-violet-light pt-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-accent text-bloom-rose text-lg italic">Professionnels</span>
        <h2 className="font-title text-3xl text-bloom-violet-dark">{t('title')}</h2>
        <p className="font-body text-bloom-violet-medium">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('catalog'), icon: '📦', href: '#' },
          { label: t('kit'), icon: '🗂️', href: '#' },
          { label: t('prices'), icon: '💶', href: '#' },
          { label: t('preorder'), icon: '✍️', href: '#' },
        ].map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            className="bg-bloom-violet-pale rounded-2xl p-6 flex flex-col items-center gap-3 text-center hover:bg-bloom-violet-light/50 transition-colors"
          >
            <span className="text-3xl">{icon}</span>
            <span className="font-title text-base text-bloom-violet-dark">{label}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
