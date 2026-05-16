'use client'

import { usePathname, useRouter } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/i18n'

export default function LangSwitcher({
  currentLocale,
  tone = 'dark',
}: {
  currentLocale: Locale
  tone?: 'light' | 'dark'
}) {
  const pathname = usePathname()
  const router = useRouter()

  const switchTo = (locale: Locale) => {
    if (locale === currentLocale) return
    const next = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${locale}`)
    router.push(next || `/${locale}`)
  }

  const borderClass =
    tone === 'light' ? 'border-white/50' : 'border-border-subtle'
  const inactiveClass =
    tone === 'light'
      ? 'text-white hover:bg-white/10'
      : 'text-text-secondary hover:bg-(--ink)/5 hover:text-text-primary'

  return (
    <div
      className={`flex items-center gap-1 border ${borderClass} rounded-full px-1 py-1 transition-colors duration-500`}
    >
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={loc === currentLocale}
          className={`text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
            loc === currentLocale
              ? 'bg-gold text-midnight'
              : inactiveClass
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
