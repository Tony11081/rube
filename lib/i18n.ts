// Supported languages
export const supportedLanguages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳',
    dir: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    dir: 'ltr'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    dir: 'ltr'
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    dir: 'ltr'
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    dir: 'ltr'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    dir: 'ltr'
  }
} as const

export type SupportedLanguage = keyof typeof supportedLanguages
export const defaultLanguage: SupportedLanguage = 'en'

// Translation keys with type safety
export interface Translations {
  // Navigation
  nav: {
    home: string
    equipment: string
    performance: string
    gearGuide: string
    buyingGuides: string
    trainingHealth: string
    tacticsMadeSimple: string
    fanTravel: string
    allGuides: string
    search: string
    menu: string
    siteNavigation: string
  }
  
  // Common UI elements
  common: {
    loading: string
    error: string
    retry: string
    goHome: string
    readMore: string
    showMore: string
    showLess: string
    close: string
    cancel: string
    save: string
    edit: string
    delete: string
    confirm: string
    back: string
    next: string
    previous: string
    submit: string
    search: string
    searchPlaceholder: string
    noResults: string
    tryDifferentSearch: string
  }
  
  // Search
  search: {
    title: string
    description: string
    placeholder: string
    resultsFor: string
    noResultsTitle: string
    noResultsDescription: string
    allResults: string
    suggestions: string
  }
  
  // Personalization
  personalization: {
    title: string
    subtitle: string
    step: string
    of: string
    complete: string
    skipForNow: string
    recommendedForYou: string
    popularContent: string
    personalized: string
    basedOnInterests: string
    sports: {
      title: string
      description: string
    }
    equipment: {
      title: string
      description: string
    }
    experience: {
      title: string
      description: string
      beginner: string
      intermediate: string
      advanced: string
      professional: string
    }
    goals: {
      title: string
      description: string
    }
    content: {
      title: string
      description: string
    }
  }
  
  // Comments and ratings
  community: {
    joinDiscussion: string
    comments: string
    noComments: string
    beFirst: string
    signInToComment: string
    signIn: string
    writeComment: string
    writeReply: string
    posting: string
    reply: string
    like: string
    edit: string
    delete: string
    rateContent: string
    basedOnReviews: string
    reviews: string
    review: string
    newest: string
    oldest: string
    mostLiked: string
  }
  
  // Time and dates
  time: {
    justNow: string
    minutesAgo: string
    hoursAgo: string
    daysAgo: string
    weeksAgo: string
    monthsAgo: string
    yearsAgo: string
    updated: string
    posted: string
  }
  
  // Content categories
  categories: {
    guide: string
    review: string
    tutorial: string
    news: string
    beginner: string
    intermediate: string
    advanced: string
  }
  
  // Error messages
  errors: {
    generic: string
    networkError: string
    notFound: string
    unauthorized: string
    forbidden: string
    serverError: string
    tryAgain: string
  }
}

