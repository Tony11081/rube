export const seo = {
  title: 'Rube Club — 让 AI 真正帮你做事',
  description:
    '连接 600+ 应用，用自然语言执行真实动作。这里收集最好用的 Rube 工作流与教程。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://rube.club'
      : 'http://localhost:3000'
  ),
} as const
