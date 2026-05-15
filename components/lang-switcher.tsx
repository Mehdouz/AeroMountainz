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
    tone === 'light' ? 'border-white/30' : 'border-[var(--border-subtle)]'
  const inactiveClass =
    tone === 'light'
      ? 'text-white/80 hover:text-[var(--gold)]'
      : 'text-[var(--text-muted)] hover:text-[var(--gold)]'

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
          className={`text-[11px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full transition-colors ${
            loc === currentLocale
              ? 'bg-[var(--gold)] text-[var(--midnight)]'
              : inactiveClass
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  )
}