// English translations (default)
const en: Translations = {
  nav: {
    home: 'Home',
    equipment: 'Equipment',
    performance: 'Performance', 
    gearGuide: 'Gear Guide',
    buyingGuides: 'Buying Guides',
    trainingHealth: 'Training & Health',
    tacticsMadeSimple: 'Tactics Made Simple',
    fanTravel: 'Fan Travel',
    allGuides: 'All Guides',
    search: 'Search',
    menu: 'Menu',
    siteNavigation: 'Site Navigation'
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Try Again',
    goHome: 'Go Home',
    readMore: 'Read More',
    showMore: 'Show More',
    showLess: 'Show Less',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    search: 'Search',
    searchPlaceholder: 'Search guides, gear...',
    noResults: 'No results found',
    tryDifferentSearch: 'Try a different search term'
  },
  search: {
    title: 'Search Results',
    description: 'Find guides, gear reviews, and sports content',
    placeholder: 'Search...',
    resultsFor: 'Found {count} result{plural} for "{query}"',
    noResultsTitle: 'No results found',
    noResultsDescription: 'Try adjusting your search terms or browse our main sections:',
    allResults: 'See all results for "{query}"',
    suggestions: 'Based on your browsing, you might like:'
  },
  personalization: {
    title: 'Personalize Your Experience',
    subtitle: 'Help us recommend content tailored to your interests',
    step: 'Step',
    of: 'of',
    complete: 'Complete',
    skipForNow: 'Skip for now',
    recommendedForYou: 'Recommended for You',
    popularContent: 'Popular Content',
    personalized: 'Personalized',
    basedOnInterests: 'Recommendations based on your interests in {interests}',
    sports: {
      title: 'What sports are you interested in?',
      description: 'Select the sports you participate in or want to learn about'
    },
    equipment: {
      title: 'What equipment interests you most?',
      description: 'Choose the types of gear you want to see reviews and guides for'
    },
    experience: {
      title: "What's your experience level?",
      description: 'This helps us recommend content at the right difficulty level',
      beginner: 'Beginner',
      intermediate: 'Intermediate', 
      advanced: 'Advanced',
      professional: 'Professional'
    },
    goals: {
      title: 'What are your main goals?',
      description: "Select what you're trying to achieve with sports and fitness"
    },
    content: {
      title: 'What content do you prefer?',
      description: 'Choose the types of content you find most valuable'
    }
  },
  community: {
    joinDiscussion: 'Join the Discussion',
    comments: 'Comments',
    noComments: 'No comments yet.',
    beFirst: 'Be the first to share your thoughts!',
    signInToComment: 'Sign in to join the conversation',
    signIn: 'Sign In',
    writeComment: 'Share your thoughts...',
    writeReply: 'Write a reply...',
    posting: 'Posting...',
    reply: 'Reply',
    like: 'Like',
    edit: 'Edit',
    delete: 'Delete',
    rateContent: 'Rate this content',
    basedOnReviews: 'Based on {count} review{plural}',
    reviews: 'reviews',
    review: 'review',
    newest: 'Newest First',
    oldest: 'Oldest First',
    mostLiked: 'Most Liked'
  },
  time: {
    justNow: 'Just now',
    minutesAgo: '{count}m ago',
    hoursAgo: '{count}h ago', 
    daysAgo: '{count}d ago',
    weeksAgo: '{count}w ago',
    monthsAgo: '{count}mo ago',
    yearsAgo: '{count}y ago',
    updated: 'Updated',
    posted: 'Posted'
  },
  categories: {
    guide: 'Guide',
    review: 'Review',
    tutorial: 'Tutorial',
    news: 'News',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced'
  },
  errors: {
    generic: 'Something went wrong',
    networkError: 'Network connection error',
    notFound: 'Page not found',
    unauthorized: 'Please sign in to continue',
    forbidden: 'Access denied',
    serverError: 'Server error occurred',
    tryAgain: 'Please try again later'
  }
}

