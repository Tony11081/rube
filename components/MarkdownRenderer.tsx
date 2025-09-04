'use client'

import MarkdownIt from 'markdown-it'
import React, { useEffect, useState } from 'react'

// 添加样式
const markdownStyles = `
.markdown-content {
  line-height: 1.7;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  font-weight: 700;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown-content h1 {
  font-size: 2.25em;
}

.markdown-content h2 {
  font-size: 1.875em;
}

.markdown-content h3 {
  font-size: 1.5em;
}

.markdown-content h4 {
  font-size: 1.25em;
}

.markdown-content p,
.markdown-content ol,
.markdown-content ul,
.markdown-content blockquote {
  margin-bottom: 1.25em;
}

.markdown-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
}

.markdown-content a {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-content a:hover {
  color: #2563eb;
}

.markdown-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
}

.markdown-content pre {
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  padding: 1em;
  overflow-x: auto;
  margin-bottom: 1.25em;
}

.markdown-content code {
  background-color: #f3f4f6;
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-size: 0.875em;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
}

.markdown-content ol {
  list-style-type: decimal;
  padding-left: 1.5em;
}

.markdown-content ul {
  list-style-type: disc;
  padding-left: 1.5em;
}

/* 适配暗色模式 */
@media (prefers-color-scheme: dark) {
  .markdown-content pre {
    background-color: #1f2937;
  }
  
  .markdown-content code {
    background-color: #1f2937;
  }
  
  .markdown-content blockquote {
    border-left-color: #4b5563;
    color: #9ca3af;
  }
  
  .markdown-content a {
    color: #60a5fa;
  }
  
  .markdown-content a:hover {
    color: #93c5fd;
  }
}
`

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
    })

    setHtml(md.render(content || ''))
  }, [content])

  return (
    <>
      <style jsx global>{markdownStyles}</style>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
} 