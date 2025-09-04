import { url } from '~/lib'

interface HreflangProps {
  path: string
  languages?: {
    [key: string]: string // 语言代码: 对应的URL路径
  }
}

export function Hreflang({ path, languages = {} }: HreflangProps) {
  // 默认中文
  const defaultHreflang = {
    'zh-CN': path,
    'x-default': path // 默认语言版本
  }

  const allLanguages = {
    ...defaultHreflang,
    ...languages
  }

  return (
    <>
      {Object.entries(allLanguages).map(([lang, pagePath]) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={url(pagePath).href}
        />
      ))}
    </>
  )
}

// 使用示例:
// <Hreflang 
//   path="/blog/my-post"
//   languages={{
//     'en': '/en/blog/my-post',
//     'zh-TW': '/zh-tw/blog/my-post'
//   }}
// /> 