// Chinese translations
const zh: Translations = {
  nav: {
    home: '首页',
    equipment: '装备',
    performance: '表现',
    gearGuide: '装备指南',
    buyingGuides: '购买指南',
    trainingHealth: '训练与健康',
    tacticsMadeSimple: '战术简化',
    fanTravel: '球迷旅行',
    allGuides: '所有指南',
    search: '搜索',
    menu: '菜单',
    siteNavigation: '网站导航'
  },
  common: {
    loading: '加载中...',
    error: '错误',
    retry: '重试',
    goHome: '返回首页',
    readMore: '阅读更多',
    showMore: '显示更多',
    showLess: '显示更少',
    close: '关闭',
    cancel: '取消',
    save: '保存',
    edit: '编辑',
    delete: '删除',
    confirm: '确认',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    search: '搜索',
    searchPlaceholder: '搜索指南、装备...',
    noResults: '没有找到结果',
    tryDifferentSearch: '尝试不同的搜索词'
  },
  search: {
    title: '搜索结果',
    description: '查找指南、装备评测和体育内容',
    placeholder: '搜索...',
    resultsFor: '为"{query}"找到 {count} 个结果',
    noResultsTitle: '没有找到结果',
    noResultsDescription: '尝试调整搜索词或浏览我们的主要版块：',
    allResults: '查看"{query}"的所有结果',
    suggestions: '根据您的浏览记录，您可能喜欢：'
  },
  personalization: {
    title: '个性化您的体验',
    subtitle: '帮助我们为您推荐量身定制的内容',
    step: '第',
    of: '步，共',
    complete: '完成',
    skipForNow: '暂时跳过',
    recommendedForYou: '为您推荐',
    popularContent: '热门内容',
    personalized: '个性化',
    basedOnInterests: '基于您对{interests}的兴趣推荐',
    sports: {
      title: '您对哪些运动感兴趣？',
      description: '选择您参与或想了解的运动'
    },
    equipment: {
      title: '您最感兴趣的装备是什么？',
      description: '选择您想看到评测和指南的装备类型'
    },
    experience: {
      title: '您的经验水平如何？',
      description: '这有助于我们推荐合适难度的内容',
      beginner: '初学者',
      intermediate: '中级',
      advanced: '高级',
      professional: '专业'
    },
    goals: {
      title: '您的主要目标是什么？',
      description: '选择您希望在运动和健身方面实现的目标'
    },
    content: {
      title: '您更喜欢什么内容？',
      description: '选择您认为最有价值的内容类型'
    }
  },
  community: {
    joinDiscussion: '参与讨论',
    comments: '评论',
    noComments: '暂无评论',
    beFirst: '成为第一个分享想法的人！',
    signInToComment: '登录后参与对话',
    signIn: '登录',
    writeComment: '分享您的想法...',
    writeReply: '写回复...',
    posting: '发布中...',
    reply: '回复',
    like: '赞',
    edit: '编辑',
    delete: '删除',
    rateContent: '为此内容评分',
    basedOnReviews: '基于 {count} 条评价',
    reviews: '条评价',
    review: '条评价',
    newest: '最新优先',
    oldest: '最早优先',
    mostLiked: '最多赞'
  },
  time: {
    justNow: '刚刚',
    minutesAgo: '{count}分钟前',
    hoursAgo: '{count}小时前',
    daysAgo: '{count}天前',
    weeksAgo: '{count}周前',
    monthsAgo: '{count}个月前',
    yearsAgo: '{count}年前',
    updated: '更新于',
    posted: '发布于'
  },
  categories: {
    guide: '指南',
    review: '评测',
    tutorial: '教程',
    news: '新闻',
    beginner: '初学者',
    intermediate: '中级',
    advanced: '高级'
  },
  errors: {
    generic: '出现错误',
    networkError: '网络连接错误',
    notFound: '页面未找到',
    unauthorized: '请登录后继续',
    forbidden: '访问被拒绝',
    serverError: '服务器错误',
    tryAgain: '请稍后再试'
  }
}

// Translation storage
const translations: Record<SupportedLanguage, Translations> = {
  en,
  zh,
  // Simplified versions for other languages (would be fully translated in production)
  es: { ...en }, // Spanish translations would go here
  fr: { ...en }, // French translations would go here
  de: { ...en }, // German translations would go here
  ja: { ...en }, // Japanese translations would go here
  ko: { ...en }  // Korean translations would go here
}

// Language management service
export class I18nService {
  private static STORAGE_KEY = 'preferred_language'
  private static currentLanguage: SupportedLanguage = defaultLanguage

  static getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage
  }

  static setLanguage(language: SupportedLanguage): void {
    this.currentLanguage = language
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, language)
      document.documentElement.lang = language
      document.documentElement.dir = supportedLanguages[language].dir
    }
  }

  static getStoredLanguage(): SupportedLanguage | null {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage
      return stored && stored in supportedLanguages ? stored : null
    } catch {
      return null
    }
  }

  static detectLanguage(): SupportedLanguage {
    // Check stored preference first
    const stored = this.getStoredLanguage()
    if (stored) return stored

    // Check browser language
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage
      if (browserLang in supportedLanguages) {
        return browserLang
      }
    }

    return defaultLanguage
  }

  static getTranslations(language?: SupportedLanguage): Translations {
    const lang = language || this.currentLanguage
    return translations[lang] || translations[defaultLanguage]
  }

  static t(key: string, params?: Record<string, string | number>, language?: SupportedLanguage): string {
    const trans = this.getTranslations(language)
    const keys = key.split('.')
    
    let value: any = trans
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }

    if (typeof value !== 'string') {
      console.warn(`Translation key "${key}" not found`)
      return key
    }

    // Replace parameters
    if (params) {
      return Object.entries(params).reduce((str, [param, val]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), String(val))
      }, value)
    }

    return value
  }

  static formatPlural(key: string, count: number, params?: Record<string, string | number>, language?: SupportedLanguage): string {
    const baseParams = { count, plural: count === 1 ? '' : 's', ...params }
    return this.t(key, baseParams, language)
  }

  static init(): void {
    const detectedLanguage = this.detectLanguage()
    this.setLanguage(detectedLanguage)
  }
}

