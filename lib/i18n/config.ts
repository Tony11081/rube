export const defaultLocale = 'en' as const
export const locales = ['en', 'zh-CN', 'ja'] as const

export type Locale = typeof locales[number]

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'ja': '日本語',
}

export const currencies: Record<Locale, string> = {
  'en': 'USD',
  'zh-CN': 'CNY',
  'ja': 'JPY',
}

export const regions: Record<Locale, string> = {
  'en': 'US',
  'zh-CN': 'CN',
  'ja': 'JP',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/')
  const possibleLocale = segments[1]
  
  if (possibleLocale && isValidLocale(possibleLocale)) {
    return possibleLocale
  }
  
  return null
}

export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname)
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/'
  }
  return pathname
}

export function addLocaleToPath(pathname: string, locale: Locale): string {
  const cleanPath = removeLocaleFromPath(pathname)
  return `/${locale}${cleanPath === '/' ? '' : cleanPath}`
}