import { ImageResponse } from 'next/og'
import { getPostBySlug } from '~/sanity/queries'

export const runtime = 'edge'
export const alt = 'Rube Club Workflow'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const appIcons: Record<string, string> = {
  gmail: '📧',
  slack: '💬',
  notion: '📝',
  youtube: '📺',
  discord: '🎮',
  telegram: '✈️',
  gdrive: '🗂️',
  dropbox: '📦',
  trello: '📋',
  asana: '✅',
}

const levelColors = {
  basic: '#22c55e',     // green-500
  intermediate: '#eab308', // yellow-500
  advanced: '#ef4444',    // red-500
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(45deg, #000212 0%, #1a1a1a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '32px',
            fontWeight: 'bold',
          }}
        >
          Rube Club
        </div>
      ),
      {
        ...size,
      }
    )
  }

  const apps = post.rubeMeta?.apps?.slice(0, 2) || []
  const level = post.rubeMeta?.level || 'basic'
  const timeRequired = post.rubeMeta?.timeRequired || ''
  
  const levelText = level === 'basic' ? 'Basic' : 
                   level === 'intermediate' ? 'Intermediate' : 'Advanced'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(45deg, #000212 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          color: 'white',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Header with logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            🤖 Rube Club
          </div>
          
          {/* Apps indicators */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {apps.map((app) => (
              <div
                key={app}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '16px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span>{appIcons[app] || '🔗'}</span>
                <span style={{ textTransform: 'capitalize' }}>{app}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            lineHeight: 1.2,
            marginBottom: '24px',
            background: 'linear-gradient(90deg, #ffffff 0%, #a3a3a3 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            maxWidth: '900px',
          }}
        >
          {post.title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: '#a3a3a3',
            lineHeight: 1.4,
            marginBottom: '40px',
            maxWidth: '800px',
          }}
        >
          {post.description}
        </div>

        {/* Footer with metadata */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Level badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: levelColors[level as keyof typeof levelColors] || levelColors.basic,
                borderRadius: '16px',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
              }}
            >
              📊 {levelText}
            </div>

            {/* Time required */}
            {timeRequired && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  color: '#d4d4d8',
                }}
              >
                ⏱️ {timeRequired}
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: '16px',
              color: '#71717a',
            }}
          >
            Make AI actually get things done
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}