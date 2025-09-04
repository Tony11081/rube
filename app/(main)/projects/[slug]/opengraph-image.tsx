import { ImageResponse } from 'next/og'
import { getProjectBySlug } from '~/sanity/queries'

export const runtime = 'edge'
export const alt = 'Rube Club App'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  // Mock data for project - should come from getProjectBySlug in production
  const project = {
    name: params.slug,
    description: 'Powerful app integration support',
    appMeta: {
      categories: ['Productivity', 'Communication'],
      oauth: 'OAuth 2.0'
    }
  }
  
  if (!project) {
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

  const categories = project.appMeta?.categories?.slice(0, 3) || []
  const oauth = project.appMeta?.oauth || ''

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            🔗 Rube Club
          </div>
          
          <div
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Supported Apps
          </div>
        </div>

        {/* App icon (large) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '120px',
            height: '120px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
            fontSize: '48px',
            marginBottom: '32px',
            backdropFilter: 'blur(10px)',
          }}
        >
          🚀
        </div>

        {/* App name */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            lineHeight: 1.1,
            marginBottom: '16px',
            textTransform: 'capitalize',
          }}
        >
          {project.name}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 1.4,
            marginBottom: '40px',
            maxWidth: '800px',
          }}
        >
          {project.description}
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
              gap: '16px',
            }}
          >
            {/* Categories */}
            {categories.map((category) => (
              <div
                key={category}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {category}
              </div>
            ))}

            {/* OAuth info */}
            {oauth && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(34, 197, 94, 0.3)',
                  borderRadius: '16px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  color: '#dcfce7',
                }}
              >
                🔒 {oauth}
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            rube.club
          </div>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, transparent 70%)',
